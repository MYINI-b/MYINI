package com.ssafy.myini;

public class DuplicateException extends RuntimeException{
    public static final String USER_DUPLICATE = "이미 등록된 회원정보입니다.";
    public DuplicateException(String message) {
        super(message);
    }
}
