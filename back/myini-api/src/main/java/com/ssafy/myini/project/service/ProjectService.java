package com.ssafy.myini.project.service;

import com.ssafy.myini.member.domain.Member;
import com.ssafy.myini.project.request.FindByMemberEmailRequest;
import com.ssafy.myini.jira.request.UpdateJiraAccountRequest;
import com.ssafy.myini.jira.request.UpdateJiraProjectRequest;
import com.ssafy.myini.project.request.UpdateProjectRequest;
import com.ssafy.myini.project.response.ProjectInfoResponse;
import com.ssafy.myini.project.response.ProjectListResponse;
import com.ssafy.myini.project.response.ProjectMemberResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProjectService {
    void createProject(Member member);
    List<ProjectListResponse> findAll(Member member);
    ProjectInfoResponse findByProjectId(Long projectId);
    void updateProject(Member member, Long projectId, UpdateProjectRequest request);
    void updateProjectImg(Member member, Long projectId, MultipartFile projectImg);
    void deleteProject(Member member, Long projectId);
    List<ProjectMemberResponse> findProjectMemberList(Long projectId);
    ProjectMemberResponse findByMemberEmail(FindByMemberEmailRequest request);
    void addProjectMember(Member member, Long projectId, Long memberId);
    void deleteProjectMember(Member member, Long projectId, Long memberId);
}
