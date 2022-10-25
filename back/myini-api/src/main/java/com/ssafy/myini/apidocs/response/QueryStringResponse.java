package com.ssafy.myini.apidocs.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QueryStringResponse {
    private Long queryStringId;
    private String queryStringKey;
    private String queryStringType;
}