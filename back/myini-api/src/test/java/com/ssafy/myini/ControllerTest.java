package com.ssafy.myini;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.myini.config.LoginMemberArgumentResolver;
import com.ssafy.myini.security.filter.JwtAuthenticationFilter;
import com.ssafy.myini.security.handler.CustomAccessDeniedHandler;
import com.ssafy.myini.security.handler.CustomAuthenticationEntryPoint;
import com.ssafy.myini.security.handler.OAuthAuthenticationFailureHandler;
import com.ssafy.myini.security.handler.OAuthAuthenticationSuccessHandler;
import com.ssafy.myini.security.service.OAuth2UserService;
import com.ssafy.myini.security.service.UserDetailService;
import com.ssafy.myini.security.util.JwtUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.restdocs.RestDocumentationContextProvider;
import org.springframework.restdocs.RestDocumentationExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.filter.CharacterEncodingFilter;

import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.documentationConfiguration;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

@AutoConfigureRestDocs
@ExtendWith(RestDocumentationExtension.class)
public abstract class ControllerTest {
    @Autowired
    protected ObjectMapper objectMapper;

    @MockBean
    protected JwtUtil jwtUtil;

    @MockBean
    protected UserDetailService userDetailService;

    @MockBean
    protected LoginMemberArgumentResolver loginMemberArgumentResolver;

    @MockBean
    protected CustomAccessDeniedHandler accessDeniedHandler;

    @MockBean
    protected CustomAuthenticationEntryPoint authenticationEntryPoint;

    @MockBean
    protected OAuth2UserService oAuth2UserService;

    @MockBean
    protected OAuthAuthenticationSuccessHandler oAuthAuthenticationSuccessHandler;

    @MockBean
    protected OAuthAuthenticationFailureHandler oAuthAuthenticationFailureHandler;

    protected MockMvc mockMvc;

    // MockMvc 생성때 추가
    @BeforeEach
    void setUp(WebApplicationContext wac, RestDocumentationContextProvider restDocumentationContextProvider) {
        JwtAuthenticationFilter jwtAuthenticationFilter =  (JwtAuthenticationFilter) wac.getBean("jwtAuthenticationFilter");

        mockMvc = MockMvcBuilders
                .webAppContextSetup(wac)
                .alwaysDo(print())
                .addFilter(new CharacterEncodingFilter("UTF-8", true))
                .addFilter(jwtAuthenticationFilter)
                .apply(documentationConfiguration(restDocumentationContextProvider)
                        .operationPreprocessors()
                        .withRequestDefaults(prettyPrint())
                        .withResponseDefaults(prettyPrint()))
                .build();

    }
}
