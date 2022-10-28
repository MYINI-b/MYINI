package com.ssafy.myini;

public class InvalidException extends RuntimeException {
    
    public static final String INVALID_REQUEST = "잘못된 요청입니다.";

    public InvalidException(String message) {
        super(message);
    }
}
