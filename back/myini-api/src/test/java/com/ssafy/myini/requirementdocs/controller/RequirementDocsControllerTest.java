package com.ssafy.myini.requirementdocs.controller;

import com.ssafy.myini.ControllerTest;
import com.ssafy.myini.requirementdocs.controller.RequirementDocsController;
import com.ssafy.myini.requirementdocs.service.RequirementDocsService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;

import java.util.Arrays;

import static com.ssafy.myini.erd.ERDFixture.ID;
import static com.ssafy.myini.erd.ERDFixture.TEST_TABLE_CREATE_REQUEST;
import static com.ssafy.myini.requirementdocs.RequirementDocsFixture.*;
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
import static com.ssafy.myini.requirementdocs.RequirementDocsFixture.*;
import static org.junit.jupiter.api.Assertions.*;

@WebMvcTest(RequirementDocsController.class)
class RequirementDocsControllerTest extends ControllerTest {

    @MockBean
    private RequirementDocsService requirementDocsService;

    @Test
    @DisplayName("???????????? ?????????????????????.")
    void findAllRequirement() throws Exception{
        //given
        given(requirementDocsService.findAllRequirement(any()))
                .willReturn(Arrays.asList(TEST_REQUIREMENT_LIST_RESPONSE));

        // when
        mockMvc.perform(RestDocumentationRequestBuilders.get("/api/requirementdocs/{projectid}", ID)
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
                        .accept(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(Arrays.asList(TEST_REQUIREMENT_LIST_RESPONSE))))
                .andDo(document("api/requirementdocs/{projectid}/list",
                        requestHeaders(
                                headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")
                        ),
                        pathParameters(
                                parameterWithName("projectid").description("???????????? ID")
                        ),
                        responseFields(
                                fieldWithPath("[]").type(JsonFieldType.ARRAY).description("?????? ??????"),
                                fieldWithPath("[].requirementId").type(JsonFieldType.NUMBER).description("???????????? ID"),
                                fieldWithPath("[].requirementCategoryDto").type(JsonFieldType.OBJECT).description("???????????? ???????????? ??????"),
                                fieldWithPath("[].requirementCategoryDto.requirementCategoryId").type(JsonFieldType.NUMBER).description("???????????? ???????????? ID"),
                                fieldWithPath("[].requirementCategoryDto.categoryName").type(JsonFieldType.STRING).description("???????????? ???????????? ??????"),
                                fieldWithPath("[].requirementCategoryDto.categoryColor").type(JsonFieldType.STRING).description("???????????? ???????????? ??????"),
                                fieldWithPath("[].requirementName").type(JsonFieldType.STRING).description("???????????? ??????"),
                                fieldWithPath("[].requirementContent").type(JsonFieldType.STRING).description("???????????? ??????"),
                                fieldWithPath("[].requirementPart").type(JsonFieldType.STRING).description("???????????? ??????"),
                                fieldWithPath("[].memberNickName").type(JsonFieldType.STRING).description("???????????? ??????"),
                                fieldWithPath("[].memberJiraEmail").type(JsonFieldType.STRING).description("???????????? ?????? ?????????"),
                                fieldWithPath("[].requirementPriority").type(JsonFieldType.NUMBER).description("???????????? ????????????"),
                                fieldWithPath("[].requirementStoryPoint").type(JsonFieldType.NUMBER).description("???????????? ??????????????????")
                                )));

        // then
        then(requirementDocsService).should(times(1)).findAllRequirement(any());

    }

