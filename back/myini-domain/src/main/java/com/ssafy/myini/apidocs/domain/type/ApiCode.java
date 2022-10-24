package com.ssafy.myini.apidocs.domain.type;

public enum ApiCode {
    OK(200), CREATED(201);
    private int value;
    private ApiCode(int value){
        this.value = value;
    }
}
