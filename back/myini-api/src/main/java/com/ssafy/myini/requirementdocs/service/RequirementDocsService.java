package com.ssafy.myini.requirementdocs.service;

import com.ssafy.myini.requirementdocs.request.*;
import com.ssafy.myini.requirementdocs.response.RequirementCategoryListResponse;
import com.ssafy.myini.requirementdocs.response.RequirementListResponse;

import java.util.List;

public interface RequirementDocsService {
    List<RequirementListResponse> findAllRequirement(Long projectId);
    void createRequirement(Long projectId);
    void updateRequirementCategory(Long requirementId, RequirementCategoryUpdateRequest requirementCategoryUpdateRequest);
    void updateRequirementName(Long requirementId, RequirementNameUpdateRequest requirementNameUpdateRequest);
    void updateRequirementContent(Long requirementId, RequirementContentUpdateRequest requirementContentUpdateRequest);
    void updateRequirementPart(Long requirementId, RequirementPartUpdateRequest requirementPartUpdateRequest);
    void updateRequirementMember(Long requirementId, RequirementMemberUpdateRequest requirementMemberUpdateRequest);
    void updateRequirementPriority(Long requirementId, RequirementPriorityUpdateRequest requirementPriorityUpdateRequest);
    void updateRequirementStoryPoint(Long requirementId, RequirementStoryPointUpdateRequest requirementStoryPointUpdateRequest);
    void deleteRequirement(Long requirementId);
    List<RequirementCategoryListResponse> findAllRequirementsCategory(Long projectId);
    void createRequirementCategory(Long projectId, RequirementCategoryCreateRequest requirementCategoryCreateRequest);
    void deleteRequirementCategory(Long requirementCategoryId);

}
