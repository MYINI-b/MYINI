package com.ssafy.myini.jira.service;

import com.ssafy.myini.JiraException;
import com.ssafy.myini.NotFoundException;
import com.ssafy.myini.jira.JiraApi;
import com.ssafy.myini.jira.request.CreateJiraIssueRequest;
import com.ssafy.myini.jira.request.UpdateJiraAccountRequest;
import com.ssafy.myini.jira.request.UpdateJiraProjectRequest;
import com.ssafy.myini.member.domain.Member;
import com.ssafy.myini.member.domain.MemberProjectRepository;
import com.ssafy.myini.member.domain.MemberRepository;
import com.ssafy.myini.project.domain.Project;
import com.ssafy.myini.project.domain.ProjectRepository;
import com.ssafy.myini.project.query.ProjectQueryRepository;
import com.ssafy.myini.requirementdocs.domain.Requirement;
import com.ssafy.myini.requirementdocs.domain.RequirementRepository;
import com.ssafy.myini.requirementdocs.query.RequirementDocsQueryRepository;
import com.ssafy.myini.requirementdocs.response.JiraProjectListResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.ssafy.myini.NotFoundException.MEMBER_PROJECT_NOT_FOUND;
import static com.ssafy.myini.NotFoundException.PROJECT_NOT_FOUND;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class JiraServiceImpl implements JiraService{
    private final ProjectRepository projectRepository;
    private final MemberProjectRepository memberProjectRepository;
    private final RequirementDocsQueryRepository requirementDocsQueryRepository;

    @Transactional
    @Override
    public void updateJiraAccount(Member member, Long projectId, UpdateJiraAccountRequest request) {
        Project findProject = projectRepository.findById(projectId)
                .orElseThrow(() -> new NotFoundException(PROJECT_NOT_FOUND));
        if(!memberProjectRepository.existsByMemberAndProject(member, findProject)){
            throw new NotFoundException(MEMBER_PROJECT_NOT_FOUND);
        }
        findProject.updateJiraAccount(request.getJiraId(), request.getJiraApiKey());
    }

    @Transactional
    @Override
    public void updateJiraProject(Member member, Long projectId, UpdateJiraProjectRequest request) {
        Project findProject = projectRepository.findById(projectId)
                .orElseThrow(() -> new NotFoundException(PROJECT_NOT_FOUND));
        if(!memberProjectRepository.existsByMemberAndProject(member, findProject)){
            throw new NotFoundException(MEMBER_PROJECT_NOT_FOUND);
        }
        findProject.updateJiraProject(request.getJiraProjectId(), request.getJiraProjectKey(), request.getJiraProjectName());
    }

    @Override
    public List<JiraProjectListResponse> findJiraProjectList(Long projectId){
        Project findProject = projectRepository.findById(projectId)
                .orElseThrow(() -> new NotFoundException(PROJECT_NOT_FOUND));
        String jiraId = findProject.getJiraId();
        String jiraApiKey = findProject.getJiraApiKey();

        try {
            List<JiraProjectListResponse> jiraProjectListResponses = JiraApi.getProjectList(jiraId, jiraApiKey);

            return jiraProjectListResponses;
        }catch (Exception e){
            throw new JiraException(JiraException.JIRA_FAIL);
        }



    }

    @Override
    public void jiraCreateIssue(Long projectId, CreateJiraIssueRequest createJiraIssueRequest) {
        List<Requirement> findRequirements = requirementDocsQueryRepository.findAllRequirement(projectId);

        Project findProject = projectRepository.findById(projectId)
                .orElseThrow(() -> new NotFoundException(PROJECT_NOT_FOUND));
        String jiraId = findProject.getJiraId();
        String jiraApiKey = findProject.getJiraApiKey();

        try {
//            JiraApi.getIssue();
            JiraApi.createIssue(jiraId, jiraApiKey, findRequirements, createJiraIssueRequest);
        }catch (Exception e){
            throw new JiraException(JiraException.JIRA_FAIL);
        }
    }
}
