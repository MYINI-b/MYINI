package com.ssafy.myini.fileio;

import com.ssafy.myini.apidocs.response.*;
import com.ssafy.myini.initializer.request.InitializerRequest;

import java.util.List;

public class ServiceWrite {
    static StringBuilder serviceImportContents;
    private static int depth;
    private static boolean containList;
    private static boolean containRequest;
    private static boolean containResponse;
    private static boolean containDate;

    public static String servicePreview(ProjectInfoListResponse projectInfoListResponse, InitializerRequest initializerRequest) {
        serviceImportContents = new StringBuilder();
        depth = 0;
        containList = false;
        containRequest = false;
        containResponse = false;
        containDate = false;

        StringBuilder contents = new StringBuilder();
        depth++;
        String body = methodWrite(projectInfoListResponse.getApiInfoResponses()).replaceAll(",", ", ");
        depth--;

        // list, request, response import 추가하기
        FileUtil.addImportContents(containList, containRequest, containResponse, containDate, serviceImportContents, initializerRequest.getSpringPackageName());

        contents.append("package " + initializerRequest.getSpringPackageName() + ".service;\n")
                .append("\n")
                .append(serviceImportContents)
                .append("\n");

        // 인터페이스 선언부
        contents.append("public interface ")
                .append(projectInfoListResponse.getApiControllerName()).append("Service { \n");
        contents.append(body);
        FileUtil.appendTab(contents, depth);
        contents.append("}");

        return contents.toString();
    }

    public static void serviceWrite(ProjectInfoListResponse projectInfoListResponse, InitializerRequest initializerRequest) {
        FileUtil.fileWrite(initializerRequest, servicePreview(projectInfoListResponse, initializerRequest), "service", projectInfoListResponse.getApiControllerName() + "Service");
    }

    // 메서드별 생성
    public static String methodWrite(List<ApiInfoResponse> apiInfoResponses) {
        StringBuilder methodContents = new StringBuilder();

        for (ApiInfoResponse apiInfoResponse : apiInfoResponses) {
            methodContents.append("\n");
            FileUtil.appendTab(methodContents, depth);
            // 메서드 response type
            String response = FileUtil.responseWrite(apiInfoResponse);
            methodContents.append(response).append(" "). // return type
                    append(apiInfoResponse.getApiResponse().getApiMethodName()); // 메서드 이름

            if (!response.equals("void")) {
                containResponse = true;
                if (response.contains("LocalDateTime")) {
                    containDate = true;
                }
            }
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
                    containRequest = true;
                    methodContents.append(FileUtil.firstIndexToUpperCase(dtoResponse.getDtoName()))
                            .append(" request");
                    break;
                }
            }

            FileUtil.removeLastComma(methodContents);
            methodContents.append(");\n");
        }

        return methodContents.toString();
    }
}