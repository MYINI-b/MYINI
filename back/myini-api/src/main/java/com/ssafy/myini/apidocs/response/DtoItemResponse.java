package com.ssafy.myini.apidocs.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DtoItemResponse {
    private Long dtoItemId;
    private String dtoItemName;
    private Long dtoClassType;
    private Long dtoPrimitiveType;
    private String dtoIsList;
}