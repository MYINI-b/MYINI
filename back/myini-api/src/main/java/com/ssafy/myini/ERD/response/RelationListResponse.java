package com.ssafy.myini.ERD.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RelationListResponse {
    private Long relationId;
    private String relationName;
}
