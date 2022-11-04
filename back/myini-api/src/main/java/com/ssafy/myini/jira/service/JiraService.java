package com.ssafy.myini.jira.service;

import com.ssafy.myini.jira.request.CreateJiraIssueRequest;
import com.ssafy.myini.jira.request.UpdateJiraAccountRequest;
import com.ssafy.myini.jira.request.UpdateJiraProjectRequest;
import com.ssafy.myini.member.domain.Member;
import com.ssafy.myini.requirementdocs.response.JiraProjectListResponse;

import java.util.List;

public interface JiraService {
    void updateJiraAccount(Member member, Long projectId, UpdateJiraAccountRequest request);
    void updateJiraProject(Member member, Long projectId, UpdateJiraProjectRequest request);
    List<JiraProjectListResponse> findJiraProjectList(Long projectId);
    void jiraCreateIssue(Long projectId, CreateJiraIssueRequest createJiraIssueRequest);
}
