package com.ssafy.myini.apidocs.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateApiControllerRequest {
    @NotBlank(message = "api controller 이름은 필수값입니다.")
    private String apiControllerName;
    private String apiControllerBaseUrl;
    @Size(max = 255,message="255자미만으로 작성해야 합니다.")
    private String apiControllerDescription;
}