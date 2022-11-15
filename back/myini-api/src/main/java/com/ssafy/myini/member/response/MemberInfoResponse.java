package com.ssafy.myini.member.response;

import com.ssafy.myini.member.domain.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MemberInfoResponse {
    private Long memberId;
    private String memberNickname;
    private String memberEmail;
    private String memberProfileImg;
    private String memberJiraEmail;
    private Integer projectCount;

    public static MemberInfoResponse from(Member member, Integer projectCount) {
        MemberInfoResponse memberInfoResponse = new MemberInfoResponse();
        memberInfoResponse.memberId = member.getMemberId();
        memberInfoResponse.memberNickname = member.getMemberNickname();
        memberInfoResponse.memberEmail = member.getMemberEmail();
        memberInfoResponse.memberProfileImg = member.getMemberProfileImg();
        memberInfoResponse.memberJiraEmail = member.getMemberJiraEmail();
        memberInfoResponse.projectCount = projectCount;

        return memberInfoResponse;
    }
}
