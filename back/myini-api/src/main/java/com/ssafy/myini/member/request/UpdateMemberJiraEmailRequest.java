package com.ssafy.myini.member.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateMemberJiraEmailRequest {
    @NotBlank(message = "JIRA 연동 이메일값은 필수값입니다.")
    @Email(message = "이메일 형식에 맞춰주세요")
    private String memberJiraEmail;
}
