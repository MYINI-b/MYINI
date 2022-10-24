package com.ssafy.myini.ERD.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TableColumnUpdateRequest {
    private String tableColumnName;
    private List<Long> constraintIds;

}
