package com.ssafy.myini;

public class DuplicateException extends RuntimeException{
    public static final String MEMBER_PROJECT_DUPLICATE = "이미 존재하는 팀원입니다.";
    public DuplicateException(String message) {
        super(message);
    }
}
