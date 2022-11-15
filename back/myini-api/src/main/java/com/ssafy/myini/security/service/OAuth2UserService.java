package com.ssafy.myini.security.service;

import com.ssafy.myini.member.domain.MemberRepository;
import com.ssafy.myini.member.domain.Member;
import com.ssafy.myini.member.domain.type.Provider;
import com.ssafy.myini.member.domain.type.Role;
import com.ssafy.myini.security.oauth.CustomOAuth2User;
import com.ssafy.myini.security.oauth.OAuth2UserInfo;
import com.ssafy.myini.security.oauth.OAuth2UserInfoFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import javax.transaction.*;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OAuth2UserService extends DefaultOAuth2UserService {

    private final MemberRepository memberRepository;

    @Override
    @Transactional
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        // OAuth로 넘어온 사용자 profile scope가 전처리되는 메서드
        OAuth2User oAuth2User = super.loadUser(userRequest);
        try {
            return proccessOAuth2User(userRequest, oAuth2User);
        } catch (AuthenticationException e) {
            throw e;
        } catch (Exception e) {
            // 여기서 예외가 던져지면 OAuth2AuthenticationFailureHandler에서 처리하게 됨
            throw new InternalAuthenticationServiceException(e.getMessage(), e.getCause());
        }
    }

    private OAuth2User proccessOAuth2User(OAuth2UserRequest oAuth2UserRequest, OAuth2User oAuth2User) {
        // 기존 회원인지 신규 회원인지 판단
        OAuth2UserInfo oAuth2UserInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(oAuth2UserRequest.getClientRegistration().getRegistrationId(), oAuth2User.getAttributes());

        // 고유 아이디를 이용하여 가입 여부를 조회
        Optional<Member> memberOptional = memberRepository.findByMemberName(oAuth2UserInfo.getUserName());
        Member member;
        if (memberOptional.isPresent()) {
            member = memberOptional.get();
            String memberProfileImg = oAuth2UserInfo.getUserProfileImg();
            if (memberProfileImg != null && memberProfileImg.isEmpty()) {
                memberProfileImg = null;
            }
            member.updateMember(oAuth2UserInfo.getUserEmail(), oAuth2UserInfo.getUserNickname(), memberProfileImg);
        } else {
            member = registerNewUser(oAuth2UserRequest, oAuth2UserInfo);
        }
        return CustomOAuth2User.create(member, oAuth2User.getAttributes());
    }

    private Member registerNewUser(OAuth2UserRequest oAuth2UserRequest, OAuth2UserInfo oAuth2UserInfo) {
        Provider memberProvider = Provider.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId());
        String memberNickname = oAuth2UserInfo.getUserNickname();
        String memberProviderId = oAuth2UserInfo.getUserProviderId();
        String memberName = oAuth2UserInfo.getUserName();
        String memberEmail = oAuth2UserInfo.getUserEmail();
        String memberProfileImg = oAuth2UserInfo.getUserProfileImg();
        if (memberProfileImg != null && memberProfileImg.isEmpty()) {
            memberProfileImg = null;
        }

        Member member = Member.createMember(memberProvider, memberProviderId, memberName, memberEmail, memberNickname, Role.ROLE_USER, memberProfileImg);

        return memberRepository.save(member);
    }
}
