package com.ssafy.myini.jira.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateJiraAccountRequest {
    private String jiraId;
    private String jiraApiKey;
}
