package com.ssafy.myini.erd.controller;

import com.ssafy.myini.ControllerTest;
import com.ssafy.myini.erd.service.ERDService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;

import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.*;

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
import static com.ssafy.myini.CommonFixture.TEST_AUTHORIZATION;
import static com.ssafy.myini.erd.ERDFixture.*;

@WebMvcTest(ERDController.class)
class ERDControllerTest extends ControllerTest {

    @MockBean
    private ERDService erdService;

    @Test
    @DisplayName("테이블 생성입니다.")
    void createErdTable() throws Exception{
        willDoNothing().given(erdService).createErdTable(any(),any());

        mockMvc.perform(RestDocumentationRequestBuilders.post("/api/erds/{projectid}/erdtables",ID)
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(objectMapper.writeValueAsString(TEST_TABLE_CREATE_REQUEST)))
                .andExpect(status().isCreated())
                .andDo(document("api/erds/{projectid}/erdtables/create",
                        requestHeaders( headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")),
                        pathParameters(parameterWithName("projectid").description("프로젝트 ID")),
                        requestFields(
                                fieldWithPath("erdTableName").type(JsonFieldType.STRING).description("테이블이름"),
                                fieldWithPath("erdTableX").type(JsonFieldType.NUMBER).description("테이블x좌표"),
                                fieldWithPath("erdTableY").type(JsonFieldType.NUMBER).description("테이블y좌표"),
                                fieldWithPath("erdTableColor").type(JsonFieldType.STRING).description("테이블색깔")
                        )
                ));

        then(erdService).should(times(1)).createErdTable(any(),any());
    }

    @Test
    @DisplayName("테이블 전체조회입니다.")
    void findAllErdTable() throws Exception  {
        //given
        given(erdService.findAllErdTable(any()))
                .willReturn(Arrays.asList(TEST_TABLE_LIST_RESPONSE));

        // when
        mockMvc.perform(RestDocumentationRequestBuilders.get("/api/erds/{projectid}/erdtables", ID)
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
                        .accept(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(Arrays.asList(TEST_TABLE_LIST_RESPONSE))))
                .andDo(document("api/erds/{projectid}/erdtables/list",
                        requestHeaders(
                                headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")
                        ),
                        pathParameters(
                                parameterWithName("projectid").description("프로젝트 ID")
                        ),
                        responseFields(
                                fieldWithPath("[]").type(JsonFieldType.ARRAY).description("결과 배열"),
                                fieldWithPath("[].erdTableId").type(JsonFieldType.NUMBER).description("ERD Table ID"),
                                fieldWithPath("[].erdTableName").type(JsonFieldType.STRING).description("ERD Table 이름"),
                                fieldWithPath("[].erdTableX").type(JsonFieldType.NUMBER).description("ERD Table X좌표"),
                                fieldWithPath("[].erdTableY").type(JsonFieldType.NUMBER).description("ERD Table Y좌표"),
                                fieldWithPath("[].erdTableColor").type(JsonFieldType.STRING).description("ERD Table 색깔"),

                                fieldWithPath("[].tableColumnDtos").type(JsonFieldType.ARRAY).description("ERD Table 컬럼 배열"),
                                fieldWithPath("[].tableColumnDtos.[].tableColumnId").type(JsonFieldType.NUMBER).description("ERD Table 컬럼 ID"),
                                fieldWithPath("[].tableColumnDtos.[].tableColumnName").type(JsonFieldType.STRING).description("ERD Table 컬럼 이름"),
                                fieldWithPath("[].tableColumnDtos.[].tableColumnType").type(JsonFieldType.STRING).description("ERD Table 컬럼 자료형"),
                                fieldWithPath("[].tableColumnDtos.[].conditionItemDtos").type(JsonFieldType.ARRAY).description("ERD Table 컬럼 제약조건 배열"),

                                fieldWithPath("[].tableColumnDtos.[].conditionItemDtos.[].conditionItemId").type(JsonFieldType.NUMBER).description("ERD Table 컬럼 제약조건 ID"),
                                fieldWithPath("[].tableColumnDtos.[].conditionItemDtos.[].conditionItemName").type(JsonFieldType.STRING).description("ERD Table 컬럼 제약조건 이름"),

                                fieldWithPath("[].tableRelationDtos").type(JsonFieldType.ARRAY).description("ERD Table 연관관계 배열"),
                                fieldWithPath("[].tableRelationDtos.[].toTableId").type(JsonFieldType.NUMBER).description("ERD Table 연관 당하는 테이블 ID"),
                                fieldWithPath("[].tableRelationDtos.[].toTableName").type(JsonFieldType.STRING).description("ERD Table 연관 당하는 테이블 이름"),
                                fieldWithPath("[].tableRelationDtos.[].relationItemId").type(JsonFieldType.NUMBER).description("ERD Table 연관관계 ID"),
                                fieldWithPath("[].tableRelationDtos.[].relationItemName").type(JsonFieldType.STRING).description("ERD Table 연관관계 이름")
                        )));

        // then
        then(erdService).should(times(1)).findAllErdTable(any());
    }

    @Test
    @DisplayName("테이블 수정입니다.")
    void updateErdTable() throws Exception  {
        // given
        willDoNothing()
                .given(erdService)
                .updateErdTable(any(), any());

        // when
        mockMvc.perform(RestDocumentationRequestBuilders.put("/api/erds/erdtables/{erdtableid}", ID)
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(objectMapper.writeValueAsString(TEST_TABLE_UPDATE_REQUEST)))
                .andExpect(status().isOk())
                .andDo(document("api/erds/erdtables/{erdtableid}/update",
                        requestHeaders(
                                headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")
                        ),
                        pathParameters(
                                parameterWithName("erdtableid").description("ERD Table ID")
                        ),
                        requestFields(
                                fieldWithPath("erdTableName").type(JsonFieldType.STRING).description("ERD Table 이름"),
                                fieldWithPath("erdTableX").type(JsonFieldType.NUMBER).description("ERD Table X좌표"),
                                fieldWithPath("erdTableY").type(JsonFieldType.NUMBER).description("ERD Table Y좌표"),
                                fieldWithPath("erdTableColor").type(JsonFieldType.STRING).description("ERD Table 색깔")
                        )
                ));

        // then
        then(erdService).should(times(1)).updateErdTable(any(), any());

    }

    @Test
    @DisplayName("테이블 삭제입니다.")
    void deleteErdTable() throws Exception  {
        // given
        willDoNothing()
                .given(erdService)
                .deleteErdTable(any());

        // when
        mockMvc.perform(RestDocumentationRequestBuilders.delete("/api/erds/erdtables/{erdtableid}", ID)
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
                        .accept(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andDo(document("api/erds/erdtables/{erdtableid}/delete",
                        requestHeaders(
                                headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")
                        ),
                        pathParameters(
                                parameterWithName("erdtableid").description("ERD Table ID")
                        )));

        // then
        then(erdService).should(times(1)).deleteErdTable(any());
    }

    @Test
    @DisplayName("테이블 연관관계 생성입니다.")
    void createTableRelation() throws Exception  {
        willDoNothing().given(erdService).createTableRelation(any());

        mockMvc.perform(RestDocumentationRequestBuilders.post("/api/erds/tablerelations",ID)
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(objectMapper.writeValueAsString(TEST_RELATION_CREATE_REQUEST)))
                .andExpect(status().isCreated())
                .andDo(document("api/erds/tablerelations/create",
                        requestHeaders( headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")),
                        requestFields(
                                fieldWithPath("toErdTableId").type(JsonFieldType.NUMBER).description("연관당하는 테이블 ID"),
                                fieldWithPath("fromErdTableId").type(JsonFieldType.NUMBER).description("연관시키는 테이블 ID"),
                                fieldWithPath("relationItemId").type(JsonFieldType.NUMBER).description("테이블 연관관계 아이템 ID")

                        )
                ));

        then(erdService).should(times(1)).createTableRelation(any());

    }

    @Test
    @DisplayName("테이블 연관관계 삭제입니다.")
    void deleteTableRelation() throws Exception  {
        // given
        willDoNothing()
                .given(erdService)
                .deleteTableRelation(any());

        // when
        mockMvc.perform(RestDocumentationRequestBuilders.delete("/api/erds/tablerelations/{tablerelationid}", ID)
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
                        .accept(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andDo(document("api/erds/tablerelations/{tablerelationid}/delete",
                        requestHeaders(
                                headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")
                        ),
                        pathParameters(
                                parameterWithName("tablerelationid").description("테이블 연관관계 ID")
                        )));

        // then
        then(erdService).should(times(1)).deleteTableRelation(any());
    }

    @Test
    @DisplayName("테이블 연관관계 아이템 전체조회입니다.")
    void findAllRelationItem() throws Exception  {
        //given
        given(erdService.findAllRelationItem())
                .willReturn(Arrays.asList(TEST_RELATION_LIST_RESPONSE));

        // when
        mockMvc.perform(RestDocumentationRequestBuilders.get("/api/erds/relationitems", ID)
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
                        .accept(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(Arrays.asList(TEST_RELATION_LIST_RESPONSE))))
                .andDo(document("api/erds/relationitems/list",
                        requestHeaders(
                                headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")
                        ),
                        responseFields(
                                fieldWithPath("[]").type(JsonFieldType.ARRAY).description("결과 배열"),
                                fieldWithPath("[].relationItemId").type(JsonFieldType.NUMBER).description("테이블 연관관계 아이템 ID"),
                                fieldWithPath("[].relationItemName").type(JsonFieldType.STRING).description("테이블 연관관계 아이템 이름")
                        )));

        // then
        then(erdService).should(times(1)).findAllRelationItem();
    }

    @Test
    @DisplayName("테이블 컬럼 제약조건 아이템 전체조회입니다.")
    void findAllConditionItem() throws Exception  {
//given
        given(erdService.findAllConditionItem())
                .willReturn(Arrays.asList(TEST_CONDITION_LIST_RESPONSE));

        // when
        mockMvc.perform(RestDocumentationRequestBuilders.get("/api/erds/conditionitems", ID)
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
                        .accept(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(Arrays.asList(TEST_CONDITION_LIST_RESPONSE))))
                .andDo(document("api/erds/conditionitems/list",
                        requestHeaders(
                                headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")
                        ),
                        responseFields(
                                fieldWithPath("[]").type(JsonFieldType.ARRAY).description("결과 배열"),
                                fieldWithPath("[].conditionItemId").type(JsonFieldType.NUMBER).description("테이블 컬럼 제약조건 아이템 ID"),
                                fieldWithPath("[].conditionItemName").type(JsonFieldType.STRING).description("테이블 컬럼 제약조건 아이템 이름")
                        )));

        // then
        then(erdService).should(times(1)).findAllConditionItem();
    }

    @Test
    @DisplayName("테이블 컬럼 생성입니다.")
    void createTableColumn() throws Exception  {
        willDoNothing().given(erdService).createTableColumn(any());

        mockMvc.perform(RestDocumentationRequestBuilders.post("/api/erds/erdtables/{erdtableid}/tablecolumns",ID)
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
//                        .content(objectMapper.writeValueAsString()))
                .andExpect(status().isCreated())
                .andDo(document("api/erds/tablerelations/create",
                        requestHeaders( headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")),
                        pathParameters(
                                parameterWithName("erdtableid").description("ERD Table ID")
                        )
                ));

        then(erdService).should(times(1)).createTableColumn(any());

    }

    @Test
    @DisplayName("테이블 컬럼 수정입니다.")
    void updateTableColumn() throws Exception  {
        // given
        willDoNothing()
                .given(erdService)
                .updateTableColumn(any(), any());

        // when
        mockMvc.perform(RestDocumentationRequestBuilders.put("/api/erds/tablecolumns/{tablecolumnid}", ID)
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(objectMapper.writeValueAsString(TEST_COLUMN_UPDATE_REQUEST)))
                .andExpect(status().isOk())
                .andDo(document("api/erds/tablecolumns/{tablecolumnid}/update",
                        requestHeaders(
                                headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")
                        ),
                        pathParameters(
                                parameterWithName("tablecolumnid").description("테이블 컬럼 ID")
                        ),
                        requestFields(
                                fieldWithPath("tableColumnName").type(JsonFieldType.STRING).description("테이블 컬럼 이름"),
                                fieldWithPath("tableColumnType").type(JsonFieldType.STRING).description("테이블 컬럼 자료형"),
                                fieldWithPath("conditionItemIds").type(JsonFieldType.ARRAY).description("테이블 컬럼 제약조건 배열")
                        )
                ));

        // then
        then(erdService).should(times(1)).updateTableColumn(any(), any());
    }

    @Test
    @DisplayName("테이블 컬럼 삭제입니다.")
    void deleteTableColumn() throws Exception  {
        // given
        willDoNothing()
                .given(erdService)
                .deleteTableColumn(any());

        // when
        mockMvc.perform(RestDocumentationRequestBuilders.delete("/api/erds/tablecolumns/{tablecolumnid}", ID)
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
                        .accept(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andDo(document("api/erds/tablecolumns/{tablecolumnid}/delete",
                        requestHeaders(
                                headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")
                        ),
                        pathParameters(
                                parameterWithName("tablecolumnid").description("테이블 컬럼 ID")
                        )));

        // then
        then(erdService).should(times(1)).deleteTableColumn(any());
    }
}