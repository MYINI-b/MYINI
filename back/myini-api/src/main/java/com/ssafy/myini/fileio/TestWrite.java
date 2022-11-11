package com.ssafy.myini.fileio;

import com.ssafy.myini.initializer.request.InitializerRequest;

public class TestWrite {

    public static String testContent(InitializerRequest initializerRequest) {
        StringBuilder content = new StringBuilder();

        content.append("package ").append(initializerRequest.getSpringPackageName() + ";\n\n");
        content.append("import org.junit.jupiter.api.Test;\n\n");
        content.append("class ").append(FileUtil.firstIndexToUpperCase(initializerRequest.getSpringName())).append("ApplicationTests {\n\n")
                .append("    @Test\n")
                .append("    void contextLoads() {\n")
                .append("    }\n\n")
                .append("}");

        return content.toString();
    }

    public static void testWrite(InitializerRequest initializerRequest) {
        FileUtil.fileWrite(initializerRequest, testContent(initializerRequest), "", FileUtil.firstIndexToUpperCase(initializerRequest.getSpringName()) + "ApplicationTests");
    }

}
