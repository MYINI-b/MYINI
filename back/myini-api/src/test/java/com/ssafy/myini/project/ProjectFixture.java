package com.ssafy.myini.project;

import com.ssafy.myini.apidocs.request.CreateApiControllerRequest;
import com.ssafy.myini.project.request.FindByMemberEmailRequest;
import com.ssafy.myini.project.request.UpdateProjectRequest;
import com.ssafy.myini.project.response.ProjectInfoResponse;
import com.ssafy.myini.project.response.ProjectListResponse;
import com.ssafy.myini.project.response.ProjectMemberResponse;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Arrays;

public class ProjectFixture {
    public static final Long ID = 1L;
    public static final String NAME = "프로젝트 이름";
    public static final String EMAIL = "프로젝트 이름";
    public static final String DESCRIPTION = "프로젝트 설명";
    public static final String IMG = "프로젝트 이미지";
    public static final LocalDate DATE = LocalDate.now();
    public static final String PROJECT_URL = "프로젝트 URL";

    public static final UpdateProjectRequest TEST_UPDATE_PROJECT_REQUEST
            = new UpdateProjectRequest(NAME, DESCRIPTION, IMG, DATE, DATE, PROJECT_URL, PROJECT_URL, PROJECT_URL, PROJECT_URL);
    public static final FindByMemberEmailRequest TEST_FIND_MEMBER_EMAIL_REQUEST
            = new FindByMemberEmailRequest(EMAIL);

    public static final ProjectMemberResponse TEST_PROJECT_MEMBER_RESPONSE
            = new ProjectMemberResponse(ID, EMAIL, IMG, NAME);
    public static final ProjectInfoResponse TEST_PROJECT_INFO_RESPONSE
            = new ProjectInfoResponse(NAME, DESCRIPTION, IMG, DATE, DATE, PROJECT_URL, PROJECT_URL, PROJECT_URL, PROJECT_URL);
    public static final ProjectListResponse TEST_PROJECT_LIST_RESPONSE
            = new ProjectListResponse(NAME, DESCRIPTION, IMG, Arrays.asList(TEST_PROJECT_MEMBER_RESPONSE));
}
