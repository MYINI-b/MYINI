package com.ssafy.myini.initializer.controller;

import com.ssafy.myini.ControllerTest;
import com.ssafy.myini.config.S3Uploader;
import com.ssafy.myini.initializer.service.InitializerService;
import com.ssafy.myini.project.ProjectFixture;
import net.lingala.zip4j.ZipFile;
import org.junit.Rule;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.rules.TemporaryFolder;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;

import static com.ssafy.myini.apidocs.ApiDocsFixture.TEST_CREATE_API_CONTROLLER_REQUEST;
import static com.ssafy.myini.project.ProjectFixture.TEST_PROJECT_INFO_RESPONSE;
import static org.springframework.restdocs.headers.HeaderDocumentation.*;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


import java.io.*;
import java.util.Arrays;


import static com.ssafy.myini.CommonFixture.TEST_AUTHORIZATION;
import static com.ssafy.myini.erd.ERDFixture.ID;
import static com.ssafy.myini.erd.ERDFixture.TEST_TABLE_CREATE_REQUEST;
import static com.ssafy.myini.initializer.InitializerFixture.*;
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
import static org.junit.jupiter.api.Assertions.*;

@WebMvcTest(InitializerController.class)
class InitializerControllerTest extends ControllerTest {
    @MockBean
    private InitializerService initializerService;

    @MockBean
    private S3Uploader s3Uploader;

    @Test
    @DisplayName("이니셜라이징 가능한지 확인한다.")
    void initializerIsPossible() throws Exception {
        //given
        given(initializerService.initializerIsPossible(any()))
                .willReturn(TEST_INITIALIZER_POSSIBLE_RESPONSE);

        // when
        mockMvc.perform(RestDocumentationRequestBuilders.get("/api/initializers/{projectid}/ispossible", ID)
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
                        .accept(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(TEST_INITIALIZER_POSSIBLE_RESPONSE)))
                .andDo(document("api/initializers/{projectid}/ispossible",
                        requestHeaders(
                                headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")
                        ),
                        pathParameters(
                                parameterWithName("projectid").description("프로젝트 ID")
                        ),
                        responseFields(
                                fieldWithPath("isPossible").type(JsonFieldType.BOOLEAN).description("이니셜라이징 판단 확인"),
                                fieldWithPath("contents").type(JsonFieldType.STRING).description("이니셜라이징 판단 내용")
                        )));

        // then
        then(initializerService).should(times(1)).initializerIsPossible(any());
    }

//    @Test
//    @DisplayName("이니셜라이징을 시작한다.")
//    void initializerStart() throws Exception {
//        given(initializerService.initializerStart(any(),any())).willReturn(new ZipFile(file));
//
//        mockMvc.perform(RestDocumentationRequestBuilders.post("/api/initializers/{projectid}", ID)
//                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
//                        .contentType(MediaType.APPLICATION_JSON_VALUE)
//                        .content(objectMapper.writeValueAsString(TEST_INITIALIZER_REQUEST)))
//                .andExpect(status().isOk())
//                .andDo(document("api/initializers/{projectid}",
//                        requestHeaders(
//                                headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")
//                        ),
//                        pathParameters(
//                                parameterWithName("projectid").description("프로젝트 ID")
//                        ),
//                        requestFields(
//                                fieldWithPath("springBasePath").type(JsonFieldType.STRING).description("스프링 기본경로"),
//                                fieldWithPath("springType").type(JsonFieldType.STRING).description("스프링 타입"),
//                                fieldWithPath("springLanguage").type(JsonFieldType.STRING).description("스프링 언어"),
//                                fieldWithPath("springPlatformVersion").type(JsonFieldType.STRING).description("스프링 버전"),
//                                fieldWithPath("springPackaging").type(JsonFieldType.STRING).description("스프링 패키지"),
//                                fieldWithPath("springJvmVersion").type(JsonFieldType.STRING).description("스프링 자바버전"),
//                                fieldWithPath("springGroupId").type(JsonFieldType.STRING).description("스프링 그룹 ID"),
//                                fieldWithPath("springArtifactId").type(JsonFieldType.STRING).description("스프링 아티팩트 ID"),
//                                fieldWithPath("springName").type(JsonFieldType.STRING).description("스프링 이름"),
//                                fieldWithPath("springDescription").type(JsonFieldType.STRING).description("스프링 설명"),
//                                fieldWithPath("springPackageName").type(JsonFieldType.STRING).description("스프링 패키지이름"),
//                                fieldWithPath("springDependencyName").type(JsonFieldType.STRING).description("스프링 디펜던시 리스트")
//                        )));
//
//        then(initializerService).should(times(1)).initializerStart(any(), any());
//    }

    @Test
    @DisplayName("이니셜라이징 미리보기를 시작한다.")
    void initializerPreview() throws Exception {
        given(initializerService.initializerPreview(any(),any())).willReturn(Arrays.asList(TEST_PREVIEW_RESPONSE));

        mockMvc.perform(RestDocumentationRequestBuilders.post("/api/initializers/{projectid}/previews", ID)
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(objectMapper.writeValueAsString(TEST_INITIALIZER_REQUEST)))
                .andExpect(status().isOk())
                .andDo(document("api/initializers/{projectid}/previews",
                        requestHeaders(
                                headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")
                        ),
                        pathParameters(
                                parameterWithName("projectid").description("프로젝트 ID")
                        ),
                        requestFields(
                                fieldWithPath("springBasePath").type(JsonFieldType.STRING).description("스프링 기본경로"),
                                fieldWithPath("springType").type(JsonFieldType.STRING).description("스프링 타입"),
                                fieldWithPath("springLanguage").type(JsonFieldType.STRING).description("스프링 언어"),
                                fieldWithPath("springPlatformVersion").type(JsonFieldType.STRING).description("스프링 버전"),
                                fieldWithPath("springPackaging").type(JsonFieldType.STRING).description("스프링 패키지"),
                                fieldWithPath("springJvmVersion").type(JsonFieldType.STRING).description("스프링 자바버전"),
                                fieldWithPath("springGroupId").type(JsonFieldType.STRING).description("스프링 그룹 ID"),
                                fieldWithPath("springArtifactId").type(JsonFieldType.STRING).description("스프링 아티팩트 ID"),
                                fieldWithPath("springName").type(JsonFieldType.STRING).description("스프링 이름"),
                                fieldWithPath("springDescription").type(JsonFieldType.STRING).description("스프링 설명"),
                                fieldWithPath("springPackageName").type(JsonFieldType.STRING).description("스프링 패키지이름"),
                                fieldWithPath("springDependencyName").type(JsonFieldType.STRING).description("스프링 디펜던시 리스트")
                        ),
                        responseFields(
                                fieldWithPath("[]").type(JsonFieldType.ARRAY).description("결과 배열"),
                                fieldWithPath("[].fileCategory").type(JsonFieldType.STRING).description("파일 MVC 종류"),
                                fieldWithPath("[].fileName").type(JsonFieldType.STRING).description("파일 이름"),
                                fieldWithPath("[].contents").type(JsonFieldType.STRING).description("파일 내용")
                        )
                        ));

        then(initializerService).should(times(1)).initializerPreview(any(), any());

    }

    @Test
    @DisplayName("myini를 다운받는다.")
    void myIniDownload() throws Exception {
        // given
        given(initializerService.myIniDownload())
                .willReturn(BYTES);

        // when
        mockMvc.perform(RestDocumentationRequestBuilders.get("/api/initializers/downloads")
                        .accept(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andDo(document("api/initializers/downloads"));

        // then
        then(initializerService).should(times(1)).myIniDownload();


    }
}