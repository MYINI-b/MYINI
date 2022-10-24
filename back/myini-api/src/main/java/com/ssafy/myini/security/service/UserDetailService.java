package com.ssafy.myini.security.service;

import com.ssafy.myini.NotFoundException;
import com.ssafy.myini.member.domain.MemberRepository;
import com.ssafy.myini.member.domain.Member;
import com.ssafy.myini.security.oauth.LoginUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static com.ssafy.myini.NotFoundException.MEMBER_NOT_FOUND;

@Service
@RequiredArgsConstructor
public class UserDetailService implements UserDetailsService {

    private final MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
        Member findMember = memberRepository.findById(Integer.parseInt(userId))
                .orElseThrow(() -> new NotFoundException(MEMBER_NOT_FOUND));

        List<SimpleGrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(String.valueOf(findMember.getRole())));

        LoginUserDetails loginUserDetails = new LoginUserDetails(String.valueOf(findMember.getMemberId()), "", authorities);
        loginUserDetails.setMember(findMember);
        return loginUserDetails;
    }
}