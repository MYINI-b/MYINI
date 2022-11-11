package com.ssafy.myini.apidocs.response;

import com.ssafy.myini.apidocs.domain.Dto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DtoCreateResponse {
    private Long dtoId;

    public static DtoCreateResponse from(Dto dto){
        DtoCreateResponse dtoCreateResponse = new DtoCreateResponse();
        dtoCreateResponse.dtoId = dto.getDtoId();
        return dtoCreateResponse;
    }
}
