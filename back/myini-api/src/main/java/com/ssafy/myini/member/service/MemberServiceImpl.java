package com.ssafy.myini.member.service;

import com.ssafy.myini.NotFoundException;
import com.ssafy.myini.config.S3Uploader;
import com.ssafy.myini.member.domain.*;
import com.ssafy.myini.member.query.*;
import com.ssafy.myini.member.response.*;
import com.ssafy.myini.project.domain.*;
import com.ssafy.myini.security.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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
    private final S3Uploader s3Uploader;

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

    @Override
    @Transactional
    public void updateMemberProfileImg(Member member, MultipartFile profileImg) {
        Member findMember = memberRepository.findById(member.getMemberId())
                .orElseThrow(() -> new NotFoundException(MEMBER_NOT_FOUND));

        if (member.getMemberProfileImg() != null) {
            // 이미 등록된 프로필 사진이 있는 상태에서 바꾼다 -> 기존 파일 삭제
            s3Uploader.deleteFile(s3Uploader.MEMBER_PROFILE_URL + findMember.getMemberProfileImg());
        }

        String fileName = s3Uploader.uploadFile(profileImg, s3Uploader.MEMBER_PROFILE_URL);
        findMember.updateMemberProfileImg(fileName);
    }
}
