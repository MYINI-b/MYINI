package com.ssafy.myini.requirementdocs.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JiraProjectListResponse {
    private String jiraProjectId;
    private String jiraProjectKey;
    private String jiraProjectName;
}
