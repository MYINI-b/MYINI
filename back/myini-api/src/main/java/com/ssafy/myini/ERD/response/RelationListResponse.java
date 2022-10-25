package com.ssafy.myini.ERD.response;

import com.ssafy.myini.ERD.domain.entity.Relation;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RelationListResponse {
    private Long relationId;
    private String relationName;

    public static RelationListResponse from(Relation relation){
        RelationListResponse relationListResponse = new RelationListResponse();
        relationListResponse.relationId = relation.getRelationId();
        relationListResponse.relationName = relation.getRelationName();

        return relationListResponse;
    }
}
