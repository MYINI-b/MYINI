package com.ssafy.myini.project.response;

import com.ssafy.myini.member.domain.Member;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectMemberResponse {
    private Long memberId;
    private String memberEmail;
    private String memberProfileImg;
    private String memberName;
    private String memberNickName;

    public static ProjectMemberResponse from(Member member){
        ProjectMemberResponse projectMemberResponse = new ProjectMemberResponse();
        projectMemberResponse.memberId = member.getMemberId();
        projectMemberResponse.memberEmail = member.getMemberEmail();
        projectMemberResponse.memberProfileImg = member.getMemberProfileImg();
        projectMemberResponse.memberName = member.getMemberName();
        projectMemberResponse.memberNickName = member.getMemberNickname();
        return projectMemberResponse;
    }
}