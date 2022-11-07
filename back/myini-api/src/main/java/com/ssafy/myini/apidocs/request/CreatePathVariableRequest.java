package com.ssafy.myini.apidocs.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreatePathVariableRequest {
    @NotBlank(message = "Pathvariable Key는 필수값입니다.")
    private String pathVariableKey;
    private String pathVariableType;
}