package com.ssafy.myini.ERD.response;

import com.ssafy.myini.ERD.domain.entity.ErdTable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TableListResponse {
    private Long tableId;
    private String tableName;
    private Double tableX;
    private Double tableY;
    private String tableColor;
    List<TableColumnDto> tableColumnDtos;
    List<TableRelationDto> tableRelationDtos;

    public static TableListResponse from(ErdTable erdTable){
        TableListResponse tableListResponse = new TableListResponse();
        tableListResponse.tableId = erdTable.getErdTableId();
        tableListResponse.tableName = erdTable.getErdTableName();
        tableListResponse.tableX = tableListResponse.getTableX();
        tableListResponse.tableY = tableListResponse.getTableY();
        tableListResponse.tableColor = tableListResponse.getTableColor();
        tableListResponse.tableColumnDtos = erdTable.getErdTableColumns().stream().map(TableColumnDto::from).collect(Collectors.toList());
        tableListResponse.tableRelationDtos = erdTable.getFromErdTableRelations().stream().map(TableRelationDto::from).collect(Collectors.toList());

        return tableListResponse;
    }
}
