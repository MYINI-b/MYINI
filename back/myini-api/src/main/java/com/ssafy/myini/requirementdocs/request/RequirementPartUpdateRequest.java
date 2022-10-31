package com.ssafy.myini.requirementdocs.request;

import com.ssafy.myini.requirementdocs.domain.type.RequirementPart;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RequirementPartUpdateRequest {
    private RequirementPart requirementPart;
}
