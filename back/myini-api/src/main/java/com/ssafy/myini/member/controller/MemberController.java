package com.ssafy.myini.member.controller;

import com.ssafy.myini.config.LoginMember;
import com.ssafy.myini.member.domain.Member;
import com.ssafy.myini.member.service.MemberService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/members")
@RestController
@RequiredArgsConstructor
public class MemberController {
    private final MemberService memberService;

    @GetMapping("/test")
    public ResponseEntity<String> test(@LoginMember Member member){
        return ResponseEntity.ok().body("success");
    }
}
