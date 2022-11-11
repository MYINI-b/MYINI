package com.ssafy.myini.apidocs.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateApiRequest {
    private String apiName;
    private String apiDescription;
    private String apiUrl;
    private String apiMethod;
    private String apiCode;
    private String apiMethodName;

    private List<UpdateApiDtoRequest> updateApiDtoRequest;
}