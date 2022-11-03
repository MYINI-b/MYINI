package com.ssafy.myini.security.oauth;


import com.ssafy.myini.OAuthProviderNotExistException;
import com.ssafy.myini.member.domain.type.Provider;

import java.util.Map;

public class OAuth2UserInfoFactory {
    public static OAuth2UserInfo getOAuth2UserInfo(String registrationId, Map<String, Object> attributes) {
        if (registrationId.equals(Provider.google.toString())) {
            return new GoogleOAuth2UserInfo(attributes);
        }  else {
            throw new OAuthProviderNotExistException(registrationId);
        }
    }
}
