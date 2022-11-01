package com.ssafy.myini;

public class InitializerException extends RuntimeException{
    public static final String INITIALIZER_FAIL = "이니셜라이징에 실패했습니다.";
    public InitializerException(String message) {
        super(message);
    }
}
