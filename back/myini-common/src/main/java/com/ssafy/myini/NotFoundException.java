package com.ssafy.myini;

public class NotFoundException extends RuntimeException {
    public static final String MEMBER_NOT_FOUND = "존재하지 않는 회원입니다.";
    public static final String AUTH_NOT_FOUND = "존재하지 않는 토큰입니다.";
    public NotFoundException(String message) {
        super(message);
    }
}