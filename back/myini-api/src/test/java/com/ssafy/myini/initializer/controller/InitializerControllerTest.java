package com.ssafy.myini.initializer.controller;

import com.ssafy.myini.ControllerTest;
import com.ssafy.myini.config.S3Uploader;
import com.ssafy.myini.initializer.service.InitializerService;
import com.ssafy.myini.project.ProjectFixture;
import net.lingala.zip4j.ZipFile;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
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
import java.util.HashMap;
import java.util.Map;


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
    @DisplayName("?????????????????? ???????????? ????????????.")
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
                                parameterWithName("projectid").description("???????????? ID")
                        ),
                        responseFields(
                                fieldWithPath("isPossible").type(JsonFieldType.BOOLEAN).description("?????????????????? ?????? ??????"),
                                fieldWithPath("contents").type(JsonFieldType.STRING).description("?????????????????? ?????? ??????")
                        )));

        // then
        then(initializerService).should(times(1)).initializerIsPossible(any());
    }

//    @Test
//    @DisplayName("????????????????????? ????????????.")
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
//                                parameterWithName("projectid").description("???????????? ID")
//                        ),
//                        requestFields(
//                                fieldWithPath("springType").type(JsonFieldType.STRING).description("????????? ??????"),
//                                fieldWithPath("springLanguage").type(JsonFieldType.STRING).description("????????? ??????"),
//                                fieldWithPath("springPlatformVersion").type(JsonFieldType.STRING).description("????????? ??????"),
//                                fieldWithPath("springPackaging").type(JsonFieldType.STRING).description("????????? ?????????"),
//                                fieldWithPath("springJvmVersion").type(JsonFieldType.STRING).description("????????? ????????????"),
//                                fieldWithPath("springGroupId").type(JsonFieldType.STRING).description("????????? ?????? ID"),
//                                fieldWithPath("springArtifactId").type(JsonFieldType.STRING).description("????????? ???????????? ID"),
//                                fieldWithPath("springName").type(JsonFieldType.STRING).description("????????? ??????"),
//                                fieldWithPath("springDescription").type(JsonFieldType.STRING).description("????????? ??????"),
//                                fieldWithPath("springPackageName").type(JsonFieldType.STRING).description("????????? ???????????????"),
//                                fieldWithPath("springDependencyName").type(JsonFieldType.STRING).description("????????? ???????????? ?????????")
//                        )));
//
//        then(initializerService).should(times(1)).initializerStart(any(), any());
//    }

    @Test
    @DisplayName("?????????????????? ??????????????? ????????????.")
    void initializerPreview() throws Exception {
        given(initializerService.initializerPreview(any(), any())).willReturn(Arrays.asList(TEST_PREVIEW_RESPONSE));

        mockMvc.perform(RestDocumentationRequestBuilders.get("/api/initializers/{projectid}/previews", ID)
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(objectMapper.writeValueAsString(TEST_INITIALIZER_REQUEST)))
                .andExpect(status().isOk())
                .andDo(document("api/initializers/{projectid}/previews",
                        requestHeaders(
                                headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")
                        ),
                        pathParameters(
                                parameterWithName("projectid").description("???????????? ID")
                        ),
                        requestFields(
                                fieldWithPath("springType").type(JsonFieldType.STRING).description("????????? ??????"),
                                fieldWithPath("springLanguage").type(JsonFieldType.STRING).description("????????? ??????"),
                                fieldWithPath("springPlatformVersion").type(JsonFieldType.STRING).description("????????? ??????"),
                                fieldWithPath("springPackaging").type(JsonFieldType.STRING).description("????????? ?????????"),
                                fieldWithPath("springJvmVersion").type(JsonFieldType.STRING).description("????????? ????????????"),
                                fieldWithPath("springGroupId").type(JsonFieldType.STRING).description("????????? ?????? ID"),
                                fieldWithPath("springArtifactId").type(JsonFieldType.STRING).description("????????? ???????????? ID"),
                                fieldWithPath("springName").type(JsonFieldType.STRING).description("????????? ??????"),
                                fieldWithPath("springDescription").type(JsonFieldType.STRING).description("????????? ??????"),
                                fieldWithPath("springPackageName").type(JsonFieldType.STRING).description("????????? ???????????????"),
                                fieldWithPath("springDependencyName").type(JsonFieldType.STRING).description("????????? ???????????? ?????????")
                        ),
                        responseFields(
                                fieldWithPath("[]").type(JsonFieldType.ARRAY).description("?????? ??????"),
                                fieldWithPath("[].fileCategory").type(JsonFieldType.STRING).description("?????? MVC ??????"),
                                fieldWithPath("[].fileName").type(JsonFieldType.STRING).description("?????? ??????"),
                                fieldWithPath("[].contents").type(JsonFieldType.STRING).description("?????? ??????")
                        )
                ));

        then(initializerService).should(times(1)).initializerPreview(any(), any());

    }

    @Test
    @DisplayName("myini??? ???????????????.")
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

    @Test
    @DisplayName("?????????????????? ?????? ????????? ????????????.")
    void initializerDependencies() throws Exception {
        JSONParser p = new JSONParser();
        JSONObject obj = (JSONObject) p.parse(
                "{\"single-select\":{\"??????????????? key\":{\"default\":\"????????? ??? id\",\"values\":[{\"name\":\"????????? ????????? ??????\",\"id\":\"??????????????? value\"}]}}" +
                        ", \"text\":[{\"name\":\"????????? ????????? ??????\", \"id\":\"??????????????? key\"}]" +
                        ", \"dependencies\":[{\"name\":\"????????? ????????? ??????\",\"description\":\"?????? dependency??? ?????? ??????\",\"id\":\"??????????????? value\"}]}"
        );

        // given
        given(initializerService.initializerSettings())
                .willReturn(obj);

        // when
        mockMvc.perform(RestDocumentationRequestBuilders.get("/api/initializers/settings"))
                .andExpect(status().isOk())
                .andDo(document("api/initializers/settings"));

        // then
        then(initializerService).should(times(1)).initializerSettings();

    }

}