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

        try {
            //이미 만들어진게 있다면 삭제
            FileUtil.deletefolder(FileUtil.basePath + initializerRequest.getSpringName() + "/");

            URI url = URI.create(address);

            // 원격 파일 다운로드
            RestTemplate rt = new RestTemplate();
            ResponseEntity<byte[]> res = rt.getForEntity(url, byte[].class);
            byte[] buffer = res.getBody();
            // 로컬 서버에 저장
            File folder = new File(FileUtil.basePath);
            if (!folder.exists()) {
                folder.mkdirs();
            }
            Path target = Paths.get(FileUtil.basePath, initializerRequest.getSpringName() + ".zip");    // 파일 저장 경로

            FileCopyUtils.copy(buffer, target.toFile());


            File file = new File(FileUtil.basePath + initializerRequest.getSpringName() + ".zip");
            ZipFile zipFile = new ZipFile(file);
            zipFile.extractAll(FileUtil.basePath + initializerRequest.getSpringName());
        } catch (Exception e) {
            System.out.println("e = " + e);
        }
    }
}
