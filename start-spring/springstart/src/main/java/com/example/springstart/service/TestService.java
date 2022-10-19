package com.example.springstart.service;
import com.example.springstart.config.S3Uploader;
import lombok.RequiredArgsConstructor;

import org.apache.commons.io.FileUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItem;
import org.apache.commons.io.IOUtils;

import java.io.*;
import java.net.URL;
import java.nio.file.Files;

@Service
@RequiredArgsConstructor
public class TestService {
    private final S3Uploader s3Uploader;

    @Transactional
    public void initProject() {
        String address = "https://start.spring.io/starter.zip?type=maven-project&language=java&platformVersion=2.2.0.RELEASE&packaging=jar&jvmVersion=1.8&groupId=com.example&artifactId=demo&name=demo&description=Demo%20project%20for%20Spring%20Boot&packageName=com.example.demo&dependencies=web";
        try {
            URL url = new URL(address);
            File file = new File("please.zip");
            FileUtils.copyURLToFile(url,file);

            FileItem fileItem = new DiskFileItem("please",
                    Files.probeContentType(file.toPath()),
                    false,
                    file.getName(),
                    (int)file.length(),
                    file.getParentFile());

            InputStream is = new FileInputStream(file);
            OutputStream os = fileItem.getOutputStream();
            IOUtils.copy(is,os);

            MultipartFile multipartFile = new CommonsMultipartFile(fileItem);
//            ReadableByteChannel rbc = Channels.newChannel(url.openStream());
//            FileOutputStream fos = new FileOutputStream("please.zip");
//            fos.getChannel().transferFrom(rbc, 0, Long.MAX_VALUE);  // 처음부터 끝까지 다운로드
//            fos.close();
            s3Uploader.upload(file,"Spring");
//            s3Uploader.upload(multipartFile,"please.zip");
        }catch (Exception e){
            System.out.println(e);
        }



    }
}
