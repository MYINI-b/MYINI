package com.ssafy.myini.erd.response;

import com.ssafy.myini.erd.domain.entity.TableRelation;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TableRelationDto {
    private Long toTableId;
    private String toTableName;
    private Long relationItemId;
    private String relationItemName;

    public static TableRelationDto from(TableRelation tableRelation){
        TableRelationDto tableRelationDto = new TableRelationDto();
        tableRelationDto.toTableId = tableRelation.getToErdTable().getErdTableId();
        tableRelationDto.toTableName = tableRelation.getToErdTable().getErdTableName();
        tableRelationDto.relationItemId = tableRelation.getRelationItem().getRelationItemId();
        tableRelationDto.relationItemName = tableRelation.getRelationItem().getRelationItemName();

        return tableRelationDto;
    }
}
