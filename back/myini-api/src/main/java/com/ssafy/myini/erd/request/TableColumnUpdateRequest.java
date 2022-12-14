package com.ssafy.myini.erd.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TableColumnUpdateRequest {
    private String tableColumnName;
    private String tableColumnType;
    private List<Long> conditionItemIds;

}
