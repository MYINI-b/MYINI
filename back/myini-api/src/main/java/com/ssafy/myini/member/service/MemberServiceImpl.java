package com.ssafy.myini.member.service;

import com.ssafy.myini.NotFoundException;
import com.ssafy.myini.member.domain.MemberRepository;
import com.ssafy.myini.member.domain.Member;
import com.ssafy.myini.security.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.ssafy.myini.NotFoundException.MEMBER_NOT_FOUND;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberServiceImpl implements MemberService {
    private final JwtUtil jwtUtil;
    private final MemberRepository memberRepository;

    @Value("${token.access_token.expiration_time}")
    private String accessTokenExpirationTime;

    @Override
    public String generateToken(int memberId) {
        Member findMember = memberRepository.findById(memberId)
                .orElseThrow(() -> new NotFoundException(MEMBER_NOT_FOUND));

        String accessToken = jwtUtil.createToken(findMember.getMemberId(), String.valueOf(findMember.getRole()), accessTokenExpirationTime);

        return accessToken;
    }
}
