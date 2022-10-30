package com.ssafy.myini.requirementdocs.service;

import com.ssafy.myini.NotFoundException;
import com.ssafy.myini.member.domain.Member;
import com.ssafy.myini.member.domain.MemberRepository;
import com.ssafy.myini.project.domain.Project;
import com.ssafy.myini.project.domain.ProjectRepository;
import com.ssafy.myini.requirementdocs.domain.Requirement;
import com.ssafy.myini.requirementdocs.domain.RequirementCategory;
import com.ssafy.myini.requirementdocs.domain.RequirementCategoryRepository;
import com.ssafy.myini.requirementdocs.domain.RequirementRepository;
import com.ssafy.myini.requirementdocs.query.RequirementDocsQueryRepository;
import com.ssafy.myini.requirementdocs.request.*;
import com.ssafy.myini.requirementdocs.response.RequirementCategoryListResponse;
import com.ssafy.myini.requirementdocs.response.RequirementListResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class RequirementDocsServiceImpl implements RequirementDocsService{
    private final RequirementRepository requirementRepository;
    private final ProjectRepository projectRepository;
    private final RequirementCategoryRepository requirementCategoryRepository;
    private final MemberRepository memberRepository;
    private final RequirementDocsQueryRepository requirementDocsQueryRepository;

    @Override
    public List<RequirementListResponse> findAllRequirement(Long projectId) {
        List<Requirement> requirements = requirementDocsQueryRepository.findAllRequirement(projectId);
        List<RequirementListResponse> requirementListResponses = requirements.stream().map(RequirementListResponse::from).collect(Collectors.toList());

        return requirementListResponses;
    }

    @Override
    @Transactional
    public Void createRequirement(Long projectId) {
        Project project = projectRepository.findById(projectId).orElseThrow(() -> new NotFoundException(NotFoundException.PROJECT_NOT_FOUND));
        Requirement requirement = Requirement.createRequirement(project);
        requirementRepository.save(requirement);

        return null;
    }

    @Override
    @Transactional
    public Void updateRequirementCategory(Long requirementId, RequirementCategoryUpdateRequest requirementCategoryUpdateRequest) {
        Requirement requirement = requirementRepository.findById(requirementId).orElseThrow(() -> new NotFoundException(NotFoundException.REQUIREMENT_NOT_FOUND));
        RequirementCategory requirementCategory = requirementCategoryRepository.findById(requirementCategoryUpdateRequest.getCategoryId()).orElseThrow(() -> new NotFoundException(NotFoundException.REQUIREMENT_CATEGORY_NOT_FOUND));

        requirement.updateRequirementCategory(requirementCategory);

        return null;
    }

    @Override
    @Transactional
    public Void updateRequirementName(Long requirementId, RequirementNameUpdateRequest requirementNameUpdateRequest) {
        Requirement requirement = requirementRepository.findById(requirementId).orElseThrow(() -> new NotFoundException(NotFoundException.REQUIREMENT_NOT_FOUND));
        requirement.updateRequirementName(requirementNameUpdateRequest.getRequirementName());

        return null;
    }

    @Override
    @Transactional
    public Void updateRequirementContent(Long requirementId, RequirementContentUpdateRequest requirementContentUpdateRequest) {
        Requirement requirement = requirementRepository.findById(requirementId).orElseThrow(() -> new NotFoundException(NotFoundException.REQUIREMENT_NOT_FOUND));
        requirement.updateRequirementContent(requirementContentUpdateRequest.getRequirementContent());

        return null;
    }

    @Override
    @Transactional
    public Void updateRequirementPart(Long requirementId, RequirementPartUpdateRequest requirementPartUpdateRequest) {
        Requirement requirement = requirementRepository.findById(requirementId).orElseThrow(() -> new NotFoundException(NotFoundException.REQUIREMENT_NOT_FOUND));
        requirement.updateRequirementPart(requirementPartUpdateRequest.getRequirementPart());

        return null;
    }

    @Override
    @Transactional
    public Void updateRequirementMember(Long requirementId, RequirementMemberUpdateRequest requirementMemberUpdateRequest) {
        Requirement requirement = requirementRepository.findById(requirementId).orElseThrow(() -> new NotFoundException(NotFoundException.REQUIREMENT_NOT_FOUND));
        Member member = memberRepository.findByMemberName(requirementMemberUpdateRequest.getMemberName()).orElseThrow(() -> new NotFoundException(NotFoundException.MEMBER_NOT_FOUND));

        requirement.updateRequirementMember(member);

        return null;
    }

    @Override
    @Transactional
    public Void updateRequirementPriority(Long requirementId, RequirementPriorityUpdateRequest requirementPriorityUpdateRequest) {
        Requirement requirement = requirementRepository.findById(requirementId).orElseThrow(() -> new NotFoundException(NotFoundException.REQUIREMENT_NOT_FOUND));
        requirement.updateRequirementPriority(requirementPriorityUpdateRequest.getRequirementPriority());

        return null;
    }

    @Override
    @Transactional
    public Void updateRequirementStoryPoint(Long requirementId, RequirementStoryPointUpdateRequest requirementStoryPointUpdateRequest) {
        Requirement requirement = requirementRepository.findById(requirementId).orElseThrow(() -> new NotFoundException(NotFoundException.REQUIREMENT_NOT_FOUND));
        requirement.updateRequirementStoryPoint(requirementStoryPointUpdateRequest.getRequirementStoryPoint());

        return null;
    }

    @Override
    @Transactional
    public Void deleteRequirement(Long requirementId) {
        Requirement requirement = requirementRepository.findById(requirementId).orElseThrow(() -> new NotFoundException(NotFoundException.REQUIREMENT_NOT_FOUND));
        requirementRepository.delete(requirement);

        return null;
    }

    @Override
    public List<RequirementCategoryListResponse> findAllRequirementsCategory(Long projectId) {
        Project project = projectRepository.findById(projectId).orElseThrow(() -> new NotFoundException(NotFoundException.PROJECT_NOT_FOUND));
        List<RequirementCategory> requirementCategories = requirementCategoryRepository.findAllByProject(project);
        List<RequirementCategoryListResponse> categoryListResponses = requirementCategories.stream().map(RequirementCategoryListResponse::from).collect(Collectors.toList());

        return categoryListResponses;
    }

    @Override
    @Transactional
    public Void createRequirementCategory(Long projectId, RequirementCategoryCreateRequest requirementCategoryCreateRequest) {
        Project project = projectRepository.findById(projectId).orElseThrow(() -> new NotFoundException(NotFoundException.PROJECT_NOT_FOUND));
        RequirementCategory requirementCategory = RequirementCategory.createRequirementCategory(requirementCategoryCreateRequest.getCategoryName(), requirementCategoryCreateRequest.getCategoryColor(), project);
        requirementCategoryRepository.save(requirementCategory);

        return null;
    }

    @Override
    @Transactional
    public Void deleteRequirementCategory(Long requirementCategoryId) {
        RequirementCategory requirementCategory = requirementCategoryRepository.findById(requirementCategoryId).orElseThrow(() -> new NotFoundException(NotFoundException.REQUIREMENT_CATEGORY_NOT_FOUND));
        requirementCategoryRepository.delete(requirementCategory);

        return null;
    }
}
