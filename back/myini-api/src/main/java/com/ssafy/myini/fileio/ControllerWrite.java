package com.ssafy.myini.fileio;

import com.ssafy.myini.apidocs.response.*;
import com.ssafy.myini.initializer.request.InitializerRequest;

import java.util.ArrayList;
import java.util.List;


public class ControllerWrite {
    static StringBuilder controllerImportContents;
    private static int depth;
    private static String service;
    private static boolean containList;
    private static boolean containValid;
    private static boolean containRequest;
    private static boolean containResponse;
    private static boolean containDate;

    public static String controllerPreview(ProjectInfoListResponse projectInfoListResponse, InitializerRequest initializerRequest) {
        controllerImportContents = new StringBuilder();
        containList = false;
        containValid = false;
        containRequest = false;
        containResponse = false;
        containDate = false;
        depth = 0;
        service = "";


        // 필수 import 선언
        controllerImportContents.append("import lombok.RequiredArgsConstructor;\n")
                .append("import org.springframework.http.HttpStatus;\n")
                .append("import org.springframework.http.ResponseEntity;\n")
                .append("import org.springframework.web.bind.annotation.*;\n")
                .append("import ").append(initializerRequest.getSpringPackageName()).append(".service.*;\n\n");


        service = FileUtil.firstIndexToLowerCase(projectInfoListResponse.getApiControllerName());
        StringBuilder contents = new StringBuilder();
        depth++;
        String body = methodWrite(projectInfoListResponse.getApiInfoResponses()).toString().replaceAll(",", ", ");
        depth--;

        if (containValid) {
            controllerImportContents.append("import javax.validation.Valid;\n\n");
        }
        // list, valid, request, response import 추가하기
        FileUtil.addImportContents(containList, containRequest, containResponse, containDate, controllerImportContents, initializerRequest.getSpringPackageName());

        // class 생성 및 service 선언
        contents.append("package " + initializerRequest.getSpringPackageName() + ".controller;\n")
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
        contents.append("private final ")
                .append(projectInfoListResponse.getApiControllerName()).append("Service ")
                .append(service).append("Service;\n");

        FileUtil.appendTab(contents, depth);
        contents.append(body);
        depth--;
        contents.append("}");


        return contents.toString();
    }

    public static void controllerWrite(ProjectInfoListResponse projectInfoListResponse, InitializerRequest initializerRequest) {
        FileUtil.fileWrite(initializerRequest, controllerPreview(projectInfoListResponse, initializerRequest), "controller", projectInfoListResponse.getApiControllerName() + "Controller");
    }

    // apimethod별로 만듦
    public static StringBuilder methodWrite(List<ApiInfoResponse> apiInfoResponses) {
        StringBuilder methodContents = new StringBuilder();

        for (ApiInfoResponse apiInfoResponse : apiInfoResponses) {
            // Api Method 추출
            String apiMethod = FileUtil.getMethodType(apiInfoResponse.getApiResponse().getApiMethod());

            methodContents.append("\n");
            FileUtil.appendTab(methodContents, depth);
            methodContents.append("@").append(apiMethod).append("Mapping");
            if (apiInfoResponse.getApiResponse().getApiUrl() != null && !apiInfoResponse.getApiResponse().getApiUrl().isEmpty()) {
                int idx = apiInfoResponse.getApiResponse().getApiUrl().indexOf("?");
                String url = idx == -1 ? apiInfoResponse.getApiResponse().getApiUrl() : apiInfoResponse.getApiResponse().getApiUrl().substring(0, idx);
                if (!url.isEmpty()) {
                    methodContents.append("(\"")
                            .append(url)
                            .append("\")");
                }
            }
            methodContents.append("\n");
            FileUtil.appendTab(methodContents, depth);
            methodContents.append("public ResponseEntity<");

            // 메서드 response type
            String response = FileUtil.responseWrite(apiInfoResponse);
            if (response.equals("void")) {
                response = FileUtil.firstIndexToUpperCase(response);
            } else {
                if (response.contains("List")) {
                    containList = true;
                }
            }

            // 메서드명
            methodContents.append(response).append("> ").append(apiInfoResponse.getApiResponse().getApiMethodName());

            // 매개변수 이름만 저장할 리스트
            List<String> variableNames = new ArrayList<>();
            // 매개변수
            methodContents.append("(");
            // 1. PathVariable
            for (PathVariableResponse pathVariableResponse : apiInfoResponse.getPathVariableResponses()) {
                if (!pathVariableResponse.getPathVariableType().equals("NORMAL")) {
                    methodContents.append("@PathVariable(\"").append(pathVariableResponse.getPathVariableKey()).append("\") ")
                            .append(pathVariableResponse.getPathVariableType()).append(" ")
                            .append(pathVariableResponse.getPathVariableKey()).append(",");
                    variableNames.add(pathVariableResponse.getPathVariableKey());
                }
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
                if (dtoResponse.getDtoType().equals("REQUEST") && !dtoResponse.getDtoItemResponses().isEmpty()) {
                    containValid = true;
                    containRequest = true;
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
                containResponse = true;
                if (response.contains("LocalDateTime")) {
                    containDate = true;
                }
                methodContents.append("body(body);\n");
            }

            depth--;
            FileUtil.appendTab(methodContents, depth);
            methodContents.append("}\n");
        }

        return methodContents;
    }

}
