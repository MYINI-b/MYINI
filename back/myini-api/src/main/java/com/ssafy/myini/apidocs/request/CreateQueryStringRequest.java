package com.ssafy.myini.apidocs.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateQueryStringRequest {
    @NotBlank(message = "Querystring Key는 필수값입니다.")
    private String queryStringKey;
    private String queryStringType;

}