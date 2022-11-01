package com.ssafy.myini.security.handler;

import com.ssafy.myini.member.service.MemberService;
import com.ssafy.myini.security.oauth.CustomOAuth2User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RequiredArgsConstructor
@Component
public class OAuthAuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final String AUTHENTICATION_REDIRECT_URI = "https://k7b203.p.ssafy.io";
    private final MemberService memberService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        CustomOAuth2User customOAuth2User = (CustomOAuth2User) authentication.getPrincipal();
        String accessToken = memberService.generateToken(customOAuth2User.getUserId());
        String target = UriComponentsBuilder.fromUriString(AUTHENTICATION_REDIRECT_URI)
                .queryParam("accessToken", accessToken)
                .build().toString();

        getRedirectStrategy().sendRedirect(request, response, target);
    }
}
