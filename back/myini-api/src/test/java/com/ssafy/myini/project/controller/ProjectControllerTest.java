package com.ssafy.myini.project.controller;

import com.ssafy.myini.ControllerTest;
import com.ssafy.myini.apidocs.ApiDocsFixture;
import com.ssafy.myini.apidocs.controller.ApiDocsController;
import com.ssafy.myini.project.service.ProjectService;
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
import static com.ssafy.myini.apidocs.ApiDocsFixture.*;
import static com.ssafy.myini.apidocs.ApiDocsFixture.TEST_API_CONTROLLER_LIST_RESPONSE;
import static com.ssafy.myini.member.MemberFixture.TEST_FILE_REQUEST;
import static com.ssafy.myini.project.ProjectFixture.*;
import static com.ssafy.myini.project.ProjectFixture.ID;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.*;
import static org.mockito.Mockito.times;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.requestHeaders;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.partWithName;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(ProjectController.class)
class ProjectControllerTest extends ControllerTest {

    @MockBean
    private ProjectService projectService;

    @Test
    @DisplayName("프로젝트를 등록한다.")
    void createProject() throws Exception {
        // given
        given(projectService.createProject(any()))
                .willReturn(TEST_PROJECT_CREATE_RESPONSE);

        // when
        mockMvc.perform(RestDocumentationRequestBuilders.post("/api/projects")
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isCreated())
                .andExpect(content().json(objectMapper.writeValueAsString(TEST_PROJECT_CREATE_RESPONSE)))
                .andDo(document("api/projects",
                        requestHeaders(
                                headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")
                        ),
                        responseFields(
                                fieldWithPath("projectId").type(JsonFieldType.NUMBER).description("Project ID")
                        )
                ));


        // then
        then(projectService).should(times(1)).createProject(any());
    }

    @Test
    @DisplayName("회원의 프로젝트 전체 리스트를 조회한다.")
    void findAll() throws Exception {
        // given
        given(projectService.findAll(any()))
                .willReturn(Arrays.asList(TEST_PROJECT_LIST_RESPONSE));

        // when
        mockMvc.perform(RestDocumentationRequestBuilders.get("/api/projects")
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
                        .accept(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(Arrays.asList(TEST_PROJECT_LIST_RESPONSE))))
                .andDo(document("api/projects/list",
                        requestHeaders(
                                headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")
                        ),
                        responseFields(
                                fieldWithPath("[]").type(JsonFieldType.ARRAY).description("결과 배열"),
                                fieldWithPath("[].projectName").type(JsonFieldType.STRING).description("Project 이름"),
                                fieldWithPath("[].projectDescription").type(JsonFieldType.STRING).description("Project 설명"),
                                fieldWithPath("[].projectImg").type(JsonFieldType.STRING).description("Project 이미지"),
                                fieldWithPath("[].projectMemberResponses").type(JsonFieldType.ARRAY).description("Project Member 조회 결과 배열"),
                                fieldWithPath("[].projectMemberResponses.[].memberId").type(JsonFieldType.NUMBER).description("Member ID"),
                                fieldWithPath("[].projectMemberResponses.[].memberEmail").type(JsonFieldType.STRING).description("Member Email"),
                                fieldWithPath("[].projectMemberResponses.[].memberProfileImg").type(JsonFieldType.STRING).description("Member 프로필이미지"),
                                fieldWithPath("[].projectMemberResponses.[].memberName").type(JsonFieldType.STRING).description("Member 이름")
                        )));


        // then
        then(projectService).should(times(1)).findAll(any());
    }

