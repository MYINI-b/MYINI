package com.ssafy.myini.initializer.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class InitializerStartResponse {
    private HttpHeaders headers;
    private long length;
    private InputStreamResource resource;
}
