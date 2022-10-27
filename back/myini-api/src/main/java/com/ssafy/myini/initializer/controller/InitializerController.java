package com.ssafy.myini.initializer.controller;

import com.ssafy.myini.initializer.request.InitializerRequest;
import com.ssafy.myini.initializer.response.InitializerPossibleResponse;
import com.ssafy.myini.initializer.service.InitializerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<Void> initializerStart(@PathVariable("projectid") Long projectId,
                                                 @RequestBody InitializerRequest initializerRequest){
        initializerService.initializerStart(projectId, initializerRequest);

        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
