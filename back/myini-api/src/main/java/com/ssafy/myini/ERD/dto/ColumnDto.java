package com.ssafy.myini.ERD.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ColumnDto {
    private Long columnId;
    private String columnName;
    private List<ConstraintDto> constraintDtos;
}
