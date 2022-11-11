package com.ssafy.myini.member.service;

import com.ssafy.myini.member.domain.*;
import com.ssafy.myini.member.request.UpdateMemberJiraEmailRequest;
import com.ssafy.myini.member.response.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

public interface MemberService {
    String generateToken(Long userId);
    MemberInfoResponse findMember(Member member);
    List<CrewResponse> findCrewById(Member member);
    void updateMemberProfileImg(Member member, MultipartFile img);

    void updateMemberJiraEmail(Member member, UpdateMemberJiraEmailRequest request);
}
