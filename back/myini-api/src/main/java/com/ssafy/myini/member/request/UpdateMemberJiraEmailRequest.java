package com.ssafy.myini.member.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateMemberJiraEmailRequest {
    private String memberJiraEmail;
}
