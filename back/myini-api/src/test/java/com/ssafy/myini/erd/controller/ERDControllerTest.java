package com.ssafy.myini.erd.controller;

import com.ssafy.myini.ControllerTest;
import com.ssafy.myini.erd.service.ERDService;
import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.*;
import static com.ssafy.myini.erd.ERDFixture.*;
import static org.mockito.Mockito.times;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.requestHeaders;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(ERDController.class)
public class ERDControllerTest extends ControllerTest {
    @MockBean
    private ERDService erdService;

    @Test
    @DisplayName("테이블 생성입니다.")
    public void createErdTable() throws Exception{
        willDoNothing().given(erdService).createErdTable(any(),any());

        mockMvc.perform(post("/api/erds/{project_id}/erdtable",1L)
                .header(HttpHeaders.AUTHORIZATION)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(objectMapper.writeValueAsString(TEST_TABLE_CREATE_REQUEST)))
                .andExpect(status().isCreated())
                .andDo(document("/api/erds/{project_id}/erdtable/create",
                        requestHeaders( headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")),
                        requestFields(
                                fieldWithPath("erdTableName").type(JsonFieldType.STRING).description("테이블이름"),
                                fieldWithPath("erdTableX").type(JsonFieldType.NUMBER).description("테이블x좌표"),
                                fieldWithPath("erdTableY").type(JsonFieldType.NUMBER).description("테이블y좌표"),
                                fieldWithPath("erdTableColor").type(JsonFieldType.STRING).description("테이블색깔")
                        )
                        ));

        then(erdService).should(times(1)).createErdTable(any(),any());
    }


}
