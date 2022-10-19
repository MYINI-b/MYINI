package com.example.springstart.controller;

import com.example.springstart.service.TestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/test")
public class TestController {
    private final TestService testService;

    @GetMapping()
    public ResponseEntity<?> initProject() {
        testService.initProject();
        return ResponseEntity.status(HttpStatus.OK).body("success");
    }
}
