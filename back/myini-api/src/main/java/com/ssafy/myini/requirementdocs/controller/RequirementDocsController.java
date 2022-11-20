package com.ssafy.myini.requirementdocs.controller;

import com.ssafy.myini.requirementdocs.request.*;
import com.ssafy.myini.requirementdocs.response.*;
import com.ssafy.myini.requirementdocs.service.RequirementDocsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/requirementdocs")
@RestController
@RequiredArgsConstructor
public class RequirementDocsController {
    private final RequirementDocsService requirementDocsService;

    //요구사항 전체 조회
    @GetMapping("/{projectid}")
    public ResponseEntity<List<RequirementListResponse>> findAllRequirement(@PathVariable("projectid") Long projectId){
        List<RequirementListResponse> body = requirementDocsService.findAllRequirement(projectId);

        return ResponseEntity.ok().body(body);
    }

    //요구사항 생성
    @PostMapping("/{projectid}/requirements")
    public ResponseEntity<RequirementCreateResponse> createRequirement(@PathVariable("projectid") Long projectId){
        RequirementCreateResponse body = requirementDocsService.createRequirement(projectId);

        return ResponseEntity.status(HttpStatus.CREATED).body(body);
    }

    //요구사항 카테고리 수정
    @PutMapping("/requirements/{requirementid}/categories")
    public ResponseEntity<Void> updateRequirementCategory(@PathVariable("requirementid") Long requirementId,
                                                          @RequestBody RequirementCategoryUpdateRequest requirementCategoryUpdateRequest){
        requirementDocsService.updateRequirementCategory(requirementId,requirementCategoryUpdateRequest);

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    //요구사항 이름 수정
    @PutMapping("/requirements/{requirementid}/names")
    public ResponseEntity<Void> updateRequirementName(@PathVariable("requirementid") Long requirementId,
                                                      @RequestBody RequirementNameUpdateRequest requirementNameUpdateRequest){
        requirementDocsService.updateRequirementName(requirementId,requirementNameUpdateRequest);

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    //요구사항 내용 수정
    @PutMapping("/requirements/{requirementid}/contents")
    public ResponseEntity<Void> updateRequirementContent(@PathVariable("requirementid") Long requirementId,
                                                         @RequestBody RequirementContentUpdateRequest requirementContentUpdateRequest){
        requirementDocsService.updateRequirementContent(requirementId,requirementContentUpdateRequest);

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    //요구사항 파트 수정
    @PutMapping("/requirements/{requirementid}/parts")
    public ResponseEntity<Void> updateRequirementPart(@PathVariable("requirementid") Long requirementId,
                                                      @RequestBody RequirementPartUpdateRequest requirementPartUpdateRequest){
        requirementDocsService.updateRequirementPart(requirementId,requirementPartUpdateRequest);

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    //요구사항 멤버 수정
    @PutMapping("/requirements/{requirementid}/members")
    public ResponseEntity<Void> updateRequirementMember(@PathVariable("requirementid") Long requirementId,
                                                        @RequestBody RequirementMemberUpdateRequest requirementMemberUpdateRequest){
        requirementDocsService.updateRequirementMember(requirementId,requirementMemberUpdateRequest);

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    //요구사항 우선순위 수정
    @PutMapping("/requirements/{requirementid}/priorities")
    public ResponseEntity<Void> updateRequirementPriority(@PathVariable("requirementid") Long requirementId,
                                                          @RequestBody RequirementPriorityUpdateRequest requirementPriorityUpdateRequest){
        requirementDocsService.updateRequirementPriority(requirementId,requirementPriorityUpdateRequest);

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    //요구사항 스토리포인트 수정
    @PutMapping("/requirements/{requirementid}/storypoints")
    public ResponseEntity<Void> updateRequirementStoryPoint(@PathVariable("requirementid") Long requirementId,
                                                            @RequestBody RequirementStoryPointUpdateRequest requirementStoryPointUpdateRequest){
        requirementDocsService.updateRequirementStoryPoint(requirementId,requirementStoryPointUpdateRequest);

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    //요구사항 삭제
    @DeleteMapping("/requirements/{requirementid}")
    public ResponseEntity<Void> deleteRequirement(@PathVariable("requirementid") Long requirementId){
        requirementDocsService.deleteRequirement(requirementId);

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    //요구사항 카테고리 조회
    @GetMapping("/{projectid}/categories")
    public ResponseEntity<List<RequirementCategoryListResponse>> findAllRequirementsCategory(@PathVariable("projectid") Long projectId){
        List<RequirementCategoryListResponse> body = requirementDocsService.findAllRequirementsCategory(projectId);

        return ResponseEntity.ok().body(body);
    }

    //요구사항 카테고리 추가
    @PostMapping("/{projectid}/categories")
    public ResponseEntity<RequirementCategoryCreateResponse> createRequirementCategory(@PathVariable("projectid") Long projectId,
                                                          @RequestBody RequirementCategoryCreateRequest requirementCategoryCreateRequest){
        RequirementCategoryCreateResponse body = requirementDocsService.createRequirementCategory(projectId,requirementCategoryCreateRequest);

        return ResponseEntity.status(HttpStatus.CREATED).body(body);
    }

    //요구사항 카테고리 삭제
    @DeleteMapping("/categories/{requirementcategoryid}")
    public ResponseEntity<Void> deleteRequirementCategory(@PathVariable("requirementcategoryid") Long requirementCategoryId){
        requirementDocsService.deleteRequirementCategory(requirementCategoryId);

        return ResponseEntity.status(HttpStatus.OK).build();
    }

}
