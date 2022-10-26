package com.ssafy.myini.ERD.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ErdTableUpdateRequest {
    private String tableName;
    private Double tableX;
    private Double tableY;
    private String tableColor;
}
