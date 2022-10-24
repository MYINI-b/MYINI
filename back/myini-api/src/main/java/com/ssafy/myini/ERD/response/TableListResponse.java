package com.ssafy.myini.ERD.response;

import com.ssafy.myini.ERD.dto.ColumnDto;
import com.ssafy.myini.ERD.dto.TableRelationDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TableListResponse {
    private Long tableId;
    private String tableName;
    private Double tableX;
    private Double tableY;
    private String tableColor;
    List<ColumnDto> columnDtos;
    List<TableRelationDto> tableRelationDtos;
}
