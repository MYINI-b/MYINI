package com.ssafy.myini.ERD.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TableRelationCreateRequest {
    private Long toErdTableId;
    private Long fromErdTableId;
    private Long relationItemId;
}
