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
public class ErdTableListResponse {
    private Long tableId;
    private String tableName;
    private Double tableX;
    private Double tableY;
    private String tableColor;
    List<TableColumnDto> tableColumnDtos;
    List<TableRelationDto> tableRelationDtos;

    public static ErdTableListResponse from(ErdTable erdTable){
        ErdTableListResponse erdTableListResponse = new ErdTableListResponse();
        erdTableListResponse.tableId = erdTable.getErdTableId();
        erdTableListResponse.tableName = erdTable.getErdTableName();
        erdTableListResponse.tableX = erdTableListResponse.getTableX();
        erdTableListResponse.tableY = erdTableListResponse.getTableY();
        erdTableListResponse.tableColor = erdTableListResponse.getTableColor();
        erdTableListResponse.tableColumnDtos = erdTable.getErdTableColumns().stream().map(TableColumnDto::from).collect(Collectors.toList());
        erdTableListResponse.tableRelationDtos = erdTable.getFromErdTableRelations().stream().map(TableRelationDto::from).collect(Collectors.toList());

        return erdTableListResponse;
    }
}
