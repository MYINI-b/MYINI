package com.ssafy.myini.ERD.response;

import com.ssafy.myini.ERD.domain.entity.ConditionItem;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ConditionItemListResponse {
    private Long conditionItemId;
    private String conditionItemName;

    public static ConditionItemListResponse from(ConditionItem conditionItem){
        ConditionItemListResponse conditionItemListResponse = new ConditionItemListResponse();
        conditionItemListResponse.conditionItemId = conditionItem.getConditionItemId();
        conditionItemListResponse.conditionItemName = conditionItem.getConditionItemName();

        return conditionItemListResponse;
    }
}
