package com.ssafy.myini.fileio;

import com.ssafy.myini.apidocs.response.*;
import com.ssafy.myini.initializer.request.InitializerRequest;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class ServiceImplWrite {
    static StringBuilder serviceImplImportContents;
    private static int depth = 0;

    private static boolean containList;

    private static Set<String> responseImportContents;
    private static Set<String> requestImportContents;

    public static String serviceImplPreview(ProjectInfoListResponse projectInfoListResponse, InitializerRequest initializerRequest) {
        serviceImplImportContents = new StringBuilder();
        responseImportContents = new HashSet<>();
        requestImportContents = new HashSet<>();
        containList = false;

        // 필수 import 선언
        serviceImplImportContents
                .append("import lombok.RequiredArgsConstructor;\n")
                .append("import org.springframework.stereotype.Service;\n")
                .append("import org.springframework.transaction.annotation.Transactional;\n\n");

        StringBuilder contents = new StringBuilder();
        depth++;
        String body = methodWrite(projectInfoListResponse.getApiInfoResponses()).replaceAll(",", ", ");
        depth--;

        // list import 추가하기
        if (containList) {
            serviceImplImportContents.append("import java.util.List;\n\n");
        }
        // request, response import 추가하기
        for (String requestImport : requestImportContents) {
            serviceImplImportContents.append("import ").append(initializerRequest.getSpring_package_name()).append(".request.").append(requestImport).append(";\n");
        }
        for (String responseImport : responseImportContents) {
            serviceImplImportContents.append("import ").append(initializerRequest.getSpring_package_name()).append(".response.").append(responseImport).append(";\n");
        }
        serviceImplImportContents.append("\n");

        contents.append("package " + initializerRequest.getSpring_package_name() + ".service;\n")
                .append("\n")
                .append(serviceImplImportContents)
                .append("@Service\n")
                .append("@RequiredArgsConstructor\n")
                .append("@Transactional\n")
                .append("public class ").append(projectInfoListResponse.getApiControllerName()).append("ServiceImpl ")
                .append("implements ").append(projectInfoListResponse.getApiControllerName()).append("Service {\n");

        contents.append(body);
        FileUtil.appendTab(contents, depth);
        contents.append("}");

        return contents.toString();
    }

    public static void serviceImplWrite(ProjectInfoListResponse projectInfoListResponse, InitializerRequest initializerRequest) {
        FileUtil.fileWrite(initializerRequest, serviceImplPreview(projectInfoListResponse, initializerRequest), "service", projectInfoListResponse.getApiControllerName() + "ServiceImpl");
    }

    // 메서드별 생성
    public static String methodWrite(List<ApiInfoResponse> apiInfoResponses) {
        StringBuilder methodContents = new StringBuilder();

        for (ApiInfoResponse apiInfoResponse : apiInfoResponses) {

            methodContents.append("\n");
            FileUtil.appendTab(methodContents, depth);
            methodContents.append("@Override\n");
            FileUtil.appendTab(methodContents, depth);
            // 메서드 response type
            String response = FileUtil.responseWrite(apiInfoResponse, responseImportContents);
            methodContents.append("public ").append(response).append(" "). // return type
                    append(apiInfoResponse.getApiResponse().getApiMethodName()); // 메서드 이름

            if (response.contains("List")) {
                containList = true;
            }

            // 매개변수
            methodContents.append("(");
            // 1. PathVariable
            for (PathVariableResponse pathVariableResponse : apiInfoResponse.getPathVariableResponses()) {
                methodContents.append(pathVariableResponse.getPathVariableType()).append(" ")
                        .append(pathVariableResponse.getPathVariableKey()).append(",");
            }
            // 2. queryString
            for (QueryStringResponse queryStringResponse : apiInfoResponse.getQueryStringResponses()) {
                methodContents.append(queryStringResponse.getQueryStringType()).append(" ")
                        .append(queryStringResponse.getQueryStringKey()).append(",");
            }
            // 3. requestBody
            for (DtoResponse dtoResponse : apiInfoResponse.getDtoResponses()) {
                if (dtoResponse.getDtoType().equals("REQUEST")) {
                    methodContents.append(FileUtil.firstIndexToUpperCase(dtoResponse.getDtoName()))
                            .append(" request");
                    requestImportContents.add(FileUtil.firstIndexToUpperCase(dtoResponse.getDtoName()));
                    break;
                }
            }
            FileUtil.removeLastComma(methodContents);
            methodContents.append(") {\n");
            depth++;
            FileUtil.appendTab(methodContents, depth);
            methodContents.append("// TODO : ").append(apiInfoResponse.getApiResponse().getApiMethodName()).append(" 코드를 작성하세요.\n");
            if (!response.equals("void")) {
                FileUtil.appendTab(methodContents, depth);
                methodContents.append("return null;\n");
            }
            depth--;
            FileUtil.appendTab(methodContents, depth);
            methodContents.append("}\n");
        }

        return methodContents.toString();
    }
}