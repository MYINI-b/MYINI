package com.ssafy.myini.apidocs.response;

import com.ssafy.myini.apidocs.domain.Primitive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PrimitiveTypeResponse {
    private Long primitiveId;
    private String primitiveName;

    public static PrimitiveTypeResponse from(Primitive primitive){
        PrimitiveTypeResponse primitiveTypeResponse = new PrimitiveTypeResponse();
        primitiveTypeResponse.primitiveId = primitive.getPrimitiveId();
        primitiveTypeResponse.primitiveName = primitive.getPrimitiveName();
        return primitiveTypeResponse;
    }
}
