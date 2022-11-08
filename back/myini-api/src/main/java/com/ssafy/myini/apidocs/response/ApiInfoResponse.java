package com.ssafy.myini.apidocs.response;

import com.ssafy.myini.apidocs.domain.Api;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ApiInfoResponse {
    private ApiResponse apiResponse;

    private List<PathVariableResponse> pathVariableResponses;

    private List<QueryStringResponse> queryStringResponses;

    private List<DtoResponse> dtoResponses;
    
    private List<String> pathListResponse;


    public static ApiInfoResponse from(Api api, List<String> pathListResponse){
        ApiInfoResponse apiInfoResponse = new ApiInfoResponse();
        apiInfoResponse.apiResponse = ApiResponse.from(api);
        apiInfoResponse.pathVariableResponses = api.getPathVariables().stream()
                .map(PathVariableResponse::from)
                .collect(Collectors.toList());
        apiInfoResponse.queryStringResponses = api.getQueryStrings().stream()
                .map(QueryStringResponse::from)
                .collect(Collectors.toList());
        apiInfoResponse.dtoResponses = api.getDtos().stream()
                .map(DtoResponse::from)
                .collect(Collectors.toList());
        apiInfoResponse.pathListResponse = pathListResponse;

        return apiInfoResponse;
    }

    public static ApiInfoResponse from(Api api){
        ApiInfoResponse apiInfoResponse = new ApiInfoResponse();
        apiInfoResponse.apiResponse = ApiResponse.from(api);
        apiInfoResponse.pathVariableResponses = api.getPathVariables().stream()
                .map(PathVariableResponse::from)
                .collect(Collectors.toList());
        apiInfoResponse.queryStringResponses = api.getQueryStrings().stream()
                .map(QueryStringResponse::from)
                .collect(Collectors.toList());
        apiInfoResponse.dtoResponses = api.getDtos().stream()
                .map(DtoResponse::from)
                .collect(Collectors.toList());

        return apiInfoResponse;
    }
}