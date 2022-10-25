package com.ssafy.myini.ERD.response;

import com.ssafy.myini.ERD.domain.entity.Condition;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ConstraintListResponse {
    private Long constraintId;
    private String constraintName;

    public static ConstraintListResponse from(Condition condition){
        ConstraintListResponse constraintListResponse = new ConstraintListResponse();
        constraintListResponse.constraintId = condition.getConditionId();
        constraintListResponse.constraintName = condition.getConditionName();

        return constraintListResponse;
    }
}
