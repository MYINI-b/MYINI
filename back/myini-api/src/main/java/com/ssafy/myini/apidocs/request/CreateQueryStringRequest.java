package com.ssafy.myini.apidocs.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateQueryStringRequest {
    private String queryStringKey;
    private String queryStringType;

}