package com.ssafy.myini.initializer.controller;

import com.ssafy.myini.initializer.request.InitializerRequest;
import com.ssafy.myini.initializer.response.InitializerPossibleResponse;
import com.ssafy.myini.initializer.response.InitializerStartResponse;
import com.ssafy.myini.initializer.response.PreviewResponse;
import com.ssafy.myini.initializer.service.InitializerService;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
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

    //이니셜라이저 가능한지 확인
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

    //myini 다운로드
    @GetMapping("/downloads")
    public ResponseEntity<byte[]> myIniDownload() {
        ByteArrayOutputStream byteArrayOutputStream = initializerService.myIniDownload();

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_OCTET_STREAM) //.APPLICATION_OCTET_STREAM
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + "myini 0.1.0.exe" + "\"")
                .body(byteArrayOutputStream.toByteArray());
    }

    //이니셜라이징 세팅값 조회
    @GetMapping("/settings")
    public ResponseEntity<JSONObject> initializerSettings() {
        JSONObject body = initializerService.initializerSettings();
        return ResponseEntity.ok(body);
    }

    @PatchMapping("/app")
    public String initializerApp(@RequestParam("flag") String flag) {
        String body = initializerService.initializerApp(flag);
        return body;
    }

    @GetMapping("/app")
    public String initializerApp2() {
        String body = initializerService.initializerApp2();
        return body;
    }

}
