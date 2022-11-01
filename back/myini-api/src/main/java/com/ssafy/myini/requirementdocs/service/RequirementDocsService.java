package com.ssafy.myini.requirementdocs.service;

import com.ssafy.myini.requirementdocs.request.*;
import com.ssafy.myini.requirementdocs.response.RequirementCategoryListResponse;
import com.ssafy.myini.requirementdocs.response.RequirementListResponse;

import java.util.List;

public interface RequirementDocsService {
    List<RequirementListResponse> findAllRequirement(Long projectId);
    Void createRequirement(Long projectId);
    Void updateRequirementCategory(Long requirementId, RequirementCategoryUpdateRequest requirementCategoryUpdateRequest);
    Void updateRequirementName(Long requirementId, RequirementNameUpdateRequest requirementNameUpdateRequest);
    Void updateRequirementContent(Long requirementId, RequirementContentUpdateRequest requirementContentUpdateRequest);
    Void updateRequirementPart(Long requirementId, RequirementPartUpdateRequest requirementPartUpdateRequest);
    Void updateRequirementMember(Long requirementId, RequirementMemberUpdateRequest requirementMemberUpdateRequest);
    Void updateRequirementPriority(Long requirementId, RequirementPriorityUpdateRequest requirementPriorityUpdateRequest);
    Void updateRequirementStoryPoint(Long requirementId, RequirementStoryPointUpdateRequest requirementStoryPointUpdateRequest);
    Void deleteRequirement(Long requirementId);
    List<RequirementCategoryListResponse> findAllRequirementsCategory(Long projectId);
    Void createRequirementCategory(Long projectId, RequirementCategoryCreateRequest requirementCategoryCreateRequest);
    Void deleteRequirementCategory(Long requirementCategoryId);

}
