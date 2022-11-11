package com.ssafy.myini.fileio;

import com.ssafy.myini.apidocs.response.ApiInfoResponse;
import com.ssafy.myini.apidocs.response.DtoResponse;
import com.ssafy.myini.initializer.request.InitializerRequest;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;

public class FileUtil {
    public static String basePath = "/myini/initializer/";

    public static void fileWrite(InitializerRequest initializerRequest, String contents, String folderPath, String fileName) {
        try {
            //폴더 찾아가기
            String path = basePath + initializerRequest.getSpringName() + (folderPath.isEmpty() ? "/src/test/java/" : "/src/main/java/");

            String[] packagePath = initializerRequest.getSpringPackageName().split("[.]");
            for (String s : packagePath) {
                path = path + s + "/";
            }

            path += folderPath + "/";

            System.out.println("path = " + path);

            // 폴더 만들기
            File folder = new File(path);
            if (!folder.exists()) {
                folder.mkdirs();
            }

            if (!fileName.isEmpty()) {
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
            }

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

    public static void deletefolder(String path) {
        File folder = new File(path);
        try {
            if (folder.exists()) {
                File[] folder_list = folder.listFiles(); //파일리스트 얻어오기

                for (int i = 0; i < folder_list.length; i++) {
                    if (folder_list[i].isFile()) {
                        folder_list[i].delete();
                    } else {
                        deletefolder(folder_list[i].getPath()); //재귀함수호출
                    }
                    folder_list[i].delete();
                }
                folder.delete(); //폴더 삭제
            }
        } catch (Exception e) {
            e.getStackTrace();
        }
    }

    public static void addImportContents(boolean containList, boolean containRequest, boolean containResponse, boolean containDate, StringBuilder sb, String packageName) {
        // list, valid, request, response import 추가하기
        if (containList) {
            sb.append("import java.util.List;\n\n");
        }
        if (containRequest) {
            sb.append("import ").append(packageName).append(".request.*;\n");
        }
        if (containResponse) {
            sb.append("import ").append(packageName).append(".response.*;\n");
        }
        if (containDate) {
            sb.append("import java.util.LocalDateTime;\n");
        }
        sb.append("\n");
    }


}
