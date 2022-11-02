package com.ssafy.myini.fileio;

import com.ssafy.myini.apidocs.response.*;
import com.ssafy.myini.initializer.request.InitializerRequest;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.util.ArrayList;
import java.util.List;

public class ControllerWrite {
    static StringBuilder controllerImportContents = new StringBuilder();
    private static int depth = 0;
    private static String service;

    public static void controllerWrite(ProjectInfoListResponse projectInfoListResponse, InitializerRequest initializerRequest) {
        // 필수 import 선언
        controllerImportContents.append("import lombok.RequiredArgsConstructor;\n")
                .append("import org.springframework.http.HttpStatus;\n")
                .append("import org.springframework.http.ResponseEntity;\n")
                .append("import org.springframework.web.bind.annotation.*;\n\n")
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
        appendTab(contents);
        service = firstIndexToLowerCase(projectInfoListResponse.getApiControllerName());
        contents.append("private final ")
                .append(projectInfoListResponse.getApiControllerName()).append("Service ")
                .append(service).append("Service;\n");

        appendTab(contents);
        contents.append("\n").append(methodWrite(projectInfoListResponse.getApiInfoResponses()).toString().replaceAll(",", ", "));
        depth--;
        contents.append("}");

        try {
            //폴더 찾아가기
            String controllerPath = initializerRequest.getSpring_base_path() + "\\" + initializerRequest.getSpring_name() + "\\src\\main\\java\\";

            String[] packagePath = initializerRequest.getSpring_package_name().split("[.]");
            for (String s : packagePath) {
                controllerPath = controllerPath + s + "\\";
            }

            controllerPath += "controller\\";

            // controller 폴더 만들기
            File folder = new File(controllerPath);
            if (!folder.exists()) {
                folder.mkdir();
            }

            // controller 파일 만들기
            File file = new File(controllerPath + projectInfoListResponse.getApiControllerName() + "Controller.java");
            if (!file.exists()) {
                folder.createNewFile();
            }

            //파일 쓰기
            FileWriter fw = new FileWriter(file);
            BufferedWriter writer = new BufferedWriter(fw);
            writer.write(contents.toString());
            writer.close();

        } catch (Exception e) {
            System.out.println("e = " + e);
        }

    }

    // apimethod별로 만듦
    public static StringBuilder methodWrite(List<ApiInfoResponse> apiInfoResponses) {
        StringBuilder methodContents = new StringBuilder();


        for (ApiInfoResponse apiInfoResponse : apiInfoResponses) {
            // Api Method 추출
            String apiMethod = getMethodType(apiInfoResponse.getApiResponse().getApiMethod());
            appendTab(methodContents);
            methodContents.append("@").append(apiMethod).append("Mapping");
            if (!apiInfoResponse.getApiResponse().getApiUrl().isEmpty()) {
                methodContents.append("(\"")
                        .append(apiInfoResponse.getApiResponse().getApiUrl())
                        .append("\")");
            }
            methodContents.append("\n");
            appendTab(methodContents);
            methodContents.append("public ResponseEntity<");

            // 메서드 response type
            String response = "Void";
            for (DtoResponse dtoResponse : apiInfoResponse.getDtoResponses()) {
                if (dtoResponse.getDtoType().equals("RESPONSE")) {
                    response = firstIndexToUpperCase(dtoResponse.getDtoName());
                    break;
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
                    methodContents.append("@RequestBody @Valid ").append(firstIndexToUpperCase(dtoResponse.getDtoName()))
                            .append(" request");
                    variableNames.add("request");
                    break;
                }
            }

            removeLastComma(methodContents);

            // 메서드 바디
            methodContents.append(") {\n");
            depth++;
            appendTab(methodContents);
            // 리턴 타입 있을 경우 body 로 받아준다
            if (!response.equals("Void")) {
                methodContents.append(response).append(" body = ");
            }

            methodContents.append(service).append(".").append(apiInfoResponse.getApiResponse().getApiMethodName()).append("(");
            // 매개변수 추가
            for (String variableName : variableNames) {
                methodContents.append(variableName).append(",");
            }
            removeLastComma(methodContents);
            methodContents.append(");\n");

            // api method 에 따른 response 형식
            appendTab(methodContents);
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
            appendTab(methodContents);
            methodContents.append("}\n");
        }

        return methodContents;
    }

    private static void removeLastComma(StringBuilder sb) {
        // 마지막에 , 있으면 제거
        if (sb.length() > 0 && sb.charAt(sb.length() - 1) == ',') {
            sb.deleteCharAt(sb.length() - 1);
        }
    }

    private static String firstIndexToLowerCase(String s) {
        return s.substring(0, 1).toLowerCase() + s.substring(1);
    }

    private static String firstIndexToUpperCase(String s) {
        return s.substring(0, 1).toUpperCase() + s.substring(1);
    }

    private static void appendTab(StringBuilder sb) {
        for (int i = 0; i < depth; i++) {
            sb.append("\t");
        }
    }

    private static String getMethodType(String method) {
        return method.charAt(0) + method.substring(1).toLowerCase();
    }
}
