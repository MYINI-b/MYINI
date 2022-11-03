package com.ssafy.myini.project.controller;

import com.ssafy.myini.config.LoginMember;
import com.ssafy.myini.member.domain.Member;
import com.ssafy.myini.project.request.FindByMemberEmailRequest;
import com.ssafy.myini.project.request.UpdateProjectRequest;
import com.ssafy.myini.project.response.ProjectInfoResponse;
import com.ssafy.myini.project.response.ProjectListResponse;
import com.ssafy.myini.project.response.ProjectMemberResponse;
import com.ssafy.myini.project.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.List;

@RequestMapping("/api/projects")
@RestController
@RequiredArgsConstructor
public class ProjectController {
    private final ProjectService projectService;

    // 프로젝트 등록
    @PostMapping
    public ResponseEntity<Void> createProject(@LoginMember Member member){
        projectService.createProject(member);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    // 회원의 프로젝트 전체 리스트
    @GetMapping
    public ResponseEntity<List<ProjectListResponse>> findAll(@LoginMember Member member){
        List<ProjectListResponse> body = projectService.findAll(member);
        return ResponseEntity.ok().body(body);
    }

    // 프로젝트 단건 조회
    @GetMapping("/{projectid}")
    public ResponseEntity<ProjectInfoResponse> findByProjectId(@PathVariable("projectid")Long projectId){
        ProjectInfoResponse body = projectService.findByProjectId(projectId);
        return ResponseEntity.ok().body(body);
    }

    // 프로젝트 수정
    @PutMapping("/{projectid}")
    public ResponseEntity<Void> updateProject(@PathVariable("projectid")Long projectId,
                                              @RequestBody @Valid UpdateProjectRequest request){
        projectService.updateProject(projectId, request);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    // 프로젝트 이미지 변경
    @PatchMapping("/{projectid}/images")
    public ResponseEntity<Void> updateProjectImg(@PathVariable("projectid")Long projectId, MultipartFile projectImg){
        System.out.println("projectImg = " + projectImg);
        projectService.updateProjectImg(projectId, projectImg);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    // 프로젝트 삭제
    @DeleteMapping("/{projectid}")
    public ResponseEntity<Void> deleteProject(@PathVariable("projectid")Long projectId){
        projectService.deleteProject(projectId);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    // 프로젝트 팀원 리스트 조회
    @GetMapping("/members/{projectid}")
    public ResponseEntity<List<ProjectMemberResponse>> findProjectMemberList(@PathVariable("projectid")Long projectId){
        List<ProjectMemberResponse> body = projectService.findProjectMemberList(projectId);
        return ResponseEntity.ok().body(body);
    }

    // 프로젝트 팀원 검색
    @GetMapping("/members")
    public ResponseEntity<ProjectMemberResponse> findByMemberEmail(@RequestBody @Valid FindByMemberEmailRequest request){
        ProjectMemberResponse body = projectService.findByMemberEmail(request);
        return ResponseEntity.ok().body(body);
    }

    // 프로젝트 팀원 추가
    @PostMapping("/{projectid}/members/{memberid}")
    public ResponseEntity<Void> addProjectMember(@PathVariable("projectid")Long projectId,
                                                 @PathVariable("memberid")Long memberId){
        projectService.addProjectMember(projectId, memberId);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    // 프로젝트 팀원 삭제
    @DeleteMapping("/{projectid}/members/{memberid}")
    public ResponseEntity<Void> deleteProjectMember(@PathVariable("projectid")Long projectId,
                                                    @PathVariable("memberid")Long memberId){
        projectService.deleteProjectMember(projectId, memberId);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

}
