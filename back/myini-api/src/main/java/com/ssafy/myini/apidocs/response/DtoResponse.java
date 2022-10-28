package com.ssafy.myini.apidocs.response;

import com.ssafy.myini.apidocs.domain.Dto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DtoResponse {
    private Long dtoId;
    private String dtoName;
    private String dtoType;
    List<DtoItemResponse> dtoItemResponses;

    public static DtoResponse from(Dto dto){
        DtoResponse dtoResponse = new DtoResponse();
        dtoResponse.dtoId = dto.getDtoId();
        dtoResponse.dtoName = String.valueOf(dto.getDtoName());
        dtoResponse.dtoType = String.valueOf(dto.getDtoType());
        if(dto.getDtoItems() != null){
            dtoResponse.dtoItemResponses = dto.getDtoItems().stream()
                    .map(DtoItemResponse :: from)
                    .collect(Collectors.toList());
        }
        return dtoResponse;
    }
}