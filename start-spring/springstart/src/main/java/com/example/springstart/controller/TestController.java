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

    @GetMapping("/init")
    public ResponseEntity<?> initProject() {
        testService.initProject();
        return ResponseEntity.status(HttpStatus.OK).body("project init success");
    }

    @GetMapping("/dto")
    public ResponseEntity<?> createDto(){
        testService.createDto();
        return ResponseEntity.status(HttpStatus.OK).body("dto create success");
    }
}
