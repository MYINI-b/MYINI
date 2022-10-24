package com.ssafy.myini;

public class NotMatchException extends RuntimeException {

    public static final String USER_NOT_MATCH = "회원 정보가 일치하지 않습니다.";
    public NotMatchException(String message) {
        super(message);
    }
}