package com.ssafy.myini.initializer.controller;

import com.ssafy.myini.initializer.request.InitializerRequest;
import com.ssafy.myini.initializer.response.InitializerPossibleResponse;
import com.ssafy.myini.initializer.response.InitializerStartResponse;
import com.ssafy.myini.initializer.response.PreviewResponse;
import com.ssafy.myini.initializer.service.InitializerService;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.ByteArrayOutputStream;
import java.util.List;

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
    public ResponseEntity<byte[]> initializerStart(@PathVariable("projectid") Long projectId,
                                                                @Valid InitializerRequest initializerRequest) {
        InitializerStartResponse resp = initializerService.initializerStart(projectId, initializerRequest);

        return ResponseEntity.ok()
                .headers(resp.getHeaders())
                .contentLength(resp.getLength())
                .contentType(MediaType.parseMediaType("application/octet-stream"))
                .body(resp.getResource());
    }

    @DeleteMapping("/{projectid}")
    public ResponseEntity<Void> deleteZipfile(@Valid String fileName) {
        initializerService.deleteZipfile(fileName);
        return ResponseEntity.status(HttpStatus.OK).build();
    }


    @GetMapping("/{projectid}/previews")
    public ResponseEntity<List<PreviewResponse>> initializerPreview(@PathVariable("projectid") Long projectId,
                                                                    @Valid InitializerRequest initializerRequest) {
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

    @GetMapping("/settings")
    public ResponseEntity<JSONObject> initializerSettings() {
        JSONObject body = initializerService.initializerSettings();
        return ResponseEntity.ok(body);
    }
}
