package com.ssafy.myini.ERD.response;

import com.ssafy.myini.ERD.domain.entity.TableRelation;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TableRelationDto {
    private Long fromTableId;
    private String fromTableName;
//    private Long toTableId;
//    private String toTableName;
    private Long relationId;
    private String relationName;

    public static TableRelationDto from(TableRelation tableRelation){
        TableRelationDto tableRelationDto = new TableRelationDto();
        tableRelationDto.fromTableId = tableRelation.getFromErdTable().getErdTableId();
        tableRelationDto.fromTableName = tableRelation.getFromErdTable().getErdTableName();
//        tableRelationDto.toTableId = tableRelation.getToTable().getTableId();
//        tableRelationDto.toTableName = tableRelation.getToTable().getTableName();
        tableRelationDto.relationId = tableRelation.getRelation().getRelationId();
        tableRelationDto.relationName = tableRelation.getRelation().getRelationName();

        return tableRelationDto;
    }
}
