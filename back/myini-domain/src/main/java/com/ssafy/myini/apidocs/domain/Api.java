package com.ssafy.myini.apidocs.domain;

import com.ssafy.myini.apidocs.domain.type.ApiCode;
import com.ssafy.myini.apidocs.domain.type.ApiMethod;
import com.ssafy.myini.common.BaseEntity;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
public class Api extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "api_id")
    private Long apiId;

    private String apiName;

    private String apiDescription;
    private String apiUrl;

    @Enumerated(EnumType.STRING)
    private ApiMethod apiMethod;

    @Enumerated(EnumType.STRING)
    private ApiCode apiCode;

    @Column(nullable = false)
    private String apiMethodName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "api_controller_id")
    private ApiController apiController;

    @OneToMany(mappedBy = "api", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<PathVariable> pathVariables = new ArrayList<>();

    @OneToMany(mappedBy = "api", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<QueryString> queryStrings = new ArrayList<>();

    @OneToMany(mappedBy = "api", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Dto> dtos = new ArrayList<>();

    public static Api createApi(String apiName,String apiDescription, String apiUrl, String apiMethod, String apiCode, String apiMethodName, ApiController apiController){
        Api api = new Api();
        api.apiName = apiName;
        api.apiDescription = apiDescription;
        api.apiUrl = apiUrl;
        api.apiMethod = ApiMethod.valueOf(apiMethod);
        api.apiCode = ApiCode.valueOf(apiCode);
        api.apiMethodName = apiMethodName;
        api.apiController = apiController;
        return api;
    }

    public void updateApi(String apiName, String apiDescription, String apiUrl, String apiMethod, String apiCode, String apiMethodName){
        this.apiName = apiName;
        this.apiDescription = apiDescription;
        this.apiUrl = apiUrl;
        this.apiMethod = ApiMethod.valueOf(apiMethod);
        this.apiCode = ApiCode.valueOf(apiCode);
        this.apiMethodName = apiMethodName;
    }
}
