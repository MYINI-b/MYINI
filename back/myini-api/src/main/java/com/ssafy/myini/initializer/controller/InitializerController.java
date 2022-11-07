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
import org.springframework.web.util.UriUtils;

import javax.validation.Valid;
import java.io.ByteArrayOutputStream;
import java.net.MalformedURLException;
import java.nio.charset.StandardCharsets;
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
                                                                @Valid InitializerRequest initializerRequest
    ) throws IOException {
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
