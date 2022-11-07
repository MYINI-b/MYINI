package com.ssafy.myini.requirementdocs.service;

import com.ssafy.myini.ExistException;
import com.ssafy.myini.JiraException;
import com.ssafy.myini.NotFoundException;
import com.ssafy.myini.jira.JiraApi;
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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

import static com.ssafy.myini.ExistException.REQUIREMENT_CATEGORY_EXIST;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RequirementDocsServiceImpl implements RequirementDocsService{
    private final RequirementRepository requirementRepository;
    private final ProjectRepository projectRepository;
    private final RequirementCategoryRepository requirementCategoryRepository;
    private final MemberRepository memberRepository;
    private final RequirementDocsQueryRepository requirementDocsQueryRepository;

    @Override
    public List<RequirementListResponse> findAllRequirement(Long projectId) {
        List<Requirement> findRequirements = requirementDocsQueryRepository.findAllRequirement(projectId);

        return findRequirements.stream().map(RequirementListResponse::from).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void createRequirement(Long projectId) {
        Project findProject = projectRepository.findById(projectId).orElseThrow(() -> new NotFoundException(NotFoundException.PROJECT_NOT_FOUND));
        Requirement requirement = Requirement.createRequirement(findProject);
        requirementRepository.save(requirement);
    }

    @Override
    @Transactional
    public void updateRequirementCategory(Long requirementId, RequirementCategoryUpdateRequest requirementCategoryUpdateRequest) {
        Requirement findRequirement = requirementRepository.findById(requirementId).orElseThrow(() -> new NotFoundException(NotFoundException.REQUIREMENT_NOT_FOUND));
        RequirementCategory findRequirementCategory = requirementCategoryRepository.findById(requirementCategoryUpdateRequest.getCategoryId()).orElseThrow(() -> new NotFoundException(NotFoundException.REQUIREMENT_CATEGORY_NOT_FOUND));

        findRequirement.updateRequirementCategory(findRequirementCategory);
    }

    @Override
    @Transactional
    public void updateRequirementName(Long requirementId, RequirementNameUpdateRequest requirementNameUpdateRequest) {
        Requirement findRequirement = requirementRepository.findById(requirementId).orElseThrow(() -> new NotFoundException(NotFoundException.REQUIREMENT_NOT_FOUND));
        findRequirement.updateRequirementName(requirementNameUpdateRequest.getRequirementName());
    }

    @Override
    @Transactional
    public void updateRequirementContent(Long requirementId, RequirementContentUpdateRequest requirementContentUpdateRequest) {
        Requirement findRequirement = requirementRepository.findById(requirementId).orElseThrow(() -> new NotFoundException(NotFoundException.REQUIREMENT_NOT_FOUND));
        findRequirement.updateRequirementContent(requirementContentUpdateRequest.getRequirementContent());
    }

    @Override
    @Transactional
    public void updateRequirementPart(Long requirementId, RequirementPartUpdateRequest requirementPartUpdateRequest) {
        Requirement findRequirement = requirementRepository.findById(requirementId).orElseThrow(() -> new NotFoundException(NotFoundException.REQUIREMENT_NOT_FOUND));
        findRequirement.updateRequirementPart(requirementPartUpdateRequest.getRequirementPart());
    }

    @Override
    @Transactional
    public void updateRequirementMember(Long requirementId, RequirementMemberUpdateRequest requirementMemberUpdateRequest) {
        Requirement findRequirement = requirementRepository.findById(requirementId).orElseThrow(() -> new NotFoundException(NotFoundException.REQUIREMENT_NOT_FOUND));
        Member findMember = memberRepository.findByMemberName(requirementMemberUpdateRequest.getMemberName()).orElseThrow(() -> new NotFoundException(NotFoundException.MEMBER_NOT_FOUND));

        findRequirement.updateRequirementMember(findMember);
    }

    @Override
    @Transactional
    public void updateRequirementPriority(Long requirementId, RequirementPriorityUpdateRequest requirementPriorityUpdateRequest) {
        Requirement findRequirement = requirementRepository.findById(requirementId).orElseThrow(() -> new NotFoundException(NotFoundException.REQUIREMENT_NOT_FOUND));
        findRequirement.updateRequirementPriority(requirementPriorityUpdateRequest.getRequirementPriority());
    }

    @Override
    @Transactional
    public void updateRequirementStoryPoint(Long requirementId, RequirementStoryPointUpdateRequest requirementStoryPointUpdateRequest) {
        Requirement findRequirement = requirementRepository.findById(requirementId).orElseThrow(() -> new NotFoundException(NotFoundException.REQUIREMENT_NOT_FOUND));
        findRequirement.updateRequirementStoryPoint(requirementStoryPointUpdateRequest.getRequirementStoryPoint());
    }

    @Override
    @Transactional
    public void deleteRequirement(Long requirementId) {
        Requirement findRequirement = requirementRepository.findById(requirementId).orElseThrow(() -> new NotFoundException(NotFoundException.REQUIREMENT_NOT_FOUND));
        requirementRepository.delete(findRequirement);
    }

    @Override
    public List<RequirementCategoryListResponse> findAllRequirementsCategory(Long projectId) {
        Project findProject = projectRepository.findById(projectId).orElseThrow(() -> new NotFoundException(NotFoundException.PROJECT_NOT_FOUND));
        List<RequirementCategory> findRequirementCategories = requirementCategoryRepository.findAllByProject(findProject);

        return findRequirementCategories.stream()
                .map(RequirementCategoryListResponse::from)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void createRequirementCategory(Long projectId, RequirementCategoryCreateRequest requirementCategoryCreateRequest) {
        Project findProject = projectRepository.findById(projectId).orElseThrow(() -> new NotFoundException(NotFoundException.PROJECT_NOT_FOUND));

        RequirementCategory requirementCategory = RequirementCategory.createRequirementCategory(requirementCategoryCreateRequest.getCategoryName(), requirementCategoryCreateRequest.getCategoryColor(), findProject);
        requirementCategoryRepository.save(requirementCategory);
    }

    @Override
    @Transactional
    public void deleteRequirementCategory(Long requirementCategoryId) {
        RequirementCategory findRequirementCategory = requirementCategoryRepository.findById(requirementCategoryId).orElseThrow(() -> new NotFoundException(NotFoundException.REQUIREMENT_CATEGORY_NOT_FOUND));
        if (requirementRepository.existsByRequirementCategory(findRequirementCategory)){
            throw new ExistException(REQUIREMENT_CATEGORY_EXIST);
        }
        requirementCategoryRepository.delete(findRequirementCategory);
    }
}
