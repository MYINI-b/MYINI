package com.ssafy.myini.project.response;

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
}