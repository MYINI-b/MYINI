package com.ssafy.myini.project.service;

import com.ssafy.myini.NotFoundException;
import com.ssafy.myini.member.domain.Member;
import com.ssafy.myini.member.domain.MemberProject;
import com.ssafy.myini.member.domain.MemberProjectRepository;
import com.ssafy.myini.member.domain.MemberRepository;
import com.ssafy.myini.project.domain.Project;
import com.ssafy.myini.project.domain.ProjectRepository;
import com.ssafy.myini.project.query.ProjectQueryRepository;
import com.ssafy.myini.project.request.FindByMemberEmailRequest;
import com.ssafy.myini.project.request.UpdateProjectRequest;
import com.ssafy.myini.project.response.ProjectInfoResponse;
import com.ssafy.myini.project.response.ProjectListResponse;
import com.ssafy.myini.project.response.ProjectMemberResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.ssafy.myini.NotFoundException.MEMBER_NOT_FOUND;
import static com.ssafy.myini.NotFoundException.PROJECT_NOT_FOUND;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProjectServiceImpl implements ProjectService {
    private final ProjectRepository projectRepository;
    private final ProjectQueryRepository projectQueryRepository;
    private final MemberProjectRepository memberProjectRepository;
    private final MemberRepository memberRepository;

    @Transactional
    @Override
    public void createProject(Member member) {
        Project project = Project.createProject();
        projectRepository.save(project);

        MemberProject memberProject = MemberProject.createMemberProject(member, project);
        memberProjectRepository.save(memberProject);
    }

    @Override
    public List<ProjectListResponse> findAll(Member member) {
        List<Project> findMemberProjects = projectQueryRepository.findAll(member);
        return findMemberProjects.stream()
                .map(ProjectListResponse::from)
                .collect(Collectors.toList());
    }

    @Override
    public ProjectInfoResponse findByProjectId(Long projectId) {
        Project findProject = projectRepository.findById(projectId)
                .orElseThrow(() -> new NotFoundException(PROJECT_NOT_FOUND));

        return ProjectInfoResponse.from(findProject);
    }

    @Transactional
    @Override
    public void updateProject(Long projectId, UpdateProjectRequest request) {
        Project findProject = projectRepository.findById(projectId)
                .orElseThrow(() -> new NotFoundException(PROJECT_NOT_FOUND));

        findProject.updateProject(request.getProjectName(), request.getProjectDescription(), request.getProjectImg(), request.getProjectStartedDate(), request.getProjectFinishedDate(), request.getProjectGithubUrl(), request.getProjectJiraUrl(), request.getProjectNotionUrl(), request.getProjectFigmaUrl());
    }

    @Transactional
    @Override
    public void deleteProject(Long projectId) {
        Project findProject = projectRepository.findById(projectId)
                .orElseThrow(() -> new NotFoundException(PROJECT_NOT_FOUND));

        projectRepository.delete(findProject);
    }

    @Override
    public List<ProjectMemberResponse> findProjectMemberList(Long projectId) {
        List<MemberProject> findMemberProjects = projectQueryRepository.findProjectMemberList(projectId);

        return findMemberProjects.stream()
                .map(memberProject -> ProjectMemberResponse.from(memberProject.getMember()))
                .collect(Collectors.toList());
    }

    @Override
    public ProjectMemberResponse findByMemberEmail(FindByMemberEmailRequest request) {
        Member findMember = memberRepository.findByMemberEmail(request.getMemberEmail())
                .orElseThrow(() -> new NotFoundException(MEMBER_NOT_FOUND));
        return ProjectMemberResponse.from(findMember);
    }

    @Transactional
    @Override
    public void addProjectMember(Long projectId, Long memberId) {
        Project findProject = projectRepository.findById(projectId)
                .orElseThrow(() -> new NotFoundException(PROJECT_NOT_FOUND));

        Member findMember = memberRepository.findById(memberId)
                .orElseThrow(() -> new NotFoundException(MEMBER_NOT_FOUND));

        MemberProject memberProject = MemberProject.createMemberProject(findMember, findProject);
        memberProjectRepository.save(memberProject);
    }

    @Transactional
    @Override
    public void deleteProjectMember(Long projectId, Long memberId) {
        Project findProject = projectRepository.findById(projectId)
                .orElseThrow(() -> new NotFoundException(PROJECT_NOT_FOUND));

        Member findMember = memberRepository.findById(memberId)
                .orElseThrow(() -> new NotFoundException(MEMBER_NOT_FOUND));

        MemberProject memberProject = memberProjectRepository.findByMemberAndProject(findMember, findProject);
        memberProjectRepository.delete(memberProject);
    }
}