    @Test
    @DisplayName("???????????? ???????????????.")
    void createRequirement() throws Exception{
        given(requirementDocsService.createRequirement(any()))
                .willReturn(TEST_REQUIREMENT_CREATE_RESPONSE);

        mockMvc.perform(RestDocumentationRequestBuilders.post("/api/requirementdocs/{projectid}/requirements",ID)
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isCreated())
                .andExpect(content().json(objectMapper.writeValueAsString(TEST_REQUIREMENT_CREATE_RESPONSE)))
                .andDo(document("api/requirementdocs/{projectid}/requirements/create",
                        requestHeaders( headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")),
                        pathParameters(
                                parameterWithName("projectid").description("???????????? ID")
                        ),
                        responseFields(
                                fieldWithPath("requirementId").type(JsonFieldType.NUMBER).description("???????????? ?????????")
                        )
                ));

        then(requirementDocsService).should(times(1)).createRequirement(any());
    }

    @Test
    @DisplayName("???????????? ???????????? ???????????????.")
    void updateRequirementCategory() throws Exception{
        // given
        willDoNothing()
                .given(requirementDocsService)
                .updateRequirementCategory(any(), any());

        // when
        mockMvc.perform(RestDocumentationRequestBuilders.put("/api/requirementdocs/requirements/{requirementid}/categories", ID)
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(objectMapper.writeValueAsString(TEST_REQUIREMENT_CATEGORY_UPDATE_REQUEST)))
                .andExpect(status().isOk())
                .andDo(document("api/requirementdocs/requirements/{requirementid}/categories/update",
                        requestHeaders(
                                headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")
                        ),
                        pathParameters(
                                parameterWithName("requirementid").description("???????????? ID")
                        ),
                        requestFields(
                                fieldWithPath("categoryId").type(JsonFieldType.NUMBER).description("???????????? ???????????? ID") )
                ));

        // then
        then(requirementDocsService).should(times(1)).updateRequirementCategory(any(), any());

    }

    @Test
    @DisplayName("???????????? ?????? ???????????????.")
    void updateRequirementName() throws Exception{
        // given
        willDoNothing()
                .given(requirementDocsService)
                .updateRequirementName(any(), any());

        // when
        mockMvc.perform(RestDocumentationRequestBuilders.put("/api/requirementdocs/requirements/{requirementid}/names", ID)
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(objectMapper.writeValueAsString(TEST_REQUIREMENT_NAME_UPDATE_REQUEST)))
                .andExpect(status().isOk())
                .andDo(document("api/requirementdocs/requirements/{requirementid}/names/update",
                        requestHeaders(
                                headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")
                        ),
                        pathParameters(
                                parameterWithName("requirementid").description("???????????? ID")
                        ),
                        requestFields(
                                fieldWithPath("requirementName").type(JsonFieldType.STRING).description("???????????? ??????") )
                ));

        // then
        then(requirementDocsService).should(times(1)).updateRequirementName(any(), any());

    }

    @Test
    @DisplayName("???????????? ?????? ???????????????.")
    void updateRequirementContent() throws Exception {
        // given
        willDoNothing()
                .given(requirementDocsService)
                .updateRequirementContent(any(), any());

        // when
        mockMvc.perform(RestDocumentationRequestBuilders.put("/api/requirementdocs/requirements/{requirementid}/contents", ID)
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(objectMapper.writeValueAsString(TEST_REQUIREMENT_CONTENT_UPDATE_REQUEST)))
                .andExpect(status().isOk())
                .andDo(document("api/requirementdocs/requirements/{requirementid}/contents/update",
                        requestHeaders(
                                headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")
                        ),
                        pathParameters(
                                parameterWithName("requirementid").description("???????????? ID")
                        ),
                        requestFields(
                                fieldWithPath("requirementContent").type(JsonFieldType.STRING).description("???????????? ??????") )
                ));

        // then
        then(requirementDocsService).should(times(1)).updateRequirementContent(any(), any());

    }

    @Test
    @DisplayName("???????????? ?????? ???????????????.")
    void updateRequirementPart() throws Exception{
        // given
        willDoNothing()
                .given(requirementDocsService)
                .updateRequirementPart(any(), any());

        // when
        mockMvc.perform(RestDocumentationRequestBuilders.put("/api/requirementdocs/requirements/{requirementid}/parts", ID)
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(objectMapper.writeValueAsString(TEST_REQUIREMENT_PART_UPDATE_REQUEST)))
                .andExpect(status().isOk())
                .andDo(document("api/requirementdocs/requirements/{requirementid}/parts/update",
                        requestHeaders(
                                headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")
                        ),
                        pathParameters(
                                parameterWithName("requirementid").description("???????????? ID")
                        ),
                        requestFields(
                                fieldWithPath("requirementPart").type(JsonFieldType.STRING).description("???????????? ??????") )
                ));

        // then
        then(requirementDocsService).should(times(1)).updateRequirementPart(any(), any());

    }

    @Test
    @DisplayName("???????????? ?????? ???????????????.")
    void updateRequirementMember() throws Exception{
        // given
        willDoNothing()
                .given(requirementDocsService)
                .updateRequirementMember(any(), any());

        // when
        mockMvc.perform(RestDocumentationRequestBuilders.put("/api/requirementdocs/requirements/{requirementid}/members", ID)
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(objectMapper.writeValueAsString(TEST_REQUIREMENT_MEMBER_UPDATE_REQUEST)))
                .andExpect(status().isOk())
                .andDo(document("api/requirementdocs/requirements/{requirementid}/members/update",
                        requestHeaders(
                                headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")
                        ),
                        pathParameters(
                                parameterWithName("requirementid").description("???????????? ID")
                        ),
                        requestFields(
                                fieldWithPath("memberName").type(JsonFieldType.STRING).description("???????????? ??????") )
                ));

        // then
        then(requirementDocsService).should(times(1)).updateRequirementMember(any(), any());

    }

    @Test
    @DisplayName("???????????? ???????????? ???????????????.")
    void updateRequirementPriority() throws Exception{
        // given
        willDoNothing()
                .given(requirementDocsService)
                .updateRequirementPriority(any(), any());

        // when
        mockMvc.perform(RestDocumentationRequestBuilders.put("/api/requirementdocs/requirements/{requirementid}/priorities", ID)
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(objectMapper.writeValueAsString(TEST_REQUIREMENT_PRIORITY_UPDATE_REQUEST)))
                .andExpect(status().isOk())
                .andDo(document("api/requirementdocs/requirements/{requirementid}/priorities/update",
                        requestHeaders(
                                headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")
                        ),
                        pathParameters(
                                parameterWithName("requirementid").description("???????????? ID")
                        ),
                        requestFields(
                                fieldWithPath("requirementPriority").type(JsonFieldType.NUMBER).description("???????????? ????????????") )
                ));

        // then
        then(requirementDocsService).should(times(1)).updateRequirementPriority(any(), any());

    }

    @Test
    @DisplayName("???????????? ?????????????????? ???????????????.")
    void updateRequirementStoryPoint() throws Exception{
        // given
        willDoNothing()
                .given(requirementDocsService)
                .updateRequirementStoryPoint(any(), any());

        // when
        mockMvc.perform(RestDocumentationRequestBuilders.put("/api/requirementdocs/requirements/{requirementid}/storypoints", ID)
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(objectMapper.writeValueAsString(TEST_REQUIREMENT_STORY_POINT_UPDATE_REQUEST)))
                .andExpect(status().isOk())
                .andDo(document("api/requirementdocs/requirements/{requirementid}/storypoints/update",
                        requestHeaders(
                                headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")
                        ),
                        pathParameters(
                                parameterWithName("requirementid").description("???????????? ID")
                        ),
                        requestFields(
                                fieldWithPath("requirementStoryPoint").type(JsonFieldType.NUMBER).description("???????????? ??????????????????") )
                ));

        // then
        then(requirementDocsService).should(times(1)).updateRequirementStoryPoint(any(), any());

    }

    @Test
    @DisplayName("???????????? ???????????????.")
    void deleteRequirement() throws Exception{
        // given
        willDoNothing()
                .given(requirementDocsService)
                .deleteRequirement(any());

        // when
        mockMvc.perform(RestDocumentationRequestBuilders.delete("/api/requirementdocs/requirements/{requirementid}", ID)
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
                        .accept(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andDo(document("api/requirementdocs/requirements/{requirementid}/delete",
                        requestHeaders(
                                headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")
                        ),
                        pathParameters(
                                parameterWithName("requirementid").description("???????????? ID")
                        )));

        // then
        then(requirementDocsService).should(times(1)).deleteRequirement(any());

    }

    @Test
    @DisplayName("???????????? ???????????? ?????????????????????.")
    void findAllRequirementsCategory() throws Exception{
        //given
        given(requirementDocsService.findAllRequirementsCategory(any()))
                .willReturn(Arrays.asList(TEST_REQUIREMENT_CATEGORY_LIST_RESPONSE));

        // when
        mockMvc.perform(RestDocumentationRequestBuilders.get("/api/requirementdocs/{projectid}/categories", ID)
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
                        .accept(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(Arrays.asList(TEST_REQUIREMENT_CATEGORY_LIST_RESPONSE))))
                .andDo(document("api/requirementdocs/{projectid}/categories/list",
                        requestHeaders(
                                headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")
                        ),
                        pathParameters(
                                parameterWithName("projectid").description("???????????? ID")
                        ),
                        responseFields(
                                fieldWithPath("[]").type(JsonFieldType.ARRAY).description("?????? ??????"),
                                fieldWithPath("[].requirementCategoryId").type(JsonFieldType.NUMBER).description("???????????? ???????????? ID"),
                                fieldWithPath("[].categoryName").type(JsonFieldType.STRING).description("???????????? ???????????? ??????"),
                                fieldWithPath("[].categoryColor").type(JsonFieldType.STRING).description("???????????? ???????????? ??????")
                           )));

        // then
        then(requirementDocsService).should(times(1)).findAllRequirementsCategory(any());

    }

    @Test
    @DisplayName("???????????? ???????????? ???????????????.")
    void createRequirementCategory() throws Exception{
        given(requirementDocsService.createRequirementCategory(any(), any()))
                .willReturn(TEST_REQUIREMENT_CATEGORU_RESPONSE);

        mockMvc.perform(RestDocumentationRequestBuilders.post("/api/requirementdocs/{projectid}/categories",ID)
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(objectMapper.writeValueAsString(TEST_REQUIREMENT_CATEGORY_CREATE_REQUEST)))
                .andExpect(status().isCreated())
                .andExpect(content().json(objectMapper.writeValueAsString(TEST_REQUIREMENT_CATEGORU_RESPONSE)))
                .andDo(document("api/requirementdocs/{projectid}/categories/create",
                        requestHeaders( headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")),
                        pathParameters(parameterWithName("projectid").description("???????????? ID")),
                        requestFields(
                                fieldWithPath("categoryName").type(JsonFieldType.STRING).description("???????????? ???????????? ??????"),
                                fieldWithPath("categoryColor").type(JsonFieldType.STRING).description("???????????? ???????????? ??????")
                        ),
                        responseFields(
                                fieldWithPath("requirementCategoryId").type(JsonFieldType.NUMBER).description("Category ID")
                        )
                ));

        then(requirementDocsService).should(times(1)).createRequirementCategory(any(),any());

    }

    @Test
    @DisplayName("???????????? ???????????? ???????????????.")
    void deleteRequirementCategory() throws Exception{
        // given
        willDoNothing()
                .given(requirementDocsService)
                .deleteRequirementCategory(any());

        // when
        mockMvc.perform(RestDocumentationRequestBuilders.delete("/api/requirementdocs/categories/{requirementcategoryid}", ID)
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
                        .accept(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andDo(document("api/requirementdocs/categories/{requirementcategoryid}/delete",
                        requestHeaders(
                                headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")
                        ),
                        pathParameters(
                                parameterWithName("requirementcategoryid").description("???????????? ???????????? ID")
                        )));

        // then
        then(requirementDocsService).should(times(1)).deleteRequirementCategory(any());

    }
}