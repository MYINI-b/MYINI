package com.ssafy.myini;

public class NotFoundException extends RuntimeException {
    public static final String MEMBER_NOT_FOUND = "존재하지 않는 회원입니다.";
    public static final String AUTH_NOT_FOUND = "존재하지 않는 토큰입니다.";
    public static final String PROJECT_NOT_FOUND = "존재하지 않는 프로젝트입니다.";
    public static final String REQUIREMENT_NOT_FOUND = "존재하지 않는 요구사항입니다.";
    public static final String REQUIREMENT_CATEGORY_NOT_FOUND = "존재하지 않는 요구사항 카테고리입니다.";
    public NotFoundException(String message) {
        super(message);
    }
}