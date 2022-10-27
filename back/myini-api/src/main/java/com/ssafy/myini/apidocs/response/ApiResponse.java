package com.ssafy.myini.apidocs.response;

import com.querydsl.core.annotations.QueryProjection;
import com.ssafy.myini.apidocs.domain.Api;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ApiResponse {
    private Long apiId;
    private int apiItemId;
    private String apiName;
    private String apiUrl;
    private String apiMethod;
    private String apiCode;

    public static ApiResponse from(Api api){
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.apiId = api.getApiId();
        apiResponse.apiItemId = api.getApiItemId();
        apiResponse.apiName = api.getApiName();
        apiResponse.apiUrl = api.getApiUrl();
        apiResponse.apiMethod = String.valueOf(api.getApiMethod());
        apiResponse.apiCode = String.valueOf(api.getApiCode());
        return apiResponse;
    }
}