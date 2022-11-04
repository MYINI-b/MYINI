package com.ssafy.myini.requirementdocs.controller;

import com.ssafy.myini.requirementdocs.request.*;
import com.ssafy.myini.requirementdocs.response.RequirementCategoryListResponse;
import com.ssafy.myini.requirementdocs.response.RequirementListResponse;
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

    @GetMapping("/{projectid}")
    public ResponseEntity<List<RequirementListResponse>> findAllRequirement(@PathVariable("projectid") Long projectId){
        List<RequirementListResponse> body = requirementDocsService.findAllRequirement(projectId);

        return ResponseEntity.ok().body(body);
    }

    @PostMapping("/{projectid}/requirements")
    public ResponseEntity<Void> createRequirement(@PathVariable("projectid") Long projectId){
        requirementDocsService.createRequirement(projectId);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping("/requirements/{requirementid}/categories")
    public ResponseEntity<Void> updateRequirementCategory(@PathVariable("requirementid") Long requirementId,
                                                          @RequestBody RequirementCategoryUpdateRequest requirementCategoryUpdateRequest){
        requirementDocsService.updateRequirementCategory(requirementId,requirementCategoryUpdateRequest);

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PutMapping("/requirements/{requirementid}/names")
    public ResponseEntity<Void> updateRequirementName(@PathVariable("requirementid") Long requirementId,
                                                      @RequestBody RequirementNameUpdateRequest requirementNameUpdateRequest){
        requirementDocsService.updateRequirementName(requirementId,requirementNameUpdateRequest);

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PutMapping("/requirements/{requirementid}/contents")
    public ResponseEntity<Void> updateRequirementContent(@PathVariable("requirementid") Long requirementId,
                                                         @RequestBody RequirementContentUpdateRequest requirementContentUpdateRequest){
        requirementDocsService.updateRequirementContent(requirementId,requirementContentUpdateRequest);

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PutMapping("/requirements/{requirementid}/parts")
    public ResponseEntity<Void> updateRequirementPart(@PathVariable("requirementid") Long requirementId,
                                                      @RequestBody RequirementPartUpdateRequest requirementPartUpdateRequest){
        requirementDocsService.updateRequirementPart(requirementId,requirementPartUpdateRequest);

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PutMapping("/requirements/{requirementid}/members")
    public ResponseEntity<Void> updateRequirementMember(@PathVariable("requirementid") Long requirementId,
                                                        @RequestBody RequirementMemberUpdateRequest requirementMemberUpdateRequest){
        requirementDocsService.updateRequirementMember(requirementId,requirementMemberUpdateRequest);

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PutMapping("/requirements/{requirementid}/priorities")
    public ResponseEntity<Void> updateRequirementPriority(@PathVariable("requirementid") Long requirementId,
                                                          @RequestBody RequirementPriorityUpdateRequest requirementPriorityUpdateRequest){
        requirementDocsService.updateRequirementPriority(requirementId,requirementPriorityUpdateRequest);

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PutMapping("/requirements/{requirementid}/storypoints")
    public ResponseEntity<Void> updateRequirementStoryPoint(@PathVariable("requirementid") Long requirementId,
                                                            @RequestBody RequirementStoryPointUpdateRequest requirementStoryPointUpdateRequest){
        requirementDocsService.updateRequirementStoryPoint(requirementId,requirementStoryPointUpdateRequest);

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @DeleteMapping("/requirements/{requirementid}")
    public ResponseEntity<Void> deleteRequirement(@PathVariable("requirementid") Long requirementId){
        requirementDocsService.deleteRequirement(requirementId);

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping("/{projectid}/categories")
    public ResponseEntity<List<RequirementCategoryListResponse>> findAllRequirementsCategory(@PathVariable("projectid") Long projectId){
        List<RequirementCategoryListResponse> body = requirementDocsService.findAllRequirementsCategory(projectId);

        return ResponseEntity.ok().body(body);
    }

    @PostMapping("/{projectid}/categories")
    public ResponseEntity<Void> createRequirementCategory(@PathVariable("projectid") Long projectId,
                                                          @RequestBody RequirementCategoryCreateRequest requirementCategoryCreateRequest){
        requirementDocsService.createRequirementCategory(projectId,requirementCategoryCreateRequest);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @DeleteMapping("/categories/{requirementcategoryid}")
    public ResponseEntity<Void> deleteRequirementCategory(@PathVariable("requirementcategoryid") Long requirementCategoryId){
        requirementDocsService.deleteRequirementCategory(requirementCategoryId);

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PostMapping("/jira")
    public ResponseEntity<Void> jira(){
        requirementDocsService.jira();

        return ResponseEntity.status(HttpStatus.OK).build();
    }

}
