package com.ssafy.myini.ERD.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ConstraintDto {
    private Long constraintId;
    private String constraintName;
}
