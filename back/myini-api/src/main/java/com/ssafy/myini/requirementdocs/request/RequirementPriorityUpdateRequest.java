package com.ssafy.myini.requirementdocs.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RequirementPriorityUpdateRequest {
    private Integer requirementPriority;
}
