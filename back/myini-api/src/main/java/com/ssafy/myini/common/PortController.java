package com.ssafy.myini.common;

import lombok.RequiredArgsConstructor;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class PortController {

    private final Environment env;

    @GetMapping("/api/port")
    public String port() {
        return env.getProperty("local.server.port");
    }
}
