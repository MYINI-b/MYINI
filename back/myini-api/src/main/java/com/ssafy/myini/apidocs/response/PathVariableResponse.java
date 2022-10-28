package com.ssafy.myini.apidocs.response;

import com.ssafy.myini.apidocs.domain.PathVariable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PathVariableResponse {
    private Long pathVariableId;
    private String pathVariableKey;
    private String pathVariableType;

    public static PathVariableResponse from(PathVariable pathVariable){
        PathVariableResponse pathVariableResponse = new PathVariableResponse();
        pathVariableResponse.pathVariableId = pathVariable.getPathVariableId();
        pathVariableResponse.pathVariableKey = pathVariable.getPathVariableKey();
        pathVariableResponse.pathVariableType = pathVariable.getPathVariableType();
        return pathVariableResponse;
    }
}