    @Test
    @DisplayName("프로젝트 한개를 조회한다.")
    void findByProjectId() throws Exception {
        // given
        given(projectService.findByProjectId(any()))
                .willReturn(TEST_PROJECT_INFO_RESPONSE);

        // when
        mockMvc.perform(RestDocumentationRequestBuilders.get("/api/projects/{projectid}", ID)
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
                        .accept(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(TEST_PROJECT_INFO_RESPONSE)))
                .andDo(document("api/projects/{projectid}",
                        requestHeaders(
                                headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")
                        ),
                        pathParameters(
                                parameterWithName("projectid").description("Project ID")
                        ),
                        responseFields(
                                fieldWithPath("projectName").type(JsonFieldType.STRING).description("Project 이름"),
                                fieldWithPath("projectDescription").type(JsonFieldType.STRING).description("Project 설명"),
                                fieldWithPath("projectImg").type(JsonFieldType.STRING).description("Project 이미지"),
                                fieldWithPath("projectStartedDate").type(JsonFieldType.STRING).description("Project 시작일"),
                                fieldWithPath("projectFinishedDate").type(JsonFieldType.STRING).description("Project 종료일"),
                                fieldWithPath("projectGithubUrl").type(JsonFieldType.STRING).description("Project Gibhub URL"),
                                fieldWithPath("projectJiraUrl").type(JsonFieldType.STRING).description("Project Jira URL"),
                                fieldWithPath("projectNotionUrl").type(JsonFieldType.STRING).description("Project Notion URL"),
                                fieldWithPath("projectFigmaUrl").type(JsonFieldType.STRING).description("Project Figma URL")
                        )));

        // then
        then(projectService).should(times(1)).findByProjectId(any());

    }

    @Test
    @DisplayName("프로젝트를 수정한다.")
    void updateProject() throws Exception {
        // given
        willDoNothing()
                .given(projectService)
                .updateProject(any(), any(), any());

        // when
        mockMvc.perform(RestDocumentationRequestBuilders.put("/api/projects/{projectid}", ID)
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(objectMapper.writeValueAsString(TEST_UPDATE_PROJECT_REQUEST)))
                .andExpect(status().isOk())
                .andDo(document("api/projects/{projectid}/update",
                        requestHeaders(
                                headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")
                        ),
                        pathParameters(
                                parameterWithName("projectid").description("Project ID")
                        ),
                        requestFields(
                                fieldWithPath("projectName").type(JsonFieldType.STRING).description("Project 이름"),
                                fieldWithPath("projectDescription").type(JsonFieldType.STRING).description("Project 설명"),
                                fieldWithPath("projectStartedDate").type(JsonFieldType.STRING).description("Project 시작일"),
                                fieldWithPath("projectFinishedDate").type(JsonFieldType.STRING).description("Project 종료일"),
                                fieldWithPath("projectGithubUrl").type(JsonFieldType.STRING).description("Project Gibhub URL"),
                                fieldWithPath("projectJiraUrl").type(JsonFieldType.STRING).description("Project Jira URL"),
                                fieldWithPath("projectNotionUrl").type(JsonFieldType.STRING).description("Project Notion URL"),
                                fieldWithPath("projectFigmaUrl").type(JsonFieldType.STRING).description("Project Figma URL")
                        )
                ));

        // then
        then(projectService).should(times(1)).updateProject(any(), any(), any());

    }

    @Test
    @DisplayName("프로젝트 이미지를 수정한다.")
    void updateProjectImg() throws Exception{
        // given
        willDoNothing()
                .given(projectService)
                .updateProjectImg(any(), any(), any());

        // when
        mockMvc.perform(RestDocumentationRequestBuilders.multipart("/api/projects/{projectid}/images", ID)
                        .file(TEST_UPDATE_PROJECT_IMG_REQUEST)
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
                        .accept(MediaType.APPLICATION_JSON_VALUE)
                        .with(request -> {
                            request.setMethod("PATCH");
                            return request;
                        }))
                .andExpect(status().isOk())
                .andDo(document("api/projects/{projectid}/images",
                        requestHeaders(
                                headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")
                        ),
                        pathParameters(
                                parameterWithName("projectid").description("Project ID")
                        ),
                        requestParts(
                                partWithName("projectImg").description("프로젝트 이미지 파일")
                        )
                ));

        // then
        then(projectService).should(times(1)).updateProjectImg(any(), any(), any());
    }

