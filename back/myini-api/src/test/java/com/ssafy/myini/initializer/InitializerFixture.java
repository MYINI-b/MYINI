package com.ssafy.myini.initializer;

import com.ssafy.myini.initializer.request.InitializerRequest;
import com.ssafy.myini.initializer.response.InitializerPossibleResponse;
import com.ssafy.myini.initializer.response.PreviewResponse;
import org.springframework.core.io.InputStreamResource;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.zip.ZipFile;

public class InitializerFixture {
    public static final Long ID = 1L;
    public static final String CONTENT = "내용";
    public static final Boolean FLAG = Boolean.TRUE;
    public static final ByteArrayOutputStream BYTES = new ByteArrayOutputStream();
    public static final InputStream INPUT_STREAM = new ByteArrayInputStream("Content".getBytes(StandardCharsets.UTF_8));
    public static final InputStreamResource RESOURCE = new InputStreamResource(INPUT_STREAM, "test");

    public static final InitializerRequest TEST_INITIALIZER_REQUEST
            = new InitializerRequest(CONTENT, CONTENT, CONTENT, CONTENT, CONTENT, CONTENT, CONTENT, CONTENT, CONTENT, CONTENT, CONTENT, CONTENT);

    public static final InitializerPossibleResponse TEST_INITIALIZER_POSSIBLE_RESPONSE
            = new InitializerPossibleResponse(FLAG, CONTENT);

    public static final PreviewResponse TEST_PREVIEW_RESPONSE
            = new PreviewResponse(CONTENT,CONTENT,CONTENT);


}
