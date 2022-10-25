package com.ssafy.myini.apidocs.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateApiRequest {
    private int apiItemId;
    private String apiName;
    private String apiUrl;
    private String apiMethod;
    private String apiCode;
    private String apiMethodName;
}