package com.ssafy.myini.initializer.controller;

import com.ssafy.myini.initializer.request.InitializerRequest;
import com.ssafy.myini.initializer.response.InitializerPossibleResponse;
import com.ssafy.myini.initializer.response.PreviewResponse;
import com.ssafy.myini.initializer.service.InitializerService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriUtils;

import java.io.ByteArrayOutputStream;
import java.net.MalformedURLException;
import java.nio.charset.StandardCharsets;
import java.util.List;

@RequestMapping("/api/initializers")
@RestController
@RequiredArgsConstructor
public class InitializerController {
    private final InitializerService initializerService;

    @GetMapping("/{projectid}/ispossible")
    public ResponseEntity<InitializerPossibleResponse> initializerIsPossible(@PathVariable("projectid") Long projectId){
        InitializerPossibleResponse body = initializerService.initializerIsPossible(projectId);

        return ResponseEntity.ok().body(body);
    }

    @PostMapping("/{projectid}")
    public ResponseEntity<Resource> initializerStart(@PathVariable("projectid") Long projectId,
                                                 @RequestBody InitializerRequest initializerRequest) throws MalformedURLException {

        UrlResource urlResource = initializerService.initializerStart(projectId, initializerRequest);
        String encodedUploadFileName = UriUtils.encode("test", StandardCharsets.UTF_8);
        String contentDisposition = "attachment; filename=\"" + encodedUploadFileName + "\"";

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,contentDisposition)
                .body(urlResource);
    }

    @PostMapping("/{projectid}/previews")
    public ResponseEntity<List<PreviewResponse>> initializerPreview(@PathVariable("projectid") Long projectId,
                                                 @RequestBody InitializerRequest initializerRequest){
        List<PreviewResponse> body = initializerService.initializerPreview(projectId, initializerRequest);

        return ResponseEntity.ok().body(body);
    }

    @GetMapping("/downloads")
    public ResponseEntity<byte[]> myIniDownload(){
        ByteArrayOutputStream byteArrayOutputStream = initializerService.myIniDownload();

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_OCTET_STREAM) //.APPLICATION_OCTET_STREAM
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + "front Setup 0.1.0.exe" + "\"")
                .body(byteArrayOutputStream.toByteArray());
    }
}
