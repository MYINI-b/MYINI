package com.ssafy.myini.member.response;

import com.ssafy.myini.member.domain.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MemberInfoResponse {
    private Long memberId;
    private String memberName;
    private String memberEmail;
    private String memberProfileImg;

    public static MemberInfoResponse from(Member member) {
        MemberInfoResponse memberInfoResponse = new MemberInfoResponse();
        memberInfoResponse.memberId = member.getMemberId();
        memberInfoResponse.memberName = member.getMemberName();
        memberInfoResponse.memberEmail = member.getMemberEmail();
        memberInfoResponse.memberProfileImg = member.getMemberProfileImg();

        return memberInfoResponse;
    }
}
