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
    private Long erdTableId;
    private String erdTableName;
    private Double erdTableX;
    private Double erdTableY;
    private String erdTableColor;
    List<TableColumnDto> tableColumnDtos;
    List<TableRelationDto> tableRelationDtos;

    public static ErdTableListResponse from(ErdTable erdTable){
        ErdTableListResponse erdTableListResponse = new ErdTableListResponse();
        erdTableListResponse.erdTableId = erdTable.getErdTableId();
        erdTableListResponse.erdTableName = erdTable.getErdTableName();
        erdTableListResponse.erdTableX = erdTable.getErdTableX();
        erdTableListResponse.erdTableY = erdTable.getErdTableY();
        erdTableListResponse.erdTableColor = erdTable.getErdTableColor();
        erdTableListResponse.tableColumnDtos = erdTable.getErdTableColumns().stream().map(TableColumnDto::from).collect(Collectors.toList());
        erdTableListResponse.tableRelationDtos = erdTable.getFromErdTableRelations().stream().map(TableRelationDto::from).collect(Collectors.toList());

        return erdTableListResponse;
    }
}
