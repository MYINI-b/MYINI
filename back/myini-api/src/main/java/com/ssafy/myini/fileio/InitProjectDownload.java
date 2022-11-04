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
    public static void initProject(InitializerRequest initializerRequest){
        String address = "https://start.spring.io/starter.zip?" +
                "type="+initializerRequest.getSpring_type()+"&" +
                "language="+initializerRequest.getSpring_language()+"&" +
                "platformVersion="+initializerRequest.getSpring_platform_version()+"&" +
                "packaging="+initializerRequest.getSpring_packaging()+"&" +
                "jvmVersion="+initializerRequest.getSpring_jvm_version()+"&" +
                "groupId="+initializerRequest.getSpring_group_id()+"&" +
                "artifactId="+initializerRequest.getSpring_artifact_id()+"&" +
                "name="+initializerRequest.getSpring_name()+"&" +
                "description="+initializerRequest.getSpring_description()+"&" +
                "packageName="+initializerRequest.getSpring_package_name();
        if (initializerRequest.getSpring_dependency_name().size() != 0){
            address += "&dependencies=";
            for (int i=0;i<initializerRequest.getSpring_dependency_name().size();i++){
                if (i != initializerRequest.getSpring_dependency_name().size()-1){
                    address = address + initializerRequest.getSpring_dependency_name().get(i) + ",";
                }else {
                    address = address + initializerRequest.getSpring_dependency_name().get(i);
                }
            }
        }
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
            File folder = new File(initializerRequest.getSpring_base_path());
            if (!folder.exists()) {
                folder.mkdirs();
            }
            Path target = Paths.get(initializerRequest.getSpring_base_path(), initializerRequest.getSpring_name() + ".zip");    // 파일 저장 경로

            FileCopyUtils.copy(buffer, target.toFile());



            File file = new File(initializerRequest.getSpring_base_path()+initializerRequest.getSpring_name()+".zip");
            ZipFile zipFile = new ZipFile(file);
            zipFile.extractAll(initializerRequest.getSpring_base_path()+initializerRequest.getSpring_name());
            fileDelete(initializerRequest);
        }catch (Exception e){
            System.out.println("e = " + e);
        }
    }

    public static void fileDelete(InitializerRequest initializerRequest) throws Exception {
        String path = initializerRequest.getSpring_base_path()+initializerRequest.getSpring_name();

        File deleteZip = new File(path+".zip");
        if( deleteZip.exists() ){
            deleteZip.delete();
        }

        File deleteFolder = new File(path);
        if(deleteFolder.exists()){
            File[] deleteFolderList = deleteFolder.listFiles();

            for (int j = 0; j < deleteFolderList.length; j++) {
                deleteFolderList[j].delete();
            }

            if(deleteFolderList.length == 0 && deleteFolder.isDirectory()){
                deleteFolder.delete();
            }
        }

    }
}
