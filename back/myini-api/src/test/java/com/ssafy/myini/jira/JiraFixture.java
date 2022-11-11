package com.ssafy.myini.jira;

import com.ssafy.myini.jira.request.UpdateJiraAccountRequest;
import com.ssafy.myini.jira.request.UpdateJiraDomainRequest;
import com.ssafy.myini.jira.request.UpdateJiraProjectRequest;
import com.ssafy.myini.requirementdocs.response.JiraProjectListResponse;

public class JiraFixture {
    public static final Long ID = 1L;
    public static final String JIRA_ID = "1";
    public static final String JIRA_KEY = "Key";
    public static final String JIRA_NAME = "이름";
    public static final String JIRA_DOMAIN = "도메인";

    public static final UpdateJiraAccountRequest TEST_UPDATE_JIRA_ACCOUNT_REQUEST
            = new UpdateJiraAccountRequest(JIRA_ID, JIRA_KEY);
    public static final UpdateJiraProjectRequest TEST_UPDATE_JIRA_PROJECT_REQUEST
            = new UpdateJiraProjectRequest(JIRA_ID, JIRA_KEY, JIRA_NAME);
    public static final UpdateJiraDomainRequest TEST_UPDATE_JIRA_DOMAIN_REQUEST
            = new UpdateJiraDomainRequest(JIRA_DOMAIN);
    public static final JiraProjectListResponse TEST_JIRA_PROJECT_LIST_RESPONSE
            = new JiraProjectListResponse(JIRA_ID, JIRA_KEY, JIRA_NAME);
}
