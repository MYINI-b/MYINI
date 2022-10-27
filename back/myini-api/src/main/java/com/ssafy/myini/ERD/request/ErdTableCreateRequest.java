package com.ssafy.myini.ERD.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ErdTableCreateRequest {
    private String erdTableName;
    private Double erdTableX;
    private Double erdTableY;
    private String erdTableColor;
}
