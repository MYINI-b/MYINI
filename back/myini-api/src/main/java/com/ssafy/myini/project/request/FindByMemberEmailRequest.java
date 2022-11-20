package com.ssafy.myini.project.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FindByMemberEmailRequest {
    private String memberEmail;
}
