package com.ssafy.myini.ERD.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ColumnUpdateRequest {
    private String columnName;
    private List<Long> constraintIds;

}
