package com.ssafy.myini.initializer;

import com.ssafy.myini.initializer.request.InitializerRequest;
import com.ssafy.myini.initializer.response.InitializerPossibleResponse;
import com.ssafy.myini.initializer.response.PreviewResponse;
import org.json.simple.JSONObject;
import org.junit.rules.TemporaryFolder;

import java.io.*;

public class InitializerFixture {
    public static final Long ID = 1L;
    public static final String CONTENT = "내용";
    public static final Boolean FLAG = Boolean.TRUE;
    public static final ByteArrayOutputStream BYTES = new ByteArrayOutputStream();
    public static TemporaryFolder TEMPORARY_FOLDER = new TemporaryFolder();
    public static File FILE = new File("");
    public static JSONObject JSON = new JSONObject();


    public static final InitializerRequest TEST_INITIALIZER_REQUEST
            = new InitializerRequest(CONTENT, CONTENT, CONTENT, CONTENT, CONTENT, CONTENT, CONTENT, CONTENT, CONTENT, CONTENT, CONTENT);

    public static final InitializerPossibleResponse TEST_INITIALIZER_POSSIBLE_RESPONSE
            = new InitializerPossibleResponse(FLAG, CONTENT);

    public static final PreviewResponse TEST_PREVIEW_RESPONSE
            = new PreviewResponse(CONTENT,CONTENT,CONTENT);


}
