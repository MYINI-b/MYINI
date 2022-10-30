package com.ssafy.myini.apidocs.controller;

import com.ssafy.myini.ControllerTest;
import com.ssafy.myini.apidocs.service.ApiDocsService;
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


@WebMvcTest(ApiDocsController.class)
class ApiDocsControllerTest extends ControllerTest {

    @MockBean
    private ApiDocsService apiDocsService;

    @Test
    @DisplayName("API컨트롤러를 생성한다.")
    void createApiController() throws Exception {
        // given
        willDoNothing()
                .given(apiDocsService)
                .createApiController(any(), any());

        // when
        mockMvc.perform(RestDocumentationRequestBuilders.post("/api/apidocs/{projectid}/controllers", ID)
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(objectMapper.writeValueAsString(TEST_CREATE_API_CONTROLLER_REQUEST)))
                .andExpect(status().isCreated())
                .andDo(document("api/apidocs/{projectid}/controllers",
                        requestHeaders(
                                headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")
                        ),
                        pathParameters(
                                parameterWithName("projectid").description("프로젝트 ID")
                        ),
                        requestFields(
                                fieldWithPath("apiControllerName").type(JsonFieldType.STRING).description("Api Controller 이름"),
                                fieldWithPath("apiControllerBaseUrl").type(JsonFieldType.STRING).description("Api Controller Base URL"),
                                fieldWithPath("apiControllerDescription").type(JsonFieldType.STRING).description("Api Controller 설명")
                        )
                ));


        // then
        then(apiDocsService).should(times(1)).createApiController(any(), any());
    }

    @Test
    @DisplayName("API컨트롤러 리스트를 조회한다.")
    void findApiControllerList() throws Exception {
        // given
        given(apiDocsService.findApiControllerList(any()))
                .willReturn(Arrays.asList(TEST_API_CONTROLLER_LIST_RESPONSE));

        // when
        mockMvc.perform(RestDocumentationRequestBuilders.get("/api/apidocs/{projectid}/controllers", ID)
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
                        .accept(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(Arrays.asList(TEST_API_CONTROLLER_LIST_RESPONSE))))
                .andDo(document("api/apidocs/{projectid}/controllers/list",
                        requestHeaders(
                                headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")
                        ),
                        pathParameters(
                                parameterWithName("projectid").description("프로젝트 ID")
                        ),
                        responseFields(
                                fieldWithPath("[]").type(JsonFieldType.ARRAY).description("결과 배열"),
                                fieldWithPath("[].apiControllerId").type(JsonFieldType.NUMBER).description("Api Controller ID"),
                                fieldWithPath("[].apiControllerName").type(JsonFieldType.STRING).description("Api Controller 이름")
                        )));


        // then
        then(apiDocsService).should(times(1)).findApiControllerList(any());
    }

    @Test
    @DisplayName("API컨트롤러를 조회한다.")
    void findByApiControllerId() throws Exception {
        // given
        given(apiDocsService.findByApiControllerId(any()))
                .willReturn(TEST_API_CONTROLLER_RESPONSE);

        // when
        mockMvc.perform(RestDocumentationRequestBuilders.get("/api/apidocs/controllers/{apicontrollerid}", ID)
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
                        .accept(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(TEST_API_CONTROLLER_RESPONSE)))
                .andDo(document("api/apidocs/controllers/{apicontrollerid}",
                        requestHeaders(
                                headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")
                        ),
                        pathParameters(
                                parameterWithName("apicontrollerid").description("Api Controller ID")
                        ),
                        responseFields(
                                fieldWithPath("apiControllerId").type(JsonFieldType.NUMBER).description("Api Controller ID"),
                                fieldWithPath("apiControllerName").type(JsonFieldType.STRING).description("Api Controller 이름"),
                                fieldWithPath("apiControllerBaseUrl").type(JsonFieldType.STRING).description("Api Controller Base URL"),
                                fieldWithPath("apiControllerDescription").type(JsonFieldType.STRING).description("Api Controller 설명"),
                                fieldWithPath("apiResponses").type(JsonFieldType.ARRAY).description("API 조회 결과 배열"),
                                fieldWithPath("apiResponses.[].apiId").type(JsonFieldType.NUMBER).description("Api ID"),
                                fieldWithPath("apiResponses.[].apiItemId").type(JsonFieldType.NUMBER).description("Api Item ID"),
                                fieldWithPath("apiResponses.[].apiName").type(JsonFieldType.STRING).description("Api 이름"),
                                fieldWithPath("apiResponses.[].apiUrl").type(JsonFieldType.STRING).description("Api URL"),
                                fieldWithPath("apiResponses.[].apiMethod").type(JsonFieldType.STRING).description("Api Method"),
                                fieldWithPath("apiResponses.[].apiCode").type(JsonFieldType.STRING).description("Api Code")
                        )));

        // then
        then(apiDocsService).should(times(1)).findByApiControllerId(any());
    }

    @Test
    @DisplayName("API컨트롤러를 수정한다.")
    void updateApiController() {
        // given
        // when
        // then
    }

    @Test
    @DisplayName("API컨트롤러를 삭제한다.")
    void deleteApiController() {
        // given
        // when
        // then
    }

    @Test
    @DisplayName("API를 생성한다.")
    void createApi() {
        // given
        // when
        // then
    }

    @Test
    @DisplayName("API를 수정한다.")
    void updateApi() {
        // given
        // when
        // then
    }

    @Test
    @DisplayName("API를 삭제한다.")
    void deleteApi() {
        // given
        // when
        // then
    }

    @Test
    @DisplayName("API를 조회한다.")
    void findByApiId() {
        // given
        // when
        // then
    }

    @Test
    @DisplayName("PathVariable을 생성한다.")
    void createPathVariable() {
        // given
        // when
        // then
    }

    @Test
    @DisplayName("PathVariable을 수정한다.")
    void updatePathVariable() {
        // given
        // when
        // then
    }

    @Test
    @DisplayName("PathVariable을 삭제한다.")
    void deletePathVariable() {
        // given
        // when
        // then
    }

    @Test
    @DisplayName("QueryString를 생성한다.")
    void createQueryString() {
        // given
        // when
        // then
    }

    @Test
    @DisplayName("QueryString를 수정한다.")
    void updateQueryString() {
        // given
        // when
        // then
    }

    @Test
    @DisplayName("QueryString를 삭제한다.")
    void deleteQueryString() {
        // given
        // when
        // then
    }

    @Test
    @DisplayName("Dto를 생성한다.")
    void createDto() {
        // given
        // when
        // then
    }

    @Test
    @DisplayName("Dto를 수정한다.")
    void updateDto() {
        // given
        // when
        // then
    }

    @Test
    @DisplayName("Dto를 삭제한다.")
    void deleteDto() {
        // given
        // when
        // then
    }

    @Test
    @DisplayName("Dto를 조회한다.")
    void findByDtoId() {
        // given
        // when
        // then
    }

    @Test
    @DisplayName("Dto변수를 생성한다.")
    void createDtoItem() {
        // given
        // when
        // then
    }

    @Test
    @DisplayName("Dto변수를 수정한다.")
    void updateDtoItem() {
        // given
        // when
        // then
    }

    @Test
    @DisplayName("Dto변수를 삭제한다.")
    void deleteDtoItem() {
        // given
        // when
        // then
    }

    @Test
    @DisplayName("자료형 리스트를 조회한다.")
    void findTypeList() {
        // given
        // when
        // then
    }
}