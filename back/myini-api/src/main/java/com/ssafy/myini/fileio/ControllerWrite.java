package com.ssafy.myini.fileio;

import com.ssafy.myini.apidocs.response.ApiInfoResponse;
import com.ssafy.myini.apidocs.response.ProjectInfoListResponse;
import com.ssafy.myini.initializer.request.InitializerRequest;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.util.List;

public class ControllerWrite {
    static StringBuilder controllerImportContents = new StringBuilder();

    public static void controllerWrite(ProjectInfoListResponse projectInfoListResponse, InitializerRequest initializerRequest) {
        // 필수 import 선언
        controllerImportContents.append("import lombok.RequiredArgsConstructor;\n" +
                "import org.springframework.http.HttpStatus;\n" +
                "import org.springframework.http.ResponseEntity;\n" +
                "import org.springframework.web.bind.annotation.*;\n");


        StringBuilder contents = new StringBuilder();
        // class 생성 및 service 선언
        contents.append("package " + initializerRequest.getSpring_package_name() + ".controller;\n")
                .append("\n")
                .append(controllerImportContents)
                .append("\n")
                .append("@RequestMapping(\"" + projectInfoListResponse.getApiControllerBaseUrl() + "\")\n" +
                        "@RestController\n" +
                        "@RequiredArgsConstructor\n")
                .append("public class " + projectInfoListResponse.getApiControllerName() + "Controller {\n\n")
                .append("}");

        try {
            //폴더 찾아가기
            String controllerPath = initializerRequest.getSpring_base_path() + "\\" + initializerRequest.getSpring_name() + "\\src\\main\\java\\";

            String[] packagePath = initializerRequest.getSpring_package_name().split("[.]");
            for (String s : packagePath) {
                controllerPath = controllerPath + s + "\\";
            }
            controllerPath += "controller\\";

            //폴더 만들기
            File folder = new File(controllerPath);
            if (!folder.exists()) {
                folder.mkdir();
            }

            //파일 만들기
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
            methodContents.append("@").append(apiMethod).append("Mapping");
            if(!apiInfoResponse.getApiResponse().getApiUrl().isEmpty()){
                methodContents.append(apiInfoResponse.getApiResponse().getApiUrl());
            }
        }
        return methodContents;
    }

    public static String getMethodType(String method) {
        return method.charAt(0) + method.substring(1, method.length()).toLowerCase();
    }
}
