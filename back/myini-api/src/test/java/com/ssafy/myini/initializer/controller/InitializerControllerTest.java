package com.ssafy.myini.initializer.controller;

import com.ssafy.myini.ControllerTest;
import com.ssafy.myini.config.S3Uploader;
import com.ssafy.myini.initializer.service.InitializerService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;

import static org.springframework.restdocs.headers.HeaderDocumentation.*;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


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
//    void initializerStart() throws Exception {
//        willDoNothing().given(initializerService).initializerStart(any(), any());
//
//        mockMvc.perform(RestDocumentationRequestBuilders.get("/api/initializers/{projectid}", ID)
//                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
//                        .contentType(MediaType.APPLICATION_JSON_VALUE)
//                        .content(objectMapper.writeValueAsString(TEST_INITIALIZER_REQUEST)))
//                .andExpect(status().isOk())
//                .andDo(document("api/initializers/{projectid}",
//                        requestParameters(
//                                parameterWithName("spring_base_path").description("스프링 기본경로"),
//                                parameterWithName("spring_type").description("스프링 타입"),
//                                parameterWithName("spring_language").description("스프링 언어"),
//                                parameterWithName("spring_platform_version").description("스프링 버전"),
//                                parameterWithName("spring_packaging").description("스프링 패키지"),
//                                parameterWithName("spring_jvm_version").description("스프링 자바버전"),
//                                parameterWithName("spring_group_id").description("스프링 그룹 ID"),
//                                parameterWithName("spring_artifact_id").description("스프링 아티팩트 ID"),
//                                parameterWithName("spring_name").description("스프링 이름"),
//                                parameterWithName("spring_description").description("스프링 설명"),
//                                parameterWithName("spring_package_name").description("스프링 패키지이름"),
//                                parameterWithName("spring_dependency_name").description("스프링 디펜던시 리스트")
//                        ),
//                        requestHeaders(headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")),
//                        pathParameters(parameterWithName("projectid").description("프로젝트 ID"))
//                ));
//
//        then(initializerService).should(times(1)).initializerStart(any(), any());
//
//    }

    @Test
    void myIniDownload() throws Exception {

    }
}