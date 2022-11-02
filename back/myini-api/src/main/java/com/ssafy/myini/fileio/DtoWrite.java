package com.ssafy.myini.fileio;

import com.ssafy.myini.apidocs.response.DtoItemResponse;
import com.ssafy.myini.apidocs.response.DtoResponse;
import com.ssafy.myini.apidocs.response.ProjectInfoListResponse;
import com.ssafy.myini.initializer.request.InitializerRequest;

public class DtoWrite {
    static StringBuilder dtoImportContents;
    private static int depth = 0;

    public static String dtoPreview(DtoResponse dtoResponse, InitializerRequest initializerRequest) {
        dtoImportContents = new StringBuilder();

        // 필수 import 선언
        dtoImportContents.append("import lombok.AllArgsConstructor;\n")
                .append("import lombok.Data;\n")
                .append("import lombok.NoArgsConstructor;\n")
                .append("import java.util.*;\n\n")

                .append("import ").append(initializerRequest.getSpring_package_name()).append(".request.*\n")
                .append("import ").append(initializerRequest.getSpring_package_name()).append(".response.*\n")
                .append("import ").append(initializerRequest.getSpring_package_name()).append(".dto.*\n");

        StringBuilder contents = new StringBuilder();
        contents.append("package " + initializerRequest.getSpring_package_name() + ".request;\n")
                .append("\n")
                .append(dtoImportContents)
                .append("\n")
                .append("@Data\n")
                .append("@NoArgsConstructor\n")
                .append("@AllArgsConstructor\n")
                .append("public class ").append(dtoResponse.getDtoName()).append(" {\n");
        depth++;

        for (DtoItemResponse dtoItemResponse : dtoResponse.getDtoItemResponses()) {
            FileUtil.appendTab(contents, depth);
            contents.append("private ").append(dtoItemResponse.getDtoItemName()).append(";\n");
        }
        depth--;
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
                                FileUtil.fileWrite(projectInfoListResponse, initializerRequest, dtoPreview(dtoResponse, initializerRequest), path, dtoResponse.getDtoName());
                            }
                    );
                }
        );
    }
}
