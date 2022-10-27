package com.ssafy.myini.ERD.response;

import com.ssafy.myini.ERD.domain.entity.TableRelation;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TableRelationDto {
//    private Long fromErdTableId;
//    private String fromErdTableName;
    private Long toTableId;
    private String toTableName;
    private Long relationItemId;
    private String relationItemName;

    public static TableRelationDto from(TableRelation tableRelation){
        TableRelationDto tableRelationDto = new TableRelationDto();
//        tableRelationDto.fromErdTableId = tableRelation.getFromErdTable().getErdTableId();
//        tableRelationDto.fromErdTableName = tableRelation.getFromErdTable().getErdTableName();
        tableRelationDto.toTableId = tableRelation.getToErdTable().getErdTableId();
        tableRelationDto.toTableName = tableRelation.getToErdTable().getErdTableName();
        tableRelationDto.relationItemId = tableRelation.getRelationItem().getRelationItemId();
        tableRelationDto.relationItemName = tableRelation.getRelationItem().getRelationItemName();

        return tableRelationDto;
    }
}
