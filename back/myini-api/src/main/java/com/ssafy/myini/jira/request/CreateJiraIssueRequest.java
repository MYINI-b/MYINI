package com.ssafy.myini.jira.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateJiraIssueRequest {
    private String projectId;
    private String projectKey;
    private String projectName;
}
