package com.ssafy.myini.requirementdocs.response;

import com.ssafy.myini.requirementdocs.domain.Requirement;
import com.ssafy.myini.requirementdocs.domain.type.RequirementPart;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RequirementListResponse {
    private Long requirementId;
    private RequirementCategoryDto requirementCategoryDto;
    private String requirementName;
    private String requirementContent;
    private RequirementPart requirementPart;
    private String memberNickName;
    private String memberJiraEmail;
    private Integer requirementPriority;
    private Double requirementStoryPoint;

    public static RequirementListResponse from(Requirement requirement){
        RequirementListResponse requirementListResponse = new RequirementListResponse();
        requirementListResponse.requirementId = requirement.getRequirementId();
        if(requirement.getRequirementCategory() != null) {
            requirementListResponse.requirementCategoryDto = RequirementCategoryDto.from(requirement.getRequirementCategory());
        }
        requirementListResponse.requirementName = requirement.getRequirementName();
        requirementListResponse.requirementContent = requirement.getRequirementContent();
        requirementListResponse.requirementPart = requirement.getRequirementPart();
        if(requirement.getMember() != null) {
            requirementListResponse.memberNickName = requirement.getMember().getMemberNickname();
            requirementListResponse.memberJiraEmail = requirement.getMember().getMemberJiraEmail();
        }
        requirementListResponse.requirementPriority = requirement.getRequirementPriority();
        requirementListResponse.requirementStoryPoint = requirement.getRequirementStoryPoint();

        return requirementListResponse;
    }
}