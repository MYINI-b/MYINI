package com.ssafy.myini;

public class OAuthProviderNotExistException extends RuntimeException{
    public OAuthProviderNotExistException(String message) {
        super(message + " 로그인은 아직 지원하지 않습니다.");
    }
}
