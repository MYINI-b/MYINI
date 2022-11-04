package com.ssafy.myini.member.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.myini.ControllerTest;
import com.ssafy.myini.member.domain.Member;
import com.ssafy.myini.member.domain.type.Provider;
import com.ssafy.myini.member.domain.type.Role;
import com.ssafy.myini.member.response.CrewResponse;
import com.ssafy.myini.member.service.MemberService;
import com.ssafy.myini.security.service.OAuth2UserService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.codec.multipart.Part;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.request.MockMultipartHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.request.RequestPostProcessor;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static com.ssafy.myini.CommonFixture.TEST_AUTHORIZATION;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.*;
import static org.mockito.Mockito.times;
import static org.springframework.restdocs.headers.HeaderDocumentation.*;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static com.ssafy.myini.member.MemberFixture.*;

@WebMvcTest(MemberController.class)
class MemberControllerTest extends ControllerTest {

    @MockBean
    private MemberService memberService;

    @Test
    @DisplayName("자신의 회원정보를 조회한다")
    void findMember() throws Exception {
        // given
        given(memberService.findMember(any()))
                .willReturn(TEST_MEMBER_INFO_RESPONSE);

        // when
        mockMvc.perform(get("/api/members")
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
                        .accept(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(TEST_MEMBER_INFO_RESPONSE)))
                .andDo(document("api/members",
                        requestHeaders(
                                headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")
                        ),
                        responseFields(
                                fieldWithPath("memberId").type(JsonFieldType.NUMBER).description("회원 ID"),
                                fieldWithPath("memberNickname").type(JsonFieldType.STRING).description("회원 닉네임"),
                                fieldWithPath("memberEmail").type(JsonFieldType.STRING).description("회원 이메일"),
                                fieldWithPath("memberProfileImg").type(JsonFieldType.STRING).description("회원 프로필 이미지"),
                                fieldWithPath("projectCount").type(JsonFieldType.NUMBER).description("회원의 프로젝트 개수")
                        )
                ));

        // then
        then(memberService).should(times(1)).findMember(any());
    }

    @Test
    @DisplayName("함께 프로젝트를 진행했던 회원을 조회한다")
    void findCrewById() throws Exception {
        List<CrewResponse> result = new ArrayList<>(Arrays.asList(TEST_CREW_RESPONSE, TEST_CREW_RESPONSE2));
        // given
        given(memberService.findCrewById(any()))
                .willReturn(result);

        // when
        mockMvc.perform(get("/api/members/crew")
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
                        .accept(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(result)))
                .andDo(document("api/members/crew",
                        requestHeaders(
                                headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")
                        ),
                        responseFields(
                                fieldWithPath("[]").type(JsonFieldType.ARRAY).description("결과 배열"),
                                fieldWithPath("[].memberId").type(JsonFieldType.NUMBER).description("함께했던 회원 ID"),
                                fieldWithPath("[].memberNickname").type(JsonFieldType.STRING).description("함께했던 회원 닉네임"),
                                fieldWithPath("[].memberProfileImg").type(JsonFieldType.STRING).description("함께했던 회원 프로필 이미지")
                        )
                ));

        // then
        then(memberService).should(times(1)).findCrewById(any());
    }

    @Test
    @DisplayName("프로필 사진을 수정한다")
    void updateMemberProfileImg() throws Exception {
        // given
        willDoNothing()
                .given(memberService)
                .updateMemberProfileImg(any(), any());

        // when
        mockMvc.perform(multipart("/api/members/profile")
                        .file(TEST_FILE_REQUEST)
                        .header(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION)
                        .accept(MediaType.APPLICATION_JSON_VALUE)
                        .with(request -> {
                            request.setMethod("PATCH");
                            return request;
                        }))
                .andExpect(status().isOk())
                .andDo(document("api/members/profile",
                        requestHeaders(
                                headerWithName(HttpHeaders.AUTHORIZATION).description("AccessToken")
                        ),
                        requestParts(
                                partWithName("img").description("변경할 프로필 이미지 파일")
                        )
                ));

        // then
        then(memberService).should(times(1)).updateMemberProfileImg(any(), any());
    }
}