    @Test
    @DisplayName("프로젝트를 삭제한다.")
    void deleteProject() throws Exception {
        // given
        willDoNothing()
                .given(projectService)
                .deleteProject(any(), any());

        // when
        mockMvc.perform(RestDocumentationRequestBuilders.delete("/api/projects/{projectid}", ID)
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
                        .accept(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andDo(document("api/projects/{projectid}/delete",
                        requestHeaders(
                                headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")
                        ),
                        pathParameters(
                                parameterWithName("projectid").description("Project ID")
                        )));

        // then
        then(projectService).should(times(1)).deleteProject(any(), any());

    }

    @Test
    @DisplayName("프로젝트의 팀원리스트를 조회한다.")
    void findProjectMemberList() throws Exception {
        // given
        given(projectService.findProjectMemberList(any()))
                .willReturn(Arrays.asList(TEST_PROJECT_MEMBER_RESPONSE));

        // when
        mockMvc.perform(RestDocumentationRequestBuilders.get("/api/projects/members/{projectid}", ID)
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
                        .accept(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(Arrays.asList(TEST_PROJECT_MEMBER_RESPONSE))))
                .andDo(document("api/projects/members/{projectid}",
                        requestHeaders(
                                headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")
                        ),
                        pathParameters(
                                parameterWithName("projectid").description("Project ID")
                        ),
                        responseFields(
                                fieldWithPath("[]").type(JsonFieldType.ARRAY).description("결과 배열"),
                                fieldWithPath("[].memberId").type(JsonFieldType.NUMBER).description("Member ID"),
                                fieldWithPath("[].memberEmail").type(JsonFieldType.STRING).description("Member Email"),
                                fieldWithPath("[].memberProfileImg").type(JsonFieldType.STRING).description("Member 프로필이미지"),
                                fieldWithPath("[].memberName").type(JsonFieldType.STRING).description("Member 이름")
                        )));


        // then
        then(projectService).should(times(1)).findProjectMemberList(any());

    }

    @Test
    @DisplayName("팀원을 검색한다.")
    void findByMemberEmail() throws Exception {
        // given
        given(projectService.findByMemberEmail(any()))
                .willReturn(TEST_PROJECT_MEMBER_RESPONSE);

        // when
        mockMvc.perform(RestDocumentationRequestBuilders.post("/api/projects/members", ID)
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(objectMapper.writeValueAsString(TEST_FIND_MEMBER_EMAIL_REQUEST)))
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(TEST_PROJECT_MEMBER_RESPONSE)))
                .andDo(document("api/projects/members",
                        requestHeaders(
                                headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")
                        ),
                        requestFields(
                                fieldWithPath("memberEmail").type(JsonFieldType.STRING).description("Member Email")
                        ),
                        responseFields(
                                fieldWithPath("memberId").type(JsonFieldType.NUMBER).description("Member ID"),
                                fieldWithPath("memberEmail").type(JsonFieldType.STRING).description("Member Email"),
                                fieldWithPath("memberProfileImg").type(JsonFieldType.STRING).description("Member 프로필이미지"),
                                fieldWithPath("memberName").type(JsonFieldType.STRING).description("Member 이름")
                        )));


        // then
        then(projectService).should(times(1)).findByMemberEmail(any());

    }

    @Test
    @DisplayName("프로젝트 팀원을 추가한다.")
    void addProjectMember() throws Exception {
        // given
        willDoNothing()
                .given(projectService)
                .addProjectMember(any(), any(), any());

        // when
        mockMvc.perform(RestDocumentationRequestBuilders.post("/api/projects/{projectid}/members/{memberid}", ID, ID)
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isCreated())
                .andDo(document("api/projects/{projectid}/members/{memberid}",
                        requestHeaders(
                                headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")
                        ),
                        pathParameters(
                                parameterWithName("projectid").description("Project ID"),
                                parameterWithName("memberid").description("Member ID")
                        )
                ));


        // then
        then(projectService).should(times(1)).addProjectMember(any(), any(), any());
    }

    @Test
    @DisplayName("프로젝트를 팀원을 삭제한다.")
    void deleteProjectMember() throws Exception {
        // given
        willDoNothing()
                .given(projectService)
                .deleteProjectMember(any(), any(), any());

        // when
        mockMvc.perform(RestDocumentationRequestBuilders.delete("/api/projects/{projectid}/members/{memberid}", ID, ID)
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
                        .accept(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andDo(document("api/projects/{projectid}/members/{memberid}/delete",
                        requestHeaders(
                                headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")
                        ),
                        pathParameters(
                                parameterWithName("projectid").description("Project ID"),
                                parameterWithName("memberid").description("Member ID")
                        )));

        // then
        then(projectService).should(times(1)).deleteProjectMember(any(), any(), any());
    }
}