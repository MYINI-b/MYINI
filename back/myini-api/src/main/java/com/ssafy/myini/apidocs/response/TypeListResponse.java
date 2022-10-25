package com.ssafy.myini.apidocs.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TypeListResponse {
    private List<PrimitiveTypeResponse> primitiveTypeResponses;
    private List<ClassTypeResponse> classTypeResponses;
}