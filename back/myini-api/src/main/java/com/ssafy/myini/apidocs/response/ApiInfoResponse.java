package com.ssafy.myini.apidocs.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ApiInfoResponse {
    private ApiResponse apiResponse;

    private List<PathVariableResponse> pathVariableResponses;

    private List<QueryStringResponse> queryStringResponses;

    private List<DtoResponse> dtoResponses;

}