package com.ssafy.myini.fileio;

import com.ssafy.myini.initializer.request.InitializerRequest;
import net.lingala.zip4j.ZipFile;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.client.RestTemplate;

import java.io.File;
import java.net.URI;
import java.nio.file.Path;
import java.nio.file.Paths;

public class InitProjectDownload {
    public static void initProject(InitializerRequest initializerRequest) {
        String address = "https://start.spring.io/starter.zip?" +
                "type=" + initializerRequest.getSpringType() + "&" +
                "language=" + initializerRequest.getSpringLanguage() + "&" +
                "platformVersion=" + initializerRequest.getSpringPlatformVersion() + "&" +
                "packaging=" + initializerRequest.getSpringPackaging() + "&" +
                "jvmVersion=" + initializerRequest.getSpringJvmVersion() + "&" +
                "groupId=" + initializerRequest.getSpringGroupId() + "&" +
                "artifactId=" + initializerRequest.getSpringArtifactId() + "&" +
                "name=" + initializerRequest.getSpringName() + "&" +
                "description=" + initializerRequest.getSpringDescription().replaceAll(" ", "+") + "&" +
                "packageName=" + initializerRequest.getSpringPackageName() + "&" +
                "dependencies=" + initializerRequest.getSpringDependencyName();
        System.out.println("address = " + address);
//        System.out.println("initializerRequest = " + initializerRequest.getSpring_name());
//        if (initializerRequest.getSpring_dependency_name().size() != 0){
//            address += "&dependencies=";
//            for (int i=0;i<initializerRequest.getSpring_dependency_name().size();i++){
//                if (i != initializerRequest.getSpring_dependency_name().size()-1){
//                    address = address + initializerRequest.getSpring_dependency_name().get(i) + ",";
//                }else {
//                    address = address + initializerRequest.getSpring_dependency_name().get(i);
//                }
//            }
//        }
        try {
            //이미 만들어진게 있다면 삭제
            fileDelete(initializerRequest);

            URI url = URI.create(address);

            // 원격 파일 다운로드
            RestTemplate rt = new RestTemplate();
            ResponseEntity<byte[]> res = rt.getForEntity(url, byte[].class);
            byte[] buffer = res.getBody();
//            System.out.println(initializerRequest.getSpring_base_path()+initializerRequest.getSpring_name()+".zip");
            // 로컬 서버에 저장
            System.out.println("initializerRequest = " + initializerRequest.getSpringBasePath());
            File folder = new File(initializerRequest.getSpringBasePath());
            if (!folder.exists()) {
                folder.mkdirs();
            }
            Path target = Paths.get(initializerRequest.getSpringBasePath(), initializerRequest.getSpringName() + ".zip");    // 파일 저장 경로

            FileCopyUtils.copy(buffer, target.toFile());


            File file = new File(initializerRequest.getSpringBasePath() + initializerRequest.getSpringName() + ".zip");
            ZipFile zipFile = new ZipFile(file);
            zipFile.extractAll(initializerRequest.getSpringBasePath() + initializerRequest.getSpringName());
        } catch (Exception e) {
            System.out.println("e = " + e);
        }
    }

    private static void fileDelete(InitializerRequest initializerRequest) throws Exception {
        String path = initializerRequest.getSpringBasePath() + initializerRequest.getSpringName();

        File deleteZip = new File(path + ".zip");
        if (deleteZip.exists()) {
            deleteZip.delete();
        }

        File deleteFolder = new File(path);
        if (deleteFolder.exists()) {
            File[] deleteFolderList = deleteFolder.listFiles();

            for (int j = 0; j < deleteFolderList.length; j++) {
                deleteFolderList[j].delete();
            }

            if (deleteFolderList.length == 0 && deleteFolder.isDirectory()) {
                deleteFolder.delete();
            }
        }
    }
}
