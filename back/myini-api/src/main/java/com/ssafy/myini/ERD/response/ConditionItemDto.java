package com.ssafy.myini.ERD.response;

import com.ssafy.myini.ERD.domain.entity.ColumnCondition;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ConditionItemDto {
    private Long conditionItemId;
    private String conditionItemName;

    public static ConditionItemDto from(ColumnCondition columnCondition){
        ConditionItemDto conditionItemDto = new ConditionItemDto();
        conditionItemDto.conditionItemId = columnCondition.getConditionItem().getConditionItemId();
        conditionItemDto.conditionItemName = columnCondition.getConditionItem().getConditionItemName();

        return conditionItemDto;
    }
}
