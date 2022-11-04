package com.ssafy.myini.jira.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateJiraProjectRequest {
    private String jiraProjectId;
    private String jiraProjectKey;
    private String jiraProjectName;
}
