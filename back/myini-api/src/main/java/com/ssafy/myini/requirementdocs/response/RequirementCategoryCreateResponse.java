package com.ssafy.myini.requirementdocs.response;

import com.ssafy.myini.requirementdocs.domain.RequirementCategory;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RequirementCategoryCreateResponse {
    private Long requirementCategoryId;

    public static RequirementCategoryCreateResponse from(RequirementCategory requirementCategory){
        RequirementCategoryCreateResponse requirementCategoryCreateResponse = new RequirementCategoryCreateResponse();
        requirementCategoryCreateResponse.requirementCategoryId = requirementCategory.getRequirementCategoryId();
        return requirementCategoryCreateResponse;
    }
}
