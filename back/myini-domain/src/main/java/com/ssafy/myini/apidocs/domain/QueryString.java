package com.ssafy.myini.apidocs.domain;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
public class QueryString {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "query_string_id")
    private Long queryStringId;

    private String queryStringKey;

    private String queryStringType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "api_id")
    private Api api;

    public static QueryString createQueryString(String queryStringKey, String queryStringType, Api api){
        QueryString queryString = new QueryString();
        queryString.queryStringKey = queryStringKey;
        queryString.queryStringType = queryStringType;
        queryString.api = api;
        return queryString;
    }

    public void updateQueryString(String queryStringKey, String queryStringType){
        this.queryStringKey = queryStringKey;
        this.queryStringType = queryStringType;
    }
}
