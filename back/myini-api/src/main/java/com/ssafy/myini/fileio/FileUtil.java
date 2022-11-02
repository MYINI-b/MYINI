package com.ssafy.myini.fileio;

import com.ssafy.myini.apidocs.response.ApiInfoResponse;
import com.ssafy.myini.apidocs.response.DtoResponse;
import com.ssafy.myini.apidocs.response.ProjectInfoListResponse;
import com.ssafy.myini.initializer.request.InitializerRequest;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;

public class FileUtil {

    public static void fileWrite(ProjectInfoListResponse projectInfoListResponse, InitializerRequest initializerRequest, String contents, String folderPath, String fileName) {
        try {
            //폴더 찾아가기
            String path = initializerRequest.getSpring_base_path() + "\\" + initializerRequest.getSpring_name() + "\\src\\main\\java\\";

            String[] packagePath = initializerRequest.getSpring_package_name().split("[.]");
            for (String s : packagePath) {
                path = path + s + "\\";
            }

            path += folderPath + "\\";

            // 폴더 만들기
            File folder = new File(path);
            if (!folder.exists()) {
                folder.mkdir();
            }

            // 파일 만들기
            File file = new File(path + fileName + ".java");
            if (!file.exists()) {
                folder.createNewFile();
            }

            //파일 쓰기
            FileWriter fw = new FileWriter(file);
            BufferedWriter writer = new BufferedWriter(fw);
            writer.write(contents);
            writer.close();

        } catch (Exception e) {
            System.out.println("e = " + e);
        }
    }

    public static void removeLastComma(StringBuilder sb) {
        // 마지막에 , 있으면 제거
        if (sb.length() > 0 && sb.charAt(sb.length() - 1) == ',') {
            sb.deleteCharAt(sb.length() - 1);
        }
    }

    public static String firstIndexToLowerCase(String s) {
        // 맨 앞글자 소문자로 변환
        return s.substring(0, 1).toLowerCase() + s.substring(1);
    }

    public static String firstIndexToUpperCase(String s) {
        // 맨 앞글자 대문자로 변환
        return s.substring(0, 1).toUpperCase() + s.substring(1);
    }

    public static void appendTab(StringBuilder sb, int depth) {
        // depth에 따라 탭 붙여주는 메서드
        for (int i = 0; i < depth; i++) {
            sb.append("\t");
        }
    }

    public static String getMethodType(String method) {
        // GET -> Get
        return firstIndexToUpperCase(method.toLowerCase());
    }

    public static String responseWrite(ApiInfoResponse apiInfoResponse) {
        for (DtoResponse dtoResponse : apiInfoResponse.getDtoResponses()) {
            if (dtoResponse.getDtoType().equals("RESPONSE")) {
                String type = FileUtil.firstIndexToUpperCase(dtoResponse.getDtoName().trim());
                if (dtoResponse.getDtoIsList().equals("Y")) {
                    return "List<" + type + ">";
                } else {
                    return type;
                }
            }
        }
        return "void";
    }
}
