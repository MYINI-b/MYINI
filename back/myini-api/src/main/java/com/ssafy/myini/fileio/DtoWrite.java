package com.ssafy.myini.fileio;

import com.ssafy.myini.apidocs.response.DtoItemResponse;
import com.ssafy.myini.apidocs.response.DtoResponse;
import com.ssafy.myini.apidocs.response.ProjectInfoListResponse;
import com.ssafy.myini.initializer.request.InitializerRequest;

import java.util.List;

public class DtoWrite {
    static StringBuilder dtoImportContents;
    private static int depth = 0;
    private static boolean containList;

    public static String dtoPreview(DtoResponse dtoResponse, InitializerRequest initializerRequest) {
        dtoImportContents = new StringBuilder();
        containList = false;

        // 필수 import 선언
        dtoImportContents.append("import lombok.AllArgsConstructor;\n")
                .append("import lombok.Data;\n")
                .append("import lombok.NoArgsConstructor;\n");

        depth++;
        String body = methodWrite(dtoResponse.getDtoItemResponses());
        depth--;

        // list import 추가하기
        if (containList) {
            dtoImportContents.append("import java.util.List;\n\n");
        }

        StringBuilder contents = new StringBuilder();
        contents.append("package " + initializerRequest.getSpringPackageName() + "." + dtoResponse.getDtoType().toLowerCase() + ";\n")
                .append("\n")
                .append(dtoImportContents)
                .append("\n")
                .append("@Data\n")
                .append("@NoArgsConstructor\n")
                .append("@AllArgsConstructor\n")
                .append("public class ").append(dtoResponse.getDtoName()).append(" {\n");

        contents.append(body);
        FileUtil.appendTab(contents, depth);
        contents.append("}\n");

        return contents.toString();
    }

    public static void dtoWrite(ProjectInfoListResponse projectInfoListResponse, InitializerRequest initializerRequest) {
        projectInfoListResponse.getApiInfoResponses().forEach(
                apiInfoResponse -> {
                    apiInfoResponse.getDtoResponses().forEach(
                            dtoResponse -> {
                                String type = dtoResponse.getDtoType();
                                String path = "dto";
                                if (type.equals("REQUEST")) {
                                    path = "request";
                                } else if (type.equals("RESPONSE")) {
                                    path = "response";
                                }

                                FileUtil.fileWrite(initializerRequest, dtoPreview(dtoResponse, initializerRequest), path, FileUtil.firstIndexToUpperCase(dtoResponse.getDtoName().trim()));

                            }
                    );
                }
        );
    }

    public static String methodWrite(List<DtoItemResponse> dtoItemResponses) {
        StringBuilder methodContents = new StringBuilder();

        for (DtoItemResponse dtoItemResponse : dtoItemResponses) {
            FileUtil.appendTab(methodContents, depth);
            methodContents.append("private ");

            String type = "";

            if (dtoItemResponse.getDtoClassTypeName() != null) {
                // Dto 클래스 타입을 갖는 경우
                type = dtoItemResponse.getDtoClassTypeName();
            } else if (dtoItemResponse.getDtoPrimitiveTypeName() != null) {
                // 기본 타입을 갖는 경우
                if (dtoItemResponse.getDtoPrimitiveTypeId() == 10) {
                    // LocalDateTime인 경우
                    dtoImportContents.append("import java.time.LocalDateTime;\n");
                }
                type = dtoItemResponse.getDtoPrimitiveTypeName();
            }
            if (dtoItemResponse.getDtoIsList().equals("Y")) {
                containList = true;
                type = "List<" + type + ">";
            }
            methodContents.append(type).append(" ").append(dtoItemResponse.getDtoItemName()).append(";\n");
        }

        return methodContents.toString();
    }
}
