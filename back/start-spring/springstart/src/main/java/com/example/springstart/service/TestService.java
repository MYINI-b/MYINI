package com.example.springstart.service;
import com.example.springstart.config.S3Uploader;
import lombok.RequiredArgsConstructor;

import org.apache.commons.io.FileUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.FileCopyUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItem;
import org.apache.commons.io.IOUtils;

import java.io.*;
import java.net.URI;
import java.net.URL;
import java.nio.channels.Channels;
import java.nio.channels.ReadableByteChannel;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import net.lingala.zip4j.ZipFile;

@Service
@RequiredArgsConstructor
public class TestService {
    private final S3Uploader s3Uploader;

    @Transactional
    public void initProject() {
        String filepath = "C:\\Users\\Kim\\Desktop\\자율프로젝트\\filetest\\";
        String type = "maven-project";
        String language = "java";
        String platformVersion = "2.2.0.RELEASE";
        String packaging = "jar";
        String jvmVersion = "1.8";
        String groupId = "com.example";
        String artifactId = "demo";
        String name = "firstProject";
        String description = "Demo%20project%20for%20Spring%20Boot";
        String packageName = "com.example.demo";
        List<String> dependencies = new ArrayList<>();

        String address = "https://start.spring.io/starter.zip?" +
                "type="+type+"&" +
                "language="+language+"&" +
                "platformVersion="+platformVersion+"&" +
                "packaging="+packaging+"&" +
                "jvmVersion="+jvmVersion+"&" +
                "groupId="+groupId+"&" +
                "artifactId="+artifactId+"&" +
                "name="+name+"&" +
                "description="+description+"&" +
                "packageName="+packageName+"&" +
                "dependencies=web";
        try {
//            URL url = new URL(address);
            URI url = URI.create(address);
////            File file = new File("C:/Users/Kim/Desktop/자율프로젝트/filetest", filename);
////            FileUtils.copyURLToFile(url,file);
//
//            ReadableByteChannel rbc = Channels.newChannel(url.openStream());
//            FileOutputStream fos = new FileOutputStream("C:\\Users\\Kim\\Desktop\\자율프로젝트\\filetest"); //다운받을 경로 설정
//            fos.getChannel().transferFrom(rbc, 0, Long.MAX_VALUE);  // 처음부터 끝까지 다운로드
//            fos.close();

            // 원격 파일 다운로드
            RestTemplate rt = new RestTemplate();
            ResponseEntity<byte[]> res = rt.getForEntity(url, byte[].class);
            byte[] buffer = res.getBody();

            // 로컬 서버에 저장
            Path target = Paths.get(filepath, name + ".zip");    // 파일 저장 경로

            FileCopyUtils.copy(buffer, target.toFile());

            File file = new File(filepath+name+".zip");
            ZipFile zipFile = new ZipFile(file);
            zipFile.extractAll(filepath+name);

//            FileItem fileItem = new DiskFileItem("please",
//                    Files.probeContentType(file.toPath()),
//                    false,
//                    file.getName(),
//                    (int)file.length(),
//                    file.getParentFile());

//            InputStream is = new FileInputStream(file);
//            OutputStream os = fileItem.getOutputStream();
//            IOUtils.copy(is,os);

        }catch (Exception e){
            System.out.println(e);
        }
    }

    @Transactional
    public void createDto() {
        String type = "maven-project";
        String language = "java";
        String platformVersion = "2.2.0.RELEASE";
        String packaging = "jar";
        String jvmVersion = "1.8";
        String groupId = "com.example";
        String artifactId = "demo";
        String name = "firstProject";
        String description = "Demo%20project%20for%20Spring%20Boot";
        String packageName = "com.example.demo";
        List<String> dependencies = new ArrayList<>();
        String filepath = "C:\\Users\\Kim\\Desktop\\자율프로젝트\\filetest\\"+name+"\\";
        String[] packagePath = packageName.split("[.]");


        String dto = "BoardResponse";
        String contents = "package "+ packageName + "." + "dto" + "." + dto +";\n" +
                "\n" +
                "import lombok.AllArgsConstructor;\n" +
                "import lombok.Data;\n" +
                "import lombok.NoArgsConstructor;\n" +
                "import javax.validation.constraints.NotBlank;\n" +
                "import javax.validation.constraints.NotNull;\n" +
                "import java.time.LocalDateTime;\n" +
                "\n" +
                "@Data\n" +
                "@NoArgsConstructor\n" +
                "@AllArgsConstructor\n" +
                "public class BoardResponse {\n" +
                "    Long boardId;\n" +
                "\n" +
                "    String title;\n" +
                "\n" +
                "    Long userId;\n" +
                "\n" +
                "    String userName;\n" +
                "\n" +
                "    LocalDateTime updatedAt;\n" +
                "\n" +
                "    public static BoardResponse response(Board board){\n" +
                "        return new BoardResponse(board.getId(), board.getTitle(),board.getUser().getId(), board.getUser().getName(), board.getUpdatedAt());\n" +
                "    }\n" +
                "}\n";

        try {
            String dtoPath = filepath+"src\\main\\java\\";
            for (String s : packagePath) {
                dtoPath = dtoPath + s + "\\";
            }
            dtoPath = dtoPath+"dto\\";
            File folder = new File(dtoPath);
            if (!folder.exists()) {
                folder.mkdir();
            }
            File file = new File(dtoPath+dto+".java");
            if (!file.exists()) {
                folder.createNewFile();
            }

            FileWriter fw = new FileWriter(file);
            BufferedWriter writer = new BufferedWriter(fw);
            writer.write(contents);
            writer.close();

        }catch (Exception e){

        }



    }
}
