package com.ssafy.myini.project.service;

import com.ssafy.myini.member.domain.Member;
import com.ssafy.myini.project.request.FindByMemberEmailRequest;
import com.ssafy.myini.project.request.UpdateProjectRequest;
import com.ssafy.myini.project.response.ProjectInfoResponse;
import com.ssafy.myini.project.response.ProjectListResponse;
import com.ssafy.myini.project.response.ProjectMemberResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProjectService {
    // 프로젝트 등록
    void createProject(Member member);

    // 프로젝트 전체 리스트
    List<ProjectListResponse> findAll(Member member);

    // 프로젝트 단건 조회
    ProjectInfoResponse findByProjectId(Long projectId);

    // 프로젝트 수정
    void updateProject(Long projectId, UpdateProjectRequest request);

    // 프로젝트 이미지 수정
    void updateProjectImg(Long projectId, MultipartFile projectImg);

    // 프로젝트 삭제
    void deleteProject(Long projectId);

    // 프로젝트 팀원 리스트 조회
    List<ProjectMemberResponse> findProjectMemberList(Long projectId);

    // 프로젝트 팀원 검색
    ProjectMemberResponse findByMemberEmail(FindByMemberEmailRequest request);

    // 프로젝트 팀원 추가
    void addProjectMember(Long projectId, Long memberId);

    // 프로젝트 팀원 삭제
    void deleteProjectMember(Long projectId, Long memberId);
}
