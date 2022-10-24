package com.ssafy.myini.ERD.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TableRelationDto {
    private Long fromTableId;
    private Long toTableId;
    private Long relationId;
}
