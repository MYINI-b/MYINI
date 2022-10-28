package com.ssafy.myini.apidocs.response;

import com.ssafy.myini.apidocs.domain.Dto;
import com.ssafy.myini.apidocs.domain.Primitive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TypeListResponse {
    private List<PrimitiveTypeResponse> primitiveTypeResponses;
    private List<ClassTypeResponse> classTypeResponses;

    public static TypeListResponse from(List<Primitive> primitives, List<Dto> dtos){
        TypeListResponse typeListResponse = new TypeListResponse();
        typeListResponse.primitiveTypeResponses = primitives.stream()
                .map(PrimitiveTypeResponse::from)
                .collect(Collectors.toList());
        typeListResponse.classTypeResponses = dtos.stream()
                .map(ClassTypeResponse::from)
                .collect(Collectors.toList());
        return typeListResponse;
    }
}