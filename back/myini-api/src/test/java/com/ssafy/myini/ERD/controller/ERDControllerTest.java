package com.ssafy.myini.ERD.controller;

import com.ssafy.myini.ControllerTest;
import com.ssafy.myini.ERD.service.ERDService;
import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.*;
import static com.ssafy.myini.ERD.ERDFixture.*;
import static org.mockito.Mockito.times;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.requestHeaders;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(ERDController.class)
public class ERDControllerTest extends ControllerTest {
    @MockBean
    private ERDService erdService;

    @Test
    @DisplayName("테이블 생성입니다.")
    void createTable() throws Exception{
        willDoNothing().given(erdService).createTable(any(),any());

        mockMvc.perform(post("api/erds/{project_id}/table")
                .header(HttpHeaders.AUTHORIZATION)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(objectMapper.writeValueAsString(TEST_TABLE_CREATE_REQUEST)))
                .andExpect(status().isOk())
                .andDo(document("api/erds/{project_id}/table/create",
                        requestHeaders( headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")),
                        requestFields(
                                fieldWithPath("tableName").type(JsonFieldType.STRING).description("테이블이름"),
                                fieldWithPath("tableX").type(JsonFieldType.NUMBER).description("테이블x좌표"),
                                fieldWithPath("tableY").type(JsonFieldType.NUMBER).description("테이블y좌표"),
                                fieldWithPath("tableColor").type(JsonFieldType.STRING).description("테이블색깔")
                        )
                        ));

        then(erdService).should(times(1)).createTable(any(),any());
    }


}
