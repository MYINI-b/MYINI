package com.ssafy.myini.jira.controller;

import com.ssafy.myini.config.LoginMember;
import com.ssafy.myini.jira.request.CreateJiraIssueRequest;
import com.ssafy.myini.jira.request.UpdateJiraAccountRequest;
import com.ssafy.myini.jira.request.UpdateJiraProjectRequest;
import com.ssafy.myini.jira.service.JiraService;
import com.ssafy.myini.member.domain.Member;
import com.ssafy.myini.requirementdocs.response.JiraProjectListResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RequestMapping("/api/jiras")
@RestController
@RequiredArgsConstructor
public class JiraController {
    private final JiraService jiraService;

    // 프로젝트 지라 연동 수정
    @PutMapping("/{projectid}/jiraaccount")
    public ResponseEntity<Void> updateJiraAccount(@LoginMember Member member,
                                                  @PathVariable("projectid")Long projectId,
                                                  @RequestBody @Valid UpdateJiraAccountRequest request){
        jiraService.updateJiraAccount(member,projectId,request);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    // 프로젝트 지라 프로젝트 수정
    @PutMapping("/{projectid}/jiraproject")
    public ResponseEntity<Void> updateJiraProject(@LoginMember Member member,
                                                  @PathVariable("projectid")Long projectId,
                                                  @RequestBody @Valid UpdateJiraProjectRequest request){
        jiraService.updateJiraProject(member,projectId,request);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    //지라 프로젝트 리스트
    @GetMapping("/{projectid}/projects")
    public ResponseEntity<List<JiraProjectListResponse>> findJiraProjectList(@PathVariable("projectid")Long projectId){
        List<JiraProjectListResponse> body = jiraService.findJiraProjectList(projectId);

        return ResponseEntity.ok().body(body);
    }

    //지라 이슈 등록
    @PostMapping("/{projectid}/createissue")
    public ResponseEntity<Void> jiraCreateIssue(@PathVariable("projectid")Long projectId,
                                                @RequestBody @Valid CreateJiraIssueRequest createJiraIssueRequest){
        jiraService.jiraCreateIssue(projectId, createJiraIssueRequest);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
