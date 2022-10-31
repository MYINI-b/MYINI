package com.ssafy.myini.initializer;

import com.ssafy.myini.initializer.request.InitializerRequest;
import com.ssafy.myini.initializer.response.InitializerPossibleResponse;

import java.util.Arrays;

public class InitializerFixture {
    public static final Long ID = 1L;
    public static final String CONTENT = "내용";
    public static final Boolean FLAG = Boolean.TRUE;

    public static final InitializerRequest TEST_INITIALIZER_REQUEST
            = new InitializerRequest(CONTENT,CONTENT,CONTENT,CONTENT,CONTENT,CONTENT,CONTENT,CONTENT,CONTENT,CONTENT,CONTENT, Arrays.asList(CONTENT));

    public static final InitializerPossibleResponse TEST_INITIALIZER_POSSIBLE_RESPONSE
            = new InitializerPossibleResponse(FLAG,CONTENT);


}
