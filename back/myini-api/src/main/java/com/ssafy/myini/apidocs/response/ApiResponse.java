package com.ssafy.myini.apidocs.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponse {
    private Long apiId;
    private int apiItemId;
    private String apiName;
    private String apiUrl;
    private String apiMethod;
    private String apiCode;
}