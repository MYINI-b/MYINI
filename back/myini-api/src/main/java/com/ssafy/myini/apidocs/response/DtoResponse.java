package com.ssafy.myini.apidocs.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DtoResponse {
    private Long dtoId;
    private String dtoName;
    private String dtoType;
    List<DtoItemResponse> dtoItemResponses;
}