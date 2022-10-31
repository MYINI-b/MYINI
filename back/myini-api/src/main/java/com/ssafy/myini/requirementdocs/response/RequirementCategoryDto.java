package com.ssafy.myini.requirementdocs.response;

import com.ssafy.myini.requirementdocs.domain.Requirement;
import com.ssafy.myini.requirementdocs.domain.RequirementCategory;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RequirementCategoryDto {
    private Long requirementCategoryId;
    private String categoryName;
    private String categoryColor;

    public static RequirementCategoryDto from(RequirementCategory requirementCategory){
        RequirementCategoryDto requirementCategoryDto = new RequirementCategoryDto();
        requirementCategoryDto.requirementCategoryId = requirementCategory.getRequirementCategoryId();
        requirementCategoryDto.categoryName = requirementCategory.getCategoryName();
        requirementCategoryDto.categoryColor = requirementCategory.getCategoryColor();

        return requirementCategoryDto;
    }
}
