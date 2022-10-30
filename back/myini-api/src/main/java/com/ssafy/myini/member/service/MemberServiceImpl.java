package com.ssafy.myini.member.service;

import com.ssafy.myini.NotFoundException;
import com.ssafy.myini.member.domain.*;
import com.ssafy.myini.member.query.*;
import com.ssafy.myini.member.response.*;
import com.ssafy.myini.project.domain.*;
import com.ssafy.myini.security.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.*;

import static com.ssafy.myini.NotFoundException.MEMBER_NOT_FOUND;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberServiceImpl implements MemberService {
    private final JwtUtil jwtUtil;
    private final MemberRepository memberRepository;
    private final MemberQueryRepository memberQueryRepository;

    @Value("${token.access_token.expiration_time}")
    private String accessTokenExpirationTime;

    @Override
    public String generateToken(Long memberId) {
        Member findMember = memberRepository.findById(memberId)
                .orElseThrow(() -> new NotFoundException(MEMBER_NOT_FOUND));

        String accessToken = jwtUtil.createToken(findMember.getMemberId(), String.valueOf(findMember.getRole()), accessTokenExpirationTime);

        return accessToken;
    }

    @Override
    public MemberInfoResponse findMember(Member member) {
        memberRepository.findById(member.getMemberId())
                .orElseThrow(() -> new NotFoundException(MEMBER_NOT_FOUND));
        return MemberInfoResponse.from(member);
    }

    @Override
    public List<CrewResponse> findCrewById(Member member) {
        memberRepository.findById(member.getMemberId())
                .orElseThrow(() -> new NotFoundException(MEMBER_NOT_FOUND));

        return memberQueryRepository.findCrewById(member)
                .stream().map(CrewResponse::from)
                .collect(Collectors.toList());
    }
}
