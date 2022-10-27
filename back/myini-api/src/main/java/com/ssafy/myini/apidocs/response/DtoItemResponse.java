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
    private Long dtoClassType;
    private Long dtoPrimitiveType;
    private String dtoIsList;

    public static DtoItemResponse from(DtoItem dtoItem){
        DtoItemResponse dtoItemResponse = new DtoItemResponse();
        dtoItemResponse.dtoItemId = dtoItem.getDtoItemId();
        dtoItemResponse.dtoItemName = dtoItem.getDtoItemName();
        dtoItemResponse.dtoClassType = dtoItem.getDtoClassType().getDtoId();
        dtoItemResponse.dtoPrimitiveType = dtoItem.getPrimitive().getPrimitiveId();
        dtoItemResponse.dtoIsList = String.valueOf(dtoItem.getDtoIsList());
        return dtoItemResponse;
    }
}