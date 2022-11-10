package com.ssafy.myini.apidocs.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateDtoRequest {
    @NotBlank(message = "DTO 이름은 필수값입니다.")
    private String dtoName;
    private String dtoType;
    @Pattern(regexp = "^[YN\\s]*$", message = "Y, N만 입력이 가능합니다.")
    private String dtoIsList;
}