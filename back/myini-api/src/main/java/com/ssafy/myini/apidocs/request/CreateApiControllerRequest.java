package com.ssafy.myini.apidocs.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateApiControllerRequest {
    private String apiControllerName;
    private String apiControllerBaseUrl;
    private String apiControllerDescription;
}