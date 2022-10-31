package com.ssafy.myini.apidocs.response;

import com.querydsl.core.annotations.QueryProjection;
import com.ssafy.myini.apidocs.domain.ApiController;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ApiControllerResponse {
    private Long apiControllerId;
    private String apiControllerName;
    private String apiControllerBaseUrl;
    private String apiControllerDescription;
    private List<ApiResponse> apiResponses;

    public static ApiControllerResponse from(ApiController apiController){
        ApiControllerResponse apiControllerResponse = new ApiControllerResponse();
        apiControllerResponse.apiControllerId = apiController.getApiControllerId();
        apiControllerResponse.apiControllerName = apiController.getApiControllerName();
        apiControllerResponse.apiControllerBaseUrl = apiController.getApiControllerBaseUrl();
        apiControllerResponse.apiControllerDescription = apiController.getApiControllerDescription();
        if(apiController.getApis() != null){
            apiControllerResponse.apiResponses = apiController.getApis().stream()
                    .map(ApiResponse::from)
                    .collect(Collectors.toList());
        }
        return apiControllerResponse;
    }
}
