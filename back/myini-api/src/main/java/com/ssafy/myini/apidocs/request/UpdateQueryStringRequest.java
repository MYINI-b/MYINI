package com.ssafy.myini.apidocs.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateQueryStringRequest {
    private String queryStringKey;
    private String queryStringType;
}
