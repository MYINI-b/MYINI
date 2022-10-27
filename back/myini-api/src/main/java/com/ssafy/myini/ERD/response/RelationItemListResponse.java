package com.ssafy.myini.ERD.response;

import com.ssafy.myini.ERD.domain.entity.RelationItem;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RelationItemListResponse {
    private Long relationItemId;
    private String relationItemName;

    public static RelationItemListResponse from(RelationItem relationItem){
        RelationItemListResponse relationItemListResponse = new RelationItemListResponse();
        relationItemListResponse.relationItemId = relationItem.getRelationItemId();
        relationItemListResponse.relationItemName = relationItem.getRelationItemName();

        return relationItemListResponse;
    }
}
