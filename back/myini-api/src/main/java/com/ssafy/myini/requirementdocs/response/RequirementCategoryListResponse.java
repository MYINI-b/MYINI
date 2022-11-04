package com.ssafy.myini.requirementdocs.response;

import com.ssafy.myini.requirementdocs.domain.RequirementCategory;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RequirementCategoryListResponse {
    private Long requirementCategoryId;
    private String categoryName;
    private String categoryColor;

    public static RequirementCategoryListResponse from(RequirementCategory requirementCategory){
        RequirementCategoryListResponse requirementCategoryListResponse = new RequirementCategoryListResponse();
        requirementCategoryListResponse.requirementCategoryId = requirementCategory.getRequirementCategoryId();
        requirementCategoryListResponse.categoryName = requirementCategory.getCategoryName();
        requirementCategoryListResponse.categoryColor = requirementCategory.getCategoryColor();

        return requirementCategoryListResponse;
    }
}
