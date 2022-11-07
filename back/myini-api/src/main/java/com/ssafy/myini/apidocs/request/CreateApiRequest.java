package com.ssafy.myini.apidocs.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.URL;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateApiRequest {
    @NotBlank(message = "api 이름은 필수값입니다.")
    private String apiName;
    private String apiUrl;
    private String apiMethod;
    private String apiCode;
    @NotBlank(message = "api method 이름은 필수값입니다.")
    private String apiMethodName;
}