package com.ssafy.myini.jira.controller;

import com.ssafy.myini.ControllerTest;
import com.ssafy.myini.apidocs.ApiDocsFixture;
import com.ssafy.myini.jira.JiraFixture;
import com.ssafy.myini.jira.service.JiraService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;

import java.util.Arrays;

import static com.ssafy.myini.CommonFixture.TEST_AUTHORIZATION;
import static com.ssafy.myini.jira.JiraFixture.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.*;
import static org.mockito.Mockito.times;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.requestHeaders;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(JiraController.class)
class JiraControllerTest extends ControllerTest {
    @MockBean
    private JiraService jiraService;

    @Test
    @DisplayName("프로젝트 지라 계정을 수정한다.")
    void updateJiraAccount() throws Exception {
        // given
        willDoNothing()
                .given(jiraService)
                .updateJiraAccount(any(), any(), any());

        // when
        mockMvc.perform(RestDocumentationRequestBuilders.put("/api/jiras/{projectid}/jiraaccount", ID)
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(objectMapper.writeValueAsString(TEST_UPDATE_JIRA_ACCOUNT_REQUEST)))
                .andExpect(status().isOk())
                .andDo(document("api/jiras/{projectid}/jiraaccount",
                        requestHeaders(
                                headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")
                        ),
                        pathParameters(
                                parameterWithName("projectid").description("Project ID")
                        ),
                        requestFields(
                                fieldWithPath("jiraId").type(JsonFieldType.STRING).description("JIRA ID"),
                                fieldWithPath("jiraApiKey").type(JsonFieldType.STRING).description("JIRA API KEY")
                        )
                ));

        // then
        then(jiraService).should(times(1)).updateJiraAccount(any(), any(), any());

    }

    @Test
    @DisplayName("연동된 지라 도메인을 수정한다.")
    void updateJiraDomain() throws Exception {
        // given
        willDoNothing()
                .given(jiraService)
                .updateJiraDomain(any(), any(), any());

        // when
        mockMvc.perform(RestDocumentationRequestBuilders.put("/api/jiras/{projectid}/jiradomain", ID)
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(objectMapper.writeValueAsString(TEST_UPDATE_JIRA_DOMAIN_REQUEST)))
                .andExpect(status().isOk())
                .andDo(document("api/jiras/{projectid}/jiradomain",
                        requestHeaders(
                                headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")
                        ),
                        pathParameters(
                                parameterWithName("projectid").description("Project ID")
                        ),
                        requestFields(
                                fieldWithPath("jiraDomain").type(JsonFieldType.STRING).description("JIRA DOMAIN")
                        )
                ));

        // then
        then(jiraService).should(times(1)).updateJiraDomain(any(), any(), any());

    }

    @Test
    @DisplayName("연동된 지라 프로젝트를 수정한다.")
    void updateJiraProject() throws Exception {
        // given
        willDoNothing()
                .given(jiraService)
                .updateJiraProject(any(), any(), any());

        // when
        mockMvc.perform(RestDocumentationRequestBuilders.put("/api/jiras/{projectid}/jiraproject", ID)
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(objectMapper.writeValueAsString(TEST_UPDATE_JIRA_PROJECT_REQUEST)))
                .andExpect(status().isOk())
                .andDo(document("api/jiras/{projectid}/jiraproject",
                        requestHeaders(
                                headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")
                        ),
                        pathParameters(
                                parameterWithName("projectid").description("Project ID")
                        ),
                        requestFields(
                                fieldWithPath("jiraProjectId").type(JsonFieldType.STRING).description("JIRA Project ID"),
                                fieldWithPath("jiraProjectKey").type(JsonFieldType.STRING).description("JIRA Project KEY"),
                                fieldWithPath("jiraProjectName").type(JsonFieldType.STRING).description("JIRA Project 이름")
                        )
                ));

        // then
        then(jiraService).should(times(1)).updateJiraProject(any(), any(), any());

    }

    @Test
    @DisplayName("지라 프로젝트 리스트를 조회한다.")
    void findJiraProjectList() throws Exception {
        // given
        given(jiraService.findJiraProjectList(any()))
                .willReturn(Arrays.asList(TEST_JIRA_PROJECT_LIST_RESPONSE));

        // when
        mockMvc.perform(RestDocumentationRequestBuilders.get("/api/jiras/{projectid}/projects", ID)
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
                        .accept(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(Arrays.asList(TEST_JIRA_PROJECT_LIST_RESPONSE))))
                .andDo(document("api/jiras/{projectid}/projects",
                        requestHeaders(
                                headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")
                        ),
                        pathParameters(
                                parameterWithName("projectid").description("Project ID")
                        ),
                        responseFields(
                                fieldWithPath("[]").type(JsonFieldType.ARRAY).description("결과 배열"),
                                fieldWithPath("[].jiraProjectId").type(JsonFieldType.STRING).description("JIRA Project ID"),
                                fieldWithPath("[].jiraProjectKey").type(JsonFieldType.STRING).description("JIRA Project KEY"),
                                fieldWithPath("[].jiraProjectName").type(JsonFieldType.STRING).description("JIRA Project 이름")
                        )));

        // then
        then(jiraService).should(times(1)).findJiraProjectList(any());

    }

    @Test
    @DisplayName("지라 이슈를 등록한다.")
    void jiraCreateIssue() throws Exception {
        // given
        willDoNothing()
                .given(jiraService)
                .jiraCreateIssue(any());

        // when
        mockMvc.perform(RestDocumentationRequestBuilders.post("/api/jiras/{projectid}/createissue", ID)
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION))
                .andExpect(status().isCreated())
                .andDo(document("api/jiras/{projectid}/createissue",
                        requestHeaders(
                                headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")
                        ),
                        pathParameters(
                                parameterWithName("projectid").description("Project ID")
                        )
                ));

        // then
        then(jiraService).should(times(1)).jiraCreateIssue(any());

    }
}