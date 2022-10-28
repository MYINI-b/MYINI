package com.ssafy.myini.apidocs.response;

import com.ssafy.myini.apidocs.domain.QueryString;
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
    public static QueryStringResponse from(QueryString queryString){
        QueryStringResponse queryStringResponse = new QueryStringResponse();
        queryStringResponse.queryStringId = queryString.getQueryStringId();
        queryStringResponse.queryStringKey = queryString.getQueryStringKey();
        queryStringResponse.queryStringType = queryString.getQueryStringType();
        return queryStringResponse;
    }
}