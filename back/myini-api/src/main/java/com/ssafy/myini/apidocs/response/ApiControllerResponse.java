package com.ssafy.myini.apidocs.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApiControllerResponse {
    private Long apiControllerId;
    private String apiControllerName;
    private String apiControllerBaseUrl;
    private String apiControllerDescription;
    private List<ApiResponse> apiResponses;
}
