package com.ssafy.myini.apidocs.response;

import com.ssafy.myini.apidocs.domain.Api;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ApiResponse {
    private Long apiId;
    private String apiName;
    private String apiDescription;
    private String apiUrl;
    private String apiMethod;
    private String apiCode;
    private String apiMethodName;

    public static ApiResponse from(Api api) {
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.apiId = api.getApiId();
        apiResponse.apiName = api.getApiName();
        apiResponse.apiDescription = api.getApiDescription();
        apiResponse.apiUrl = api.getApiUrl();
        apiResponse.apiMethod = String.valueOf(api.getApiMethod());
        apiResponse.apiCode = String.valueOf(api.getApiCode());
        apiResponse.apiMethodName = api.getApiMethodName();
        return apiResponse;
    }
}