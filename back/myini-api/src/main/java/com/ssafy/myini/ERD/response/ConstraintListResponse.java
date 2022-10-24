package com.ssafy.myini.ERD.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ConstraintListResponse {
    private Long constraintId;
    private String constraintName;
}
