package com.ssafy.myini.member.controller;

import com.ssafy.myini.config.LoginMember;
import com.ssafy.myini.member.domain.Member;
import com.ssafy.myini.member.request.UpdateMemberJiraEmailRequest;
import com.ssafy.myini.member.response.*;
import com.ssafy.myini.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.*;

@RequestMapping("/api/members")
@RestController
@RequiredArgsConstructor
public class MemberController {
    private final MemberService memberService;

    @GetMapping
    // 회원정보 조회
    public ResponseEntity<MemberInfoResponse> findMember(@LoginMember Member member) {
        MemberInfoResponse body = memberService.findMember(member);
        return ResponseEntity.ok().body(body);
    }

    @GetMapping("/crew")
    // 함께했던 회원 조회
    public ResponseEntity<List<CrewResponse>> findCrewById(@LoginMember Member member) {
        List<CrewResponse> body = memberService.findCrewById(member);
        return ResponseEntity.ok().body(body);
    }

    @PatchMapping("/profile")
    // 프로필사진 수정
    public ResponseEntity<Void> updateMemberProfileImg(@LoginMember Member member, MultipartFile img) {
        memberService.updateMemberProfileImg(member, img);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    //지라 이메일 등록 및 변경
    @PatchMapping("/jiraemail")
    public ResponseEntity<Void> updateMemberJiraEmail(@LoginMember Member member,@RequestBody @Valid UpdateMemberJiraEmailRequest request){
        memberService.updateMemberJiraEmail(member, request);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
