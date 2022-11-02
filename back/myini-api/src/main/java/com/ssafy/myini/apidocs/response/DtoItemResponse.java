package com.ssafy.myini.apidocs.response;

import com.ssafy.myini.apidocs.domain.DtoItem;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DtoItemResponse {
    private Long dtoItemId;
    private String dtoItemName;
    private Long dtoClassTypeId;
    private Long dtoPrimitiveTypeId;
    private String dtoIsList;
    private String dtoClassTypeName;
    private String dtoPrimitiveTypeName;

    public static DtoItemResponse from(DtoItem dtoItem) {
        DtoItemResponse dtoItemResponse = new DtoItemResponse();
        dtoItemResponse.dtoItemId = dtoItem.getDtoItemId();
        dtoItemResponse.dtoItemName = dtoItem.getDtoItemName();
        if (dtoItem.getDtoClassType() != null) {
            dtoItemResponse.dtoClassTypeId = dtoItem.getDtoClassType().getDtoId();
            dtoItemResponse.dtoClassTypeName = dtoItem.getDtoClassType().getDtoName();
        } else {
            dtoItemResponse.dtoPrimitiveTypeId = dtoItem.getPrimitive().getPrimitiveId();
            dtoItemResponse.dtoPrimitiveTypeName = dtoItem.getPrimitive().getPrimitiveName();
        }
        dtoItemResponse.dtoIsList = String.valueOf(dtoItem.getDtoIsList());
        return dtoItemResponse;
    }
}