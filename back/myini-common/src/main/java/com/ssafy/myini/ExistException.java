package com.ssafy.myini;

public class ExistException extends RuntimeException{
    public static final String REQUIREMENT_CATEGORY_EXIST = "요구사항에서 사용되는 카테고리입니다.";
    public ExistException(String message) {
        super(message);
    }
}
