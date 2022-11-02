package com.ssafy.myini.fileio;

import com.ssafy.myini.apidocs.response.*;
import com.ssafy.myini.common.type.YN;
import com.ssafy.myini.initializer.request.InitializerRequest;

import java.util.ArrayList;
import java.util.List;


public class ControllerWrite {
    static StringBuilder controllerImportContents;
    private static int depth = 0;
    private static String service;

    public static String controllerPreview(ProjectInfoListResponse projectInfoListResponse, InitializerRequest initializerRequest) {
        controllerImportContents = new StringBuilder();

        // 필수 import 선언
        controllerImportContents.append("import lombok.RequiredArgsConstructor;\n")
                .append("import org.springframework.http.HttpStatus;\n")
                .append("import org.springframework.http.ResponseEntity;\n")
                .append("import org.springframework.web.bind.annotation.*;\n")
                .append("import java.util.*;\n\n")
                .append("import ").append(initializerRequest.getSpring_package_name()).append(".request.*\n")
                .append("import ").append(initializerRequest.getSpring_package_name()).append(".response.*\n")
                .append("import ").append(initializerRequest.getSpring_package_name()).append(".service.*\n");

        StringBuilder contents = new StringBuilder();
        // class 생성 및 service 선언
        contents.append("package " + initializerRequest.getSpring_package_name() + ".controller;\n")
                .append("\n")
                .append(controllerImportContents)
                .append("\n")
                .append("@RequestMapping(\"" + projectInfoListResponse.getApiControllerBaseUrl() + "\")\n" +
                        "@RestController\n" +
                        "@RequiredArgsConstructor\n")
                .append("public class " + projectInfoListResponse.getApiControllerName() + "Controller {\n");
        // 서비스 불러오기
        depth++;
        FileUtil.appendTab(contents, depth);
        service = FileUtil.firstIndexToLowerCase(projectInfoListResponse.getApiControllerName());
        contents.append("private final ")
                .append(projectInfoListResponse.getApiControllerName()).append("Service ")
                .append(service).append("Service;\n");

        FileUtil.appendTab(contents, depth);
        contents.append("\n").append(methodWrite(projectInfoListResponse.getApiInfoResponses()).toString().replaceAll(",", ", "));
        depth--;
        contents.append("}");

        return contents.toString();
    }

    public static void controllerWrite(ProjectInfoListResponse projectInfoListResponse, InitializerRequest initializerRequest) {
        FileUtil.fileWrite(projectInfoListResponse, initializerRequest, controllerPreview(projectInfoListResponse, initializerRequest), "controller", "Controller");
    }

    // apimethod별로 만듦
    public static StringBuilder methodWrite(List<ApiInfoResponse> apiInfoResponses) {
        StringBuilder methodContents = new StringBuilder();

        for (ApiInfoResponse apiInfoResponse : apiInfoResponses) {
            // Api Method 추출
            String apiMethod = FileUtil.getMethodType(apiInfoResponse.getApiResponse().getApiMethod());

            FileUtil.appendTab(methodContents, depth);
            methodContents.append("@").append(apiMethod).append("Mapping");
            if (!apiInfoResponse.getApiResponse().getApiUrl().isEmpty()) {
                methodContents.append("(\"")
                        .append(apiInfoResponse.getApiResponse().getApiUrl())
                        .append("\")");
            }
            methodContents.append("\n");
            FileUtil.appendTab(methodContents, depth);
            methodContents.append("public ResponseEntity<");

            // 메서드 response type
            String response = FileUtil.responseWrite(apiInfoResponse);
            if (response.equals("void")) {
                response = FileUtil.firstIndexToUpperCase(response);
            }

            // 메서드명
            methodContents.append(response).append("> ").append(apiInfoResponse.getApiResponse().getApiMethodName());

            // 매개변수 이름만 저장할 리스트
            List<String> variableNames = new ArrayList<>();
            // 매개변수
            methodContents.append("(");
            // 1. PathVariable
            for (PathVariableResponse pathVariableResponse : apiInfoResponse.getPathVariableResponses()) {
                methodContents.append("@PathVariable(\"").append(pathVariableResponse.getPathVariableKey()).append("\") ")
                        .append(pathVariableResponse.getPathVariableType()).append(" ")
                        .append(pathVariableResponse.getPathVariableKey()).append(",");
                variableNames.add(pathVariableResponse.getPathVariableKey());
            }
            // 2. queryString
            for (QueryStringResponse queryStringResponse : apiInfoResponse.getQueryStringResponses()) {
                methodContents.append("@RequestParam(\"").append(queryStringResponse.getQueryStringKey()).append("\") ")
                        .append(queryStringResponse.getQueryStringType()).append(" ")
                        .append(queryStringResponse.getQueryStringKey()).append(",");
                variableNames.add(queryStringResponse.getQueryStringKey());
            }
            // 3. requestBody
            for (DtoResponse dtoResponse : apiInfoResponse.getDtoResponses()) {
                if (dtoResponse.getDtoType().equals("REQUEST")) {
                    methodContents.append("@RequestBody @Valid ").append(FileUtil.firstIndexToUpperCase(dtoResponse.getDtoName()))
                            .append(" request");
                    variableNames.add("request");
                    break;
                }
            }

            FileUtil.removeLastComma(methodContents);

            // 메서드 바디
            methodContents.append(") {\n");
            depth++;
            FileUtil.appendTab(methodContents, depth);
            // 리턴 타입 있을 경우 body 로 받아준다
            if (!response.equals("Void")) {
                methodContents.append(response).append(" body = ");
            }

            methodContents.append(service).append("Service.").append(apiInfoResponse.getApiResponse().getApiMethodName()).append("(");
            // 매개변수 추가
            for (String variableName : variableNames) {
                methodContents.append(variableName).append(",");
            }
            FileUtil.removeLastComma(methodContents);
            methodContents.append(");\n");

            // api method 에 따른 response 형식
            FileUtil.appendTab(methodContents, depth);
            methodContents.append("return ResponseEntity.");

            String method = apiInfoResponse.getApiResponse().getApiMethod();
            if (method.equals("GET")) {
                methodContents.append("ok().");
            } else if (method.equals("POST")) {
                methodContents.append("status(HttpStatus.CREATED).");
            } else {
                methodContents.append("status(HttpStatus.OK).");
            }

            if (response.equals("Void")) {
                methodContents.append("build();\n");
            } else {
                methodContents.append("body(body);\n");
            }

            depth--;
            FileUtil.appendTab(methodContents, depth);
            methodContents.append("}\n");
        }

        return methodContents;
    }

}
