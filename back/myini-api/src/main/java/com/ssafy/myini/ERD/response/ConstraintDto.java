package com.ssafy.myini.ERD.response;

import com.ssafy.myini.ERD.domain.entity.ColumnCondition;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ConstraintDto {
    private Long constraintId;
    private String constraintName;

    public static ConstraintDto from(ColumnCondition columnCondition){
        ConstraintDto constraintDto = new ConstraintDto();
        constraintDto.constraintId = columnCondition.getCondition().getConditionId();
        constraintDto.constraintName = columnCondition.getCondition().getConditionName();

        return constraintDto;
    }
}
