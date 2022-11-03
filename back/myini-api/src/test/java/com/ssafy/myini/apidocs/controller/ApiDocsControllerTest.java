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
                                fieldWithPath("apiResponses.[].apiName").type(JsonFieldType.STRING).description("Api 이름"),
                                fieldWithPath("apiResponses.[].apiUrl").type(JsonFieldType.STRING).description("Api URL"),
                                fieldWithPath("apiResponses.[].apiMethod").type(JsonFieldType.STRING).description("Api Method"),
                                fieldWithPath("apiResponses.[].apiCode").type(JsonFieldType.STRING).description("Api Code"),
                                fieldWithPath("apiResponses.[].apiMethodName").type(JsonFieldType.STRING).description("Api 메서드 이름")
                        )));

        // then
        then(apiDocsService).should(times(1)).findByApiControllerId(any());
    }

    @Test
    @DisplayName("API컨트롤러를 수정한다.")
    void updateApiController() throws Exception {
        // given
        willDoNothing()
                .given(apiDocsService)
                .updateApiController(any(), any());

        // when
        mockMvc.perform(RestDocumentationRequestBuilders.put("/api/apidocs/controllers/{apicontrollerid}", ID)
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(objectMapper.writeValueAsString(TEST_UPDATE_API_CONTROLLER_REQUEST)))
                .andExpect(status().isOk())
                .andDo(document("api/apidocs/controllers/{apicontrollerid}/update",
                        requestHeaders(
                                headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")
                        ),
                        pathParameters(
                                parameterWithName("apicontrollerid").description("Api Controller ID")
                        ),
                        requestFields(
                                fieldWithPath("apiControllerName").type(JsonFieldType.STRING).description("Api Controller 이름"),
                                fieldWithPath("apiControllerBaseUrl").type(JsonFieldType.STRING).description("Api Controller Base URL"),
                                fieldWithPath("apiControllerDescription").type(JsonFieldType.STRING).description("Api Controller 설명")
                        )
                ));

        // then
        then(apiDocsService).should(times(1)).updateApiController(any(), any());
    }

    @Test
    @DisplayName("API컨트롤러를 삭제한다.")
    void deleteApiController() throws Exception {
        // given
        willDoNothing()
                .given(apiDocsService)
                .deleteApiController(any());

        // when
        mockMvc.perform(RestDocumentationRequestBuilders.delete("/api/apidocs/controllers/{apicontrollerid}", ID)
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
                        .accept(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andDo(document("api/apidocs/controllers/{apicontrollerid}/delete",
                        requestHeaders(
                                headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")
                        ),
                        pathParameters(
                                parameterWithName("apicontrollerid").description("Api Controller ID")
                        )));

        // then
        then(apiDocsService).should(times(1)).deleteApiController(any());
    }

    @Test
    @DisplayName("API를 생성한다.")
    void createApi() throws Exception {
        // given
        willDoNothing()
                .given(apiDocsService)
                .createApi(any(), any());

        // when
        mockMvc.perform(RestDocumentationRequestBuilders.post("/api/apidocs/{apicontrollerid}/apis", ID)
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(objectMapper.writeValueAsString(TEST_CREATE_API_REQUEST)))
                .andExpect(status().isCreated())
                .andDo(document("api/apidocs/{apicontrollerid}/apis",
                        requestHeaders(
                                headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")
                        ),
                        pathParameters(
                                parameterWithName("apicontrollerid").description("Api Controller ID")
                        ),
                        requestFields(
                                fieldWithPath("apiName").type(JsonFieldType.STRING).description("Api 이름"),
                                fieldWithPath("apiUrl").type(JsonFieldType.STRING).description("Api URL"),
                                fieldWithPath("apiMethod").type(JsonFieldType.STRING).description("Api Method"),
                                fieldWithPath("apiCode").type(JsonFieldType.STRING).description("Api Code"),
                                fieldWithPath("apiMethodName").type(JsonFieldType.STRING).description("Api Method 이름")
                        )
                ));

        // then
        then(apiDocsService).should(times(1)).createApi(any(), any());
    }

    @Test
    @DisplayName("API를 수정한다.")
    void updateApi() throws Exception {
        // given
        willDoNothing()
                .given(apiDocsService)
                .updateApi(any(), any());

        // when
        mockMvc.perform(RestDocumentationRequestBuilders.put("/api/apidocs/apis/{apiid}", ID)
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(objectMapper.writeValueAsString(TEST_UPDATE_API_REQUEST)))
                .andExpect(status().isOk())
                .andDo(document("api/apidocs/apis/{apiid}/update",
                        requestHeaders(
                                headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")
                        ),
                        pathParameters(
                                parameterWithName("apiid").description("Api ID")
                        ),
                        requestFields(
                                fieldWithPath("apiName").type(JsonFieldType.STRING).description("Api 이름"),
                                fieldWithPath("apiUrl").type(JsonFieldType.STRING).description("Api URL"),
                                fieldWithPath("apiMethod").type(JsonFieldType.STRING).description("Api Method"),
                                fieldWithPath("apiCode").type(JsonFieldType.STRING).description("Api Code"),
                                fieldWithPath("apiMethodName").type(JsonFieldType.STRING).description("Api Method 이름")
                        )
                ));

        // then
        then(apiDocsService).should(times(1)).updateApi(any(), any());
    }

    @Test
    @DisplayName("API를 삭제한다.")
    void deleteApi() throws Exception {
        // given
        willDoNothing()
                .given(apiDocsService)
                .deleteApi(any());

        // when
        mockMvc.perform(RestDocumentationRequestBuilders.delete("/api/apidocs/apis/{apiid}", ID)
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
                        .accept(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andDo(document("api/apidocs/apis/{apiid}/delete",
                        requestHeaders(
                                headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")
                        ),
                        pathParameters(
                                parameterWithName("apiid").description("Api ID")
                        )));

        // then
        then(apiDocsService).should(times(1)).deleteApi(any());
    }

    @Test
    @DisplayName("API를 조회한다.")
    void findByApiId() throws Exception {
        // given
        given(apiDocsService.findByApiId(any()))
                .willReturn(TEST_API_INFO_RESPONSE);

        // when
        mockMvc.perform(RestDocumentationRequestBuilders.get("/api/apidocs/apis/{apiid}", ID)
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
                        .accept(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(TEST_API_INFO_RESPONSE)))
                .andDo(document("api/apidocs/apis/{apiid}",
                        requestHeaders(
                                headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")
                        ),
                        pathParameters(
                                parameterWithName("apiid").description("Api ID")
                        ),
                        responseFields(
                                fieldWithPath("apiResponse").type(JsonFieldType.OBJECT).description("Api 조회결과 객체"),
                                fieldWithPath("apiResponse.apiId").type(JsonFieldType.NUMBER).description("Api ID"),
                                fieldWithPath("apiResponse.apiName").type(JsonFieldType.STRING).description("Api 이름"),
                                fieldWithPath("apiResponse.apiUrl").type(JsonFieldType.STRING).description("Api URL"),
                                fieldWithPath("apiResponse.apiMethod").type(JsonFieldType.STRING).description("Api Method"),
                                fieldWithPath("apiResponse.apiCode").type(JsonFieldType.STRING).description("Api Code"),
                                fieldWithPath("apiResponse.apiMethodName").type(JsonFieldType.STRING).description("Api 메서드 이름"),
                                fieldWithPath("pathVariableResponses").type(JsonFieldType.ARRAY).description("PathVariable 조회결과 배열"),
                                fieldWithPath("pathVariableResponses.[].pathVariableId").type(JsonFieldType.NUMBER).description("Pathvariable ID"),
                                fieldWithPath("pathVariableResponses.[].pathVariableKey").type(JsonFieldType.STRING).description("Pathvariable Key"),
                                fieldWithPath("pathVariableResponses.[].pathVariableType").type(JsonFieldType.STRING).description("Pathvariable Type"),
                                fieldWithPath("queryStringResponses").type(JsonFieldType.ARRAY).description("QueryString 조회결과 배열"),
                                fieldWithPath("queryStringResponses.[].queryStringId").type(JsonFieldType.NUMBER).description("Querystring ID"),
                                fieldWithPath("queryStringResponses.[].queryStringKey").type(JsonFieldType.STRING).description("Querystring Key"),
                                fieldWithPath("queryStringResponses.[].queryStringType").type(JsonFieldType.STRING).description("Querystring Type"),
                                fieldWithPath("dtoResponses").type(JsonFieldType.ARRAY).description("Dto 조회결과 배열"),
                                fieldWithPath("dtoResponses.[].dtoId").type(JsonFieldType.NUMBER).description("Dto ID"),
                                fieldWithPath("dtoResponses.[].dtoName").type(JsonFieldType.STRING).description("Dto 이름"),
                                fieldWithPath("dtoResponses.[].dtoType").type(JsonFieldType.STRING).description("Dto Type"),
                                fieldWithPath("dtoResponses.[].dtoIsList").type(JsonFieldType.STRING).description("Dto 리스트 여부"),
                                fieldWithPath("dtoResponses.[].dtoItemResponses").type(JsonFieldType.ARRAY).description("DtoItem 조회결과 배열"),
                                fieldWithPath("dtoResponses.[].dtoItemResponses.[].dtoItemId").type(JsonFieldType.NUMBER).description("DtoItem ID"),
                                fieldWithPath("dtoResponses.[].dtoItemResponses.[].dtoItemName").type(JsonFieldType.STRING).description("DtoItem 이름"),
                                fieldWithPath("dtoResponses.[].dtoItemResponses.[].dtoClassTypeId").type(JsonFieldType.NUMBER).description("DtoItem DtoClassTypeId"),
                                fieldWithPath("dtoResponses.[].dtoItemResponses.[].dtoPrimitiveTypeId").type(JsonFieldType.NUMBER).description("DtoItem DtoPrimitiveTypeId"),
                                fieldWithPath("dtoResponses.[].dtoItemResponses.[].dtoIsList").type(JsonFieldType.STRING).description("리스트여부"),
                                fieldWithPath("dtoResponses.[].dtoItemResponses.[].dtoClassTypeName").type(JsonFieldType.STRING).description("DtoItem DtoClassTypeName"),
                                fieldWithPath("dtoResponses.[].dtoItemResponses.[].dtoPrimitiveTypeName").type(JsonFieldType.STRING).description("DtoItem DtoPrimitiveTypeName")

                        )));

        // then
        then(apiDocsService).should(times(1)).findByApiId(any());
    }

    @Test
    @DisplayName("PathVariable을 생성한다.")
    void createPathVariable() throws Exception {
        // given
        willDoNothing()
                .given(apiDocsService)
                .createPathVariable(any(), any());

        // when
        mockMvc.perform(RestDocumentationRequestBuilders.post("/api/apidocs/{apiid}/pathvariables", ID)
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(objectMapper.writeValueAsString(TEST_CREATE_PATHVARIABLE_REQUEST)))
                .andExpect(status().isCreated())
                .andDo(document("api/apidocs/{apiid}/pathvariables",
                        requestHeaders(
                                headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")
                        ),
                        pathParameters(
                                parameterWithName("apiid").description("Api ID")
                        ),
                        requestFields(
                                fieldWithPath("pathVariableKey").type(JsonFieldType.STRING).description("Pathvariable Key"),
                                fieldWithPath("pathVariableType").type(JsonFieldType.STRING).description("Pathvariable Type")
                        )
                ));

        // then
        then(apiDocsService).should(times(1)).createPathVariable(any(), any());
    }

    @Test
    @DisplayName("PathVariable을 수정한다.")
    void updatePathVariable() throws Exception {
        // given
        willDoNothing()
                .given(apiDocsService)
                .updatePathVariable(any(), any());

        // when
        mockMvc.perform(RestDocumentationRequestBuilders.put("/api/apidocs/pathvariables/{pathvariableid}", ID)
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(objectMapper.writeValueAsString(TEST_UPDATE_PATHVARIABLE_REQUEST)))
                .andExpect(status().isOk())
                .andDo(document("api/apidocs/pathvariables/{pathvariableid}/update",
                        requestHeaders(
                                headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")
                        ),
                        pathParameters(
                                parameterWithName("pathvariableid").description("Pathvariable ID")
                        ),
                        requestFields(
                                fieldWithPath("pathVariableKey").type(JsonFieldType.STRING).description("Pathvariable Key"),
                                fieldWithPath("pathVariableType").type(JsonFieldType.STRING).description("Pathvariable Type")
                        )
                ));

        // then
        then(apiDocsService).should(times(1)).updatePathVariable(any(), any());
    }

    @Test
    @DisplayName("PathVariable을 삭제한다.")
    void deletePathVariable() throws Exception {
        // given
        willDoNothing()
                .given(apiDocsService)
                .deletePathVariable(any());

        // when
        mockMvc.perform(RestDocumentationRequestBuilders.delete("/api/apidocs/pathvariables/{pathvariableid}", ID)
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
                        .accept(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andDo(document("api/apidocs/pathvariables/{pathvariableid}/delete",
                        requestHeaders(
                                headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")
                        ),
                        pathParameters(
                                parameterWithName("pathvariableid").description("Pathvariable ID")
                        )));

        // then
        then(apiDocsService).should(times(1)).deletePathVariable(any());
    }

    @Test
    @DisplayName("QueryString를 생성한다.")
    void createQueryString() throws Exception {
        // given
        willDoNothing()
                .given(apiDocsService)
                .createQueryString(any(), any());

        // when
        mockMvc.perform(RestDocumentationRequestBuilders.post("/api/apidocs/{apiid}/querystrings", ID)
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(objectMapper.writeValueAsString(TEST_CREATE_QUERYSTRING_REQUEST)))
                .andExpect(status().isCreated())
                .andDo(document("api/apidocs/{apiid}/querystrings",
                        requestHeaders(
                                headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")
                        ),
                        pathParameters(
                                parameterWithName("apiid").description("Api ID")
                        ),
                        requestFields(
                                fieldWithPath("queryStringKey").type(JsonFieldType.STRING).description("QueryString Key"),
                                fieldWithPath("queryStringType").type(JsonFieldType.STRING).description("QueryString Type")
                        )
                ));

        // then
        then(apiDocsService).should(times(1)).createQueryString(any(), any());
    }

    @Test
    @DisplayName("QueryString를 수정한다.")
    void updateQueryString() throws Exception {
        // given
        willDoNothing()
                .given(apiDocsService)
                .updateQueryString(any(), any());

        // when
        mockMvc.perform(RestDocumentationRequestBuilders.put("/api/apidocs/querystrings/{querystringid}", ID)
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(objectMapper.writeValueAsString(TEST_UPDATE_QUERYSTRING_REQUEST)))
                .andExpect(status().isOk())
                .andDo(document("api/apidocs/querystrings/{querystringid}/update",
                        requestHeaders(
                                headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")
                        ),
                        pathParameters(
                                parameterWithName("querystringid").description("Querystring ID")
                        ),
                        requestFields(
                                fieldWithPath("queryStringKey").type(JsonFieldType.STRING).description("Querystring Key"),
                                fieldWithPath("queryStringType").type(JsonFieldType.STRING).description("Querystring Type")
                        )
                ));

        // then
        then(apiDocsService).should(times(1)).updateQueryString(any(), any());
    }

    @Test
    @DisplayName("QueryString를 삭제한다.")
    void deleteQueryString() throws Exception {
        // given
        willDoNothing()
                .given(apiDocsService)
                .deleteQueryString(any());

        // when
        mockMvc.perform(RestDocumentationRequestBuilders.delete("/api/apidocs/querystrings/{querystringid}", ID)
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
                        .accept(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andDo(document("api/apidocs/querystrings/{querystringid}/delete",
                        requestHeaders(
                                headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")
                        ),
                        pathParameters(
                                parameterWithName("querystringid").description("Querystring ID")
                        )));

        // then
        then(apiDocsService).should(times(1)).deleteQueryString(any());
    }

    @Test
    @DisplayName("Dto를 생성한다.")
    void createCustomDto() throws Exception {
        // given
        willDoNothing()
                .given(apiDocsService)
                .createCustomDto(any(), any());

        // when
        mockMvc.perform(RestDocumentationRequestBuilders.post("/api/apidocs/{projectid}/customdtos", ID)
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(objectMapper.writeValueAsString(TEST_CREATE_DTO_REQUEST)))
                .andExpect(status().isCreated())
                .andDo(document("api/apidocs/{projectid}/customdtos",
                        requestHeaders(
                                headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")
                        ),
                        pathParameters(
                                parameterWithName("projectid").description("Project ID")
                        ),
                        requestFields(
                                fieldWithPath("dtoName").type(JsonFieldType.STRING).description("Dto Key"),
                                fieldWithPath("dtoType").type(JsonFieldType.STRING).description("Dto Type"),
                                fieldWithPath("dtoIsList").type(JsonFieldType.STRING).description("Dto 리스트 여부")
                        )
                ));

        // then
        then(apiDocsService).should(times(1)).createCustomDto(any(), any());
    }

    @Test
    @DisplayName("Response, Request를 생성한다.")
    void createDto() throws Exception {
        // given
        willDoNothing()
                .given(apiDocsService)
                .createDto(any(), any());

        // when
        mockMvc.perform(RestDocumentationRequestBuilders.post("/api/apidocs/{apiid}/dtos", ID)
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(objectMapper.writeValueAsString(TEST_CREATE_DTO_REQUEST)))
                .andExpect(status().isCreated())
                .andDo(document("api/apidocs/{apiid}/dtos",
                        requestHeaders(
                                headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")
                        ),
                        pathParameters(
                                parameterWithName("apiid").description("Api ID")
                        ),
                        requestFields(
                                fieldWithPath("dtoName").type(JsonFieldType.STRING).description("Dto Key"),
                                fieldWithPath("dtoType").type(JsonFieldType.STRING).description("Dto Type"),
                                fieldWithPath("dtoIsList").type(JsonFieldType.STRING).description("Dto 리스트 여부")
                        )
                ));

        // then
        then(apiDocsService).should(times(1)).createDto(any(), any());
    }

    @Test
    @DisplayName("Dto를 수정한다.")
    void updateDto() throws Exception {
        // given
        willDoNothing()
                .given(apiDocsService)
                .updateDto(any(), any());

        // when
        mockMvc.perform(RestDocumentationRequestBuilders.put("/api/apidocs/dtos/{dtoid}", ID)
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(objectMapper.writeValueAsString(TEST_UPDATE_DTO_REQUEST)))
                .andExpect(status().isOk())
                .andDo(document("api/apidocs/dtos/{dtoid}/update",
                        requestHeaders(
                                headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")
                        ),
                        pathParameters(
                                parameterWithName("dtoid").description("Dto ID")
                        ),
                        requestFields(
                                fieldWithPath("dtoName").type(JsonFieldType.STRING).description("Dto Key"),
                                fieldWithPath("dtoType").type(JsonFieldType.STRING).description("Dto Type"),
                                fieldWithPath("dtoIsList").type(JsonFieldType.STRING).description("Dto 리스트 여부")
                        )
                ));

        // then
        then(apiDocsService).should(times(1)).updateDto(any(), any());
    }

    @Test
    @DisplayName("Dto를 삭제한다.")
    void deleteDto() throws Exception {
        // given
        willDoNothing()
                .given(apiDocsService)
                .deleteDto(any());

        // when
        mockMvc.perform(RestDocumentationRequestBuilders.delete("/api/apidocs/dtos/{dtoid}", ID)
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
                        .accept(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andDo(document("api/apidocs/dtos/{dtoid}/delete",
                        requestHeaders(
                                headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")
                        ),
                        pathParameters(
                                parameterWithName("dtoid").description("Dto ID")
                        )));

        // then
        then(apiDocsService).should(times(1)).deleteDto(any());
    }


    @Test
    @DisplayName("Dto를 조회한다.")
    void findByDtoId() throws Exception {
        // given
        given(apiDocsService.findByDtoId(any()))
                .willReturn(TEST_DTO_RESPONSE);

        // when
        mockMvc.perform(RestDocumentationRequestBuilders.get("/api/apidocs/dtos/{dtoid}", ID)
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
                        .accept(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(TEST_DTO_RESPONSE)))
                .andDo(document("api/apidocs/dtos/{dtoid}",
                        requestHeaders(
                                headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")
                        ),
                        pathParameters(
                                parameterWithName("dtoid").description("Dto ID")
                        ),
                        responseFields(
                                fieldWithPath("dtoId").type(JsonFieldType.NUMBER).description("Dto ID"),
                                fieldWithPath("dtoName").type(JsonFieldType.STRING).description("Dto 이름"),
                                fieldWithPath("dtoType").type(JsonFieldType.STRING).description("Dto Type"),
                                fieldWithPath("dtoIsList").type(JsonFieldType.STRING).description("Dto 리스트 여부"),
                                fieldWithPath("dtoItemResponses").type(JsonFieldType.ARRAY).description("DtoItem 조회결과 배열"),
                                fieldWithPath("dtoItemResponses.[].dtoItemId").type(JsonFieldType.NUMBER).description("DtoItem ID"),
                                fieldWithPath("dtoItemResponses.[].dtoItemName").type(JsonFieldType.STRING).description("DtoItem 이름"),
                                fieldWithPath("dtoItemResponses.[].dtoClassTypeId").type(JsonFieldType.NUMBER).description("DtoItem DtoClassTypeId"),
                                fieldWithPath("dtoItemResponses.[].dtoPrimitiveTypeId").type(JsonFieldType.NUMBER).description("DtoItem DtoPrimitiveTypeId"),
                                fieldWithPath("dtoItemResponses.[].dtoIsList").type(JsonFieldType.STRING).description("리스트여부"),
                                fieldWithPath("dtoItemResponses.[].dtoClassTypeName").type(JsonFieldType.STRING).description("DtoItem DtoClassTypeName"),
                                fieldWithPath("dtoItemResponses.[].dtoPrimitiveTypeName").type(JsonFieldType.STRING).description("DtoItem DtoPrimitiveTypeName")

                        )));

        // then
        then(apiDocsService).should(times(1)).findByDtoId(any());
    }

    @Test
    @DisplayName("Dto변수를 생성한다.")
    void createDtoItem() throws Exception {
        // given
        willDoNothing()
                .given(apiDocsService)
                .createDtoItem(any(), any());

        // when
        mockMvc.perform(RestDocumentationRequestBuilders.post("/api/apidocs/{dtoid}/dtoitems", ID)
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(objectMapper.writeValueAsString(TEST_CREATE_DTO_ITEM_REQUEST)))
                .andExpect(status().isCreated())
                .andDo(document("api/apidocs/{dtoid}/dtoitems",
                        requestHeaders(
                                headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")
                        ),
                        pathParameters(
                                parameterWithName("dtoid").description("Dto ID")
                        ),
                        requestFields(
                                fieldWithPath("dtoItemName").type(JsonFieldType.STRING).description("Dtoitem 이름"),
                                fieldWithPath("dtoClassType").type(JsonFieldType.NUMBER).description("Dtoitem Type"),
                                fieldWithPath("dtoPrimitiveType").type(JsonFieldType.NUMBER).description("Dtoitem Key"),
                                fieldWithPath("dtoIsList").type(JsonFieldType.STRING).description("Dto 리스트 여부")
                        )
                ));

        // then
        then(apiDocsService).should(times(1)).createDtoItem(any(), any());
    }

    @Test
    @DisplayName("Dto변수를 수정한다.")
    void updateDtoItem() throws Exception {
        // given
        willDoNothing()
                .given(apiDocsService)
                .updateDtoItem(any(), any());

        // when
        mockMvc.perform(RestDocumentationRequestBuilders.put("/api/apidocs/dtoitems/{dtoitemid}", ID)
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(objectMapper.writeValueAsString(TEST_UPDATE_DTO_ITEM_REQUEST)))
                .andExpect(status().isOk())
                .andDo(document("api/apidocs/dtoitems/{dtoitemid}/update",
                        requestHeaders(
                                headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")
                        ),
                        pathParameters(
                                parameterWithName("dtoitemid").description("Dto Item ID")
                        ),
                        requestFields(
                                fieldWithPath("dtoItemName").type(JsonFieldType.STRING).description("Dtoitem 이름"),
                                fieldWithPath("dtoClassType").type(JsonFieldType.NUMBER).description("Dtoitem Type"),
                                fieldWithPath("dtoPrimitiveType").type(JsonFieldType.NUMBER).description("Dtoitem Key"),
                                fieldWithPath("dtoIsList").type(JsonFieldType.STRING).description("Dto 리스트 여부")
                        )
                ));

        // then
        then(apiDocsService).should(times(1)).updateDtoItem(any(), any());
    }

    @Test
    @DisplayName("Dto변수를 삭제한다.")
    void deleteDtoItem() throws Exception {
        // given
        willDoNothing()
                .given(apiDocsService)
                .deleteDtoItem(any());

        // when
        mockMvc.perform(RestDocumentationRequestBuilders.delete("/api/apidocs/dtoitems/{dtoitemid}", ID)
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
                        .accept(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andDo(document("api/apidocs/dtoitems/{dtoitemid}/delete",
                        requestHeaders(
                                headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")
                        ),
                        pathParameters(
                                parameterWithName("dtoitemid").description("Dto Item ID")
                        )));

        // then
        then(apiDocsService).should(times(1)).deleteDtoItem(any());
    }


    @Test
    @DisplayName("자료형 리스트를 조회한다.")
    void findTypeList() throws Exception {
        // given
        given(apiDocsService.findTypeList(any()))
                .willReturn(TEST_TYPE_LIST_RESPONSE);

        // when
        mockMvc.perform(RestDocumentationRequestBuilders.get("/api/apidocs/{projectid}/types", ID)
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
                        .accept(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(TEST_TYPE_LIST_RESPONSE)))
                .andDo(document("api/apidocs/{projectid}/types",
                        requestHeaders(
                                headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")
                        ),
                        pathParameters(
                                parameterWithName("projectid").description("Project ID")
                        ),
                        responseFields(
                                fieldWithPath("primitiveTypeResponses").type(JsonFieldType.ARRAY).description("기본 자료형 조회결과 배열"),
                                fieldWithPath("primitiveTypeResponses.[].primitiveId").type(JsonFieldType.NUMBER).description("기본 자료형 ID"),
                                fieldWithPath("primitiveTypeResponses.[].primitiveName").type(JsonFieldType.STRING).description("기본 자료형 이름"),
                                fieldWithPath("classTypeResponses").type(JsonFieldType.ARRAY).description("Class 자료형 조회결과 배열"),
                                fieldWithPath("classTypeResponses.[].dtoId").type(JsonFieldType.NUMBER).description("Class 자료형 ID"),
                                fieldWithPath("classTypeResponses.[].dtoName").type(JsonFieldType.STRING).description("Class 자료형 이름")
                                )));

        // then
        then(apiDocsService).should(times(1)).findTypeList(any());
    }

}