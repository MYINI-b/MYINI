package com.ssafy.myini.fileio;

import com.ssafy.myini.apidocs.response.*;
import com.ssafy.myini.initializer.request.InitializerRequest;

import java.util.List;

public class ServiceWrite {
    static StringBuilder serviceImportContents;
    private static int depth = 0;

    public static String servicePreview(ProjectInfoListResponse projectInfoListResponse, InitializerRequest initializerRequest) {
        serviceImportContents = new StringBuilder();

        // 필수 import 선언
        serviceImportContents
                .append("import ").append(initializerRequest.getSpring_package_name()).append(".request.*\n")
                .append("import ").append(initializerRequest.getSpring_package_name()).append(".response.*\n")
                .append("import ").append(initializerRequest.getSpring_package_name()).append(".dto.*\n")
                .append("import java.util.*;\n\n");

        StringBuilder contents = new StringBuilder();
        contents.append("package " + initializerRequest.getSpring_package_name() + ".service;\n")
                .append("\n")
                .append(serviceImportContents)
                .append("\n");

        // 인터페이스 선언부
        contents.append("public interface ")
                .append(projectInfoListResponse.getApiControllerName()).append("Service { \n");
        depth++;
        contents.append(methodWrite(projectInfoListResponse.getApiInfoResponses()).replaceAll(",", ", "));
        depth--;
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
                    break;
                }
            }

            FileUtil.removeLastComma(methodContents);
            methodContents.append(");\n");
        }

        return methodContents.toString();
    }
}