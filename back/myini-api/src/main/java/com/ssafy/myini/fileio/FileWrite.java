package com.ssafy.myini.fileio;

import com.ssafy.myini.apidocs.response.ProjectInfoListResponse;
import com.ssafy.myini.initializer.request.InitializerRequest;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;

public class FileWrite {

    public static void fileWrite(ProjectInfoListResponse projectInfoListResponse, InitializerRequest initializerRequest, String contents, String folderPath, String fileName) {
        try {
            //폴더 찾아가기
            String path = initializerRequest.getSpring_base_path() + "\\" + initializerRequest.getSpring_name() + "\\src\\main\\java\\";

            String[] packagePath = initializerRequest.getSpring_package_name().split("[.]");
            for (String s : packagePath) {
                path = path + s + "\\";
            }

            path += folderPath + "\\";

            // controller 폴더 만들기
            File folder = new File(path);
            if (!folder.exists()) {
                folder.mkdir();
            }

            // controller 파일 만들기
            File file = new File(path + projectInfoListResponse.getApiControllerName() + fileName + ".java");
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
}
