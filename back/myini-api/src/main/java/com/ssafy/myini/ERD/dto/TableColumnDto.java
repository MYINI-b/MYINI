package com.ssafy.myini.ERD.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TableColumnDto {
    private Long tableColumnId;
    private String tableColumnName;
    private List<ConstraintDto> constraintDtos;
}
