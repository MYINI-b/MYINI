package com.ssafy.myini;

public class NotFoundException extends RuntimeException {
    public static final String MEMBER_NOT_FOUND = "존재하지 않는 회원입니다.";
    public static final String AUTH_NOT_FOUND = "존재하지 않는 토큰입니다.";
    public static final String PROJECT_NOT_FOUND = "존재하지 않는 프로젝트입니다.";
    public static final String APICONTROLLER_NOT_FOUND = "존재하지 않는 API컨트롤러입니다.";
    public static final String API_NOT_FOUND = "존재하지 않는 API입니다.";
    public static final String PATHVARIABLE_NOT_FOUND = "존재하지 않는 PATHVARIABLE입니다.";
    public static final String QUERYSTRING_NOT_FOUND = "존재하지 않는 QUERYSTRING입니다.";
    public static final String DTO_NOT_FOUND = "존재하지 않는 DTO입니다.";
    public static final String DTOITEM_NOT_FOUND = "존재하지 않는 DTOITEM입니다.";
    public static final String PRIMITIVE_NOT_FOUND = "존재하지 않는 자료형입니다.";
    public NotFoundException(String message) {
        super(message);
    }
}