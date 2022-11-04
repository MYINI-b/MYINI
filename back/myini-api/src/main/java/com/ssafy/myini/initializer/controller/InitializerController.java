package com.ssafy.myini.initializer.controller;

import com.amazonaws.auth.policy.Resource;
import com.ssafy.myini.initializer.request.InitializerRequest;
import com.ssafy.myini.initializer.response.InitializerPossibleResponse;
import com.ssafy.myini.initializer.response.PreviewResponse;
import com.ssafy.myini.initializer.service.InitializerService;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import net.lingala.zip4j.ZipFile;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.ByteArrayOutputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RequestMapping("/api/initializers")
@RestController
@RequiredArgsConstructor
public class InitializerController {
    private final InitializerService initializerService;

    @GetMapping("/{projectid}/ispossible")
    public ResponseEntity<InitializerPossibleResponse> initializerIsPossible(@PathVariable("projectid") Long projectId) {
        InitializerPossibleResponse body = initializerService.initializerIsPossible(projectId);

        return ResponseEntity.ok().body(body);
    }

    @GetMapping("/{projectid}")
    public ResponseEntity<InputStreamResource> initializerStart(@PathVariable("projectid") Long projectId,
//                                                                @RequestParam(name = "spring_base_path", defaultValue = "C:/Users/multicampus/Desktop/test/") String spring_base_path,
//                                                                @RequestParam(name = "spring_type", defaultValue = "maven-project") String spring_type,
//                                                                @RequestParam(name = "spring_language", defaultValue = "java") String spring_language,
//                                                                @RequestParam(name = "spring_platform_version", defaultValue = "2.2.0.RELEASE") String spring_platform_version,
//                                                                @RequestParam(name = "spring_packaging", defaultValue = "jar") String spring_packaging,
//                                                                @RequestParam(name = "spring_jvm_version", defaultValue = "1.8") String spring_jvm_version,
//                                                                @RequestParam(name = "spring_group_id", defaultValue = "com.example") String spring_group_id,
//                                                                @RequestParam(name = "spring_artifact_id", defaultValue = "demo") String spring_artifact_id,
//                                                                @RequestParam(name = "spring_name", defaultValue = "demo") String spring_name,
//                                                                @RequestParam(name = "spring_description", defaultValue = "Demo%20project%20for%20Spring%20Boot") String spring_description,
//                                                                @RequestParam(name = "spring_package_name", defaultValue = "com.example.demo") String spring_package_name,
//                                                                @RequestParam(name = "spring_dependency_name", defaultValue = "web,jpa,lombok,devtools") String spring_dependency_name
                                                                @Valid InitializerRequest initializerRequest
    ) throws IOException {
//        List<String> spring_dependency_name_list = Arrays.stream(spring_dependency_name.split(",")).collect(Collectors.toList());
//        for(String s : spring_dependency_name_list){
//            System.out.println("###" + s);
//        }
//        InitializerRequest initializerRequest = new InitializerRequest(spring_base_path,
//                spring_type,
//                spring_language,
//                spring_platform_version,
//                spring_packaging,
//                spring_jvm_version,
//                spring_group_id,
//                spring_artifact_id,
//                spring_name,
//                spring_description,
//                spring_package_name,
//                spring_dependency_name_list);
        ZipFile body = initializerService.initializerStart(projectId, initializerRequest);

        InputStreamResource resource3 = new InputStreamResource(new FileInputStream(body.getFile()));

        HttpHeaders header = new HttpHeaders();

        header.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + body.getFile().getName());
        header.add("Cache-Control", "no-cache, no-store, must-revalidate");
        header.add("Pragma", "no-cache");
        header.add("Expires", "0");
        return ResponseEntity.ok()
                .headers(header)
                .contentLength(body.getFile().length())
                .contentType(MediaType.parseMediaType("application/octet-stream"))
                .body(resource3);
    }

    @PostMapping("/{projectid}/previews")
    public ResponseEntity<List<PreviewResponse>> initializerPreview(@PathVariable("projectid") Long projectId,
                                                                    @RequestBody InitializerRequest initializerRequest) {
        List<PreviewResponse> body = initializerService.initializerPreview(projectId, initializerRequest);

        return ResponseEntity.ok().body(body);
    }

    @GetMapping("/downloads")
    public ResponseEntity<byte[]> myIniDownload() {
        ByteArrayOutputStream byteArrayOutputStream = initializerService.myIniDownload();

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_OCTET_STREAM) //.APPLICATION_OCTET_STREAM
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + "front Setup 0.1.0.exe" + "\"")
                .body(byteArrayOutputStream.toByteArray());
    }
}
