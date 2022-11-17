package com.ssafy.myini.fileio;

import com.ssafy.myini.apidocs.domain.Dto;
import com.ssafy.myini.apidocs.domain.DtoItem;
import com.ssafy.myini.apidocs.domain.type.DtoType;
import com.ssafy.myini.common.type.YN;
import com.ssafy.myini.initializer.request.InitializerRequest;
import com.ssafy.myini.project.domain.Project;

import java.util.List;

public class DtoWrite {
    static StringBuilder dtoImportContents;
    private static int depth;
    private static boolean containList;
    private static boolean containRequest;
    private static boolean containResponse;
    private static boolean containDto;
    private static boolean containDate;

    public static String dtoPreview(Dto dto, InitializerRequest initializerRequest) {
        dtoImportContents = new StringBuilder();
        depth = 0;
        containRequest = false;
        containResponse = false;
        containDto = false;
        containDate = false;
        containList = false;

        // 필수 import 선언
        dtoImportContents.append("import lombok.AllArgsConstructor;\n")
                .append("import lombok.Data;\n")
                .append("import lombok.NoArgsConstructor;\n");

        depth++;
        String body = methodWrite(dto.getDtoItemChildren());
        depth--;

        // list import 추가하기
        if (containList) {
            dtoImportContents.append("import java.util.List;\n");
        }
        if (containDate) {
            dtoImportContents.append("import java.time.LocalDateTime;\n");
        }
        dtoImportContents.append("\n");

        if (containRequest && !dto.getDtoType().equals(DtoType.REQUEST)) {
            dtoImportContents.append("import ").append(initializerRequest.getSpringPackageName()).append(".request.*;\n");
        }
        if (containResponse && !dto.getDtoType().equals(DtoType.RESPONSE)) {
            dtoImportContents.append("import ").append(initializerRequest.getSpringPackageName()).append(".response.*;\n");
        }
        if (containDto && !dto.getDtoType().equals(DtoType.DTO)) {
            dtoImportContents.append("import ").append(initializerRequest.getSpringPackageName()).append(".dto.*;\n");
        }
        dtoImportContents.append("\n");

        StringBuilder contents = new StringBuilder();
        contents.append("package " + initializerRequest.getSpringPackageName() + "." + String.valueOf(dto.getDtoType()).toLowerCase() + ";\n")
                .append("\n")
                .append(dtoImportContents)
                .append("\n")
                .append("@Data\n")
                .append("@NoArgsConstructor\n")
                .append("@AllArgsConstructor\n")
                .append("public class ").append(FileUtil.firstIndexToUpperCase(dto.getDtoName())).append(" {\n");

        contents.append(body);
        FileUtil.appendTab(contents, depth);
        contents.append("}\n");

        return contents.toString();
    }

    public static void dtoWrite(Project project, InitializerRequest initializerRequest) {
        project.getDtos().forEach(
                dto -> {
                    String path = "dto";
                    FileUtil.fileWrite(initializerRequest, dtoPreview(dto, initializerRequest), path, FileUtil.firstIndexToUpperCase(dto.getDtoName().trim()));
                }
        );

        project.getApiControllers().forEach(
                apiController -> {
                    apiController.getApis().forEach(
                            api -> {
                                api.getDtos().forEach(
                                        dto -> {
                                            if (!dto.getDtoItemChildren().isEmpty()) {
                                                String type = String.valueOf(dto.getDtoType());
                                                String path = (type.equals("REQUEST")) ? "request" : "response";
                                                FileUtil.fileWrite(initializerRequest, dtoPreview(dto, initializerRequest), path, FileUtil.firstIndexToUpperCase(dto.getDtoName().trim()));
                                            }
                                        }
                                );
                            }
                    );
                }
        );
    }

    public static String methodWrite(List<DtoItem> dtoItems) {
        StringBuilder methodContents = new StringBuilder();

        for (DtoItem dtoItem : dtoItems) {
            FileUtil.appendTab(methodContents, depth);
            methodContents.append("private ");

            String type = "";

            if (dtoItem.getDtoClassType() != null) {
                // Dto 클래스 타입을 갖는 경우
                type = dtoItem.getDtoClassType().getDtoName();
                DtoType dtoType = dtoItem.getDtoClassType().getDtoType();
                if (dtoType.equals(DtoType.RESPONSE)) {
                    containResponse = true;
                } else if (dtoType.equals(DtoType.REQUEST)) {
                    containRequest = true;
                } else if (dtoType.equals(DtoType.DTO)) {
                    containDto = true;
                }
            } else if (dtoItem.getPrimitive() != null) {
                // 기본 타입을 갖는 경우
                if (dtoItem.getPrimitive().getPrimitiveId() == 10) {
                    // LocalDateTime인 경우
                    containDate = true;
                }
                type = dtoItem.getPrimitive().getPrimitiveName();
            }

            if (dtoItem.getDtoIsList().equals(YN.Y)) {
                containList = true;
                type = "List<" + type + ">";
            }
            methodContents.append(type).append(" ").append(dtoItem.getDtoItemName()).append(";\n");
        }

        return methodContents.toString();
    }
}
