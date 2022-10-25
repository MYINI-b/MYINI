package com.ssafy.myini.apidocs.response;

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
}