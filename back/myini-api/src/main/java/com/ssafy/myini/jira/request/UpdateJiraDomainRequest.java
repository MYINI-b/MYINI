package com.ssafy.myini.jira.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateJiraDomainRequest {
    private String jiraDomain;
}
