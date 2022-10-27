package com.ssafy.myini.apidocs.response;

import com.ssafy.myini.apidocs.domain.Dto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClassTypeResponse {
    private Long dtoId;
    private String dtoName;

    public static ClassTypeResponse from(Dto dto){
        ClassTypeResponse classTypeResponse = new ClassTypeResponse();
        classTypeResponse.dtoId = dto.getDtoId();
        classTypeResponse.dtoName = dto.getDtoName();
        return classTypeResponse;
    }
}
