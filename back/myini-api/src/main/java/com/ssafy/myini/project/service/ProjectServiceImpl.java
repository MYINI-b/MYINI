package com.ssafy.myini.project.service;

import com.ssafy.myini.DuplicateException;
import com.ssafy.myini.JiraException;
import com.ssafy.myini.NotFoundException;
import com.ssafy.myini.config.S3Uploader;
import com.ssafy.myini.jira.JiraApi;
import com.ssafy.myini.member.domain.Member;
import com.ssafy.myini.member.domain.MemberProject;
import com.ssafy.myini.member.domain.MemberProjectRepository;
import com.ssafy.myini.member.domain.MemberRepository;
import com.ssafy.myini.project.domain.Project;
import com.ssafy.myini.project.domain.ProjectRepository;
import com.ssafy.myini.project.query.ProjectQueryRepository;
import com.ssafy.myini.project.request.FindByMemberEmailRequest;
import com.ssafy.myini.jira.request.UpdateJiraAccountRequest;
import com.ssafy.myini.jira.request.UpdateJiraProjectRequest;
import com.ssafy.myini.project.request.UpdateProjectRequest;
import com.ssafy.myini.project.response.ProjectCreateResponse;
import com.ssafy.myini.project.response.ProjectInfoResponse;
import com.ssafy.myini.project.response.ProjectListResponse;
import com.ssafy.myini.project.response.ProjectMemberResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static com.ssafy.myini.DuplicateException.MEMBER_PROJECT_DUPLICATE;
import static com.ssafy.myini.NotFoundException.*;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProjectServiceImpl implements ProjectService {
    private final ProjectRepository projectRepository;
    private final ProjectQueryRepository projectQueryRepository;
    private final MemberProjectRepository memberProjectRepository;
    private final MemberRepository memberRepository;
    private final S3Uploader s3Uploader;

    @Transactional
    @Override
    public ProjectCreateResponse createProject(Member member) {
        Project project = Project.createProject();
        projectRepository.save(project);

        MemberProject memberProject = MemberProject.createMemberProject(member, project);
        memberProjectRepository.save(memberProject);
        return ProjectCreateResponse.from(project);
    }

    @Override
    public List<ProjectListResponse> findAll(Member member) {
        List<MemberProject> findMemberProjects = projectQueryRepository.findAll(member);
        return findMemberProjects.stream()
                .map(memberProject -> ProjectListResponse.from(memberProject.getProject()))
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
    public void updateProject(Member member, Long projectId, UpdateProjectRequest request) {
        Project findProject = projectRepository.findById(projectId)
                .orElseThrow(() -> new NotFoundException(PROJECT_NOT_FOUND));
        if(!memberProjectRepository.existsByMemberAndProject(member, findProject)){
            throw new NotFoundException(MEMBER_PROJECT_NOT_FOUND);
        }

        findProject.updateProject(request.getProjectName(), request.getProjectDescription(), request.getProjectStartedDate(), request.getProjectFinishedDate(), request.getProjectGithubUrl(), request.getProjectJiraUrl(), request.getProjectNotionUrl(), request.getProjectFigmaUrl());
    }

    @Transactional
    @Override
    public void updateProjectImg(Member member, Long projectId, MultipartFile projectImg) {
        Project findProject = projectRepository.findById(projectId)
                .orElseThrow(() -> new NotFoundException(PROJECT_NOT_FOUND));
        if(!memberProjectRepository.existsByMemberAndProject(member, findProject)){
            throw new NotFoundException(MEMBER_PROJECT_NOT_FOUND);
        }

        
        if (findProject.getProjectImg() != null) {
            s3Uploader.deleteFile(s3Uploader.PROJECT_IMAGE_URL + findProject.getProjectImg());
        }

        String fileName = s3Uploader.uploadFile(projectImg, s3Uploader.PROJECT_IMAGE_URL);
        findProject.updateProjectImg(fileName);

    }

    @Transactional
    @Override
    public void deleteProject(Member member, Long projectId) {
        Project findProject = projectRepository.findById(projectId)
                .orElseThrow(() -> new NotFoundException(PROJECT_NOT_FOUND));
        if(!memberProjectRepository.existsByMemberAndProject(member, findProject)){
            throw new NotFoundException(MEMBER_PROJECT_NOT_FOUND);
        }

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
    public List<ProjectMemberResponse> findProjectMemberJiraList(Long projectId) {
        Project findProject = projectRepository.findById(projectId)
                .orElseThrow(() -> new NotFoundException(PROJECT_NOT_FOUND));
        String jiraId = findProject.getJiraId();
        String jiraApiKey = findProject.getJiraApiKey();
        String jiraDomain = findProject.getJiraDomain();
        String jiraProjectKey = findProject.getJiraProjectKey();

        if(jiraDomain == null || jiraDomain.equals("")) {
            return new ArrayList<ProjectMemberResponse>();
        }

        try {
            List<JiraApi.JiraUser> jiraUser = JiraApi.getJiraUser(jiraId, jiraApiKey, jiraDomain,jiraProjectKey);

            List<MemberProject> findMemberProjects = projectQueryRepository.findProjectMemberList(projectId);


            List<ProjectMemberResponse> projectMemberResponses = new ArrayList<>();
            for (int i = 0; i < findMemberProjects.size(); i++) {
                for (int j = 0; j < jiraUser.size(); j++) {
                    if(findMemberProjects.get(i).getMember().getMemberJiraEmail().equals("") ||
                            findMemberProjects.get(i).getMember().getMemberJiraEmail() == null) continue;
                    if(findMemberProjects.get(i).getMember().getMemberJiraEmail().equals(jiraUser.get(j).getUserEmailAddress())){

                        projectMemberResponses.add(ProjectMemberResponse.from(findMemberProjects.get(i).getMember()));
                        break;
                    }
                }
            }

            return projectMemberResponses;

        }catch (Exception e){
            throw new JiraException(JiraException.JIRA_FAIL);
        }
    }

    @Override
    @Transactional
    public List<ProjectMemberResponse> findByMemberEmail(FindByMemberEmailRequest request) {
        System.out.println("request.getMemberEmail() = " + request.getMemberEmail());
        List<Member> findMember = memberRepository.findByMemberEmailContains(request.getMemberEmail());

        return findMember.stream().map(member -> ProjectMemberResponse.from(member)).collect(Collectors.toList());
    }

    @Transactional
    @Override
    public void addProjectMember(Member member, Long projectId, Long memberId) {
        Project findProject = projectRepository.findById(projectId)
                .orElseThrow(() -> new NotFoundException(PROJECT_NOT_FOUND));
        if(!memberProjectRepository.existsByMemberAndProject(member, findProject)){
            throw new NotFoundException(MEMBER_PROJECT_NOT_FOUND);
        }else{
             Member findMember = memberRepository.findById(memberId)
                    .orElseThrow(() -> new NotFoundException(MEMBER_NOT_FOUND));
            if(memberProjectRepository.existsByMemberAndProject(findMember, findProject)){
                throw new DuplicateException(MEMBER_PROJECT_DUPLICATE);
            }

            MemberProject memberProject = MemberProject.createMemberProject(findMember, findProject);
            memberProjectRepository.save(memberProject);
        }
    }

    @Transactional
    @Override
    public void deleteProjectMember(Member member, Long projectId, Long memberId) {
        Project findProject = projectRepository.findById(projectId)
                .orElseThrow(() -> new NotFoundException(PROJECT_NOT_FOUND));
        if(!memberProjectRepository.existsByMemberAndProject(member, findProject)){
            throw new NotFoundException(MEMBER_PROJECT_NOT_FOUND);
        }

        Member findMember = memberRepository.findById(memberId)
                .orElseThrow(() -> new NotFoundException(MEMBER_NOT_FOUND));
        if(!memberProjectRepository.existsByMemberAndProject(findMember, findProject)){
            throw new NotFoundException(MEMBER_PROJECT_NOT_FOUND);
        }

        MemberProject memberProject = memberProjectRepository.findByMemberAndProject(findMember, findProject);
        memberProjectRepository.delete(memberProject);
    }
}
