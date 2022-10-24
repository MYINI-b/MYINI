package com.ssafy.myini.apidocs.controller;

import com.ssafy.myini.apidocs.request.*;
import com.ssafy.myini.apidocs.service.ApiDocsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RequestMapping("/api/apidocs")
@RestController
@RequiredArgsConstructor
public class ApiDocsController {

    // API컨트롤러 생성
    @PostMapping("/{project_id}/controller")
    public ResponseEntity<Void> createApiController(@PathVariable("project_id")Long projectId,
                                                    @RequestBody @Valid CreateApiControllerRequest createApiControllerRequest){
        return null;
    }

    // API컨트롤러 리스트 조회
    @GetMapping("/{project_id}/controller")
    public ResponseEntity<Void> findApiControllerList(@PathVariable("project_id")Long projectId){
        return null;
    }

    // API컨트롤러 조회
    @GetMapping("/{project_id}/controller/{api_controller_id}")
    public ResponseEntity<Void> findByApiControllerId(@PathVariable("project_id")Long projectId,
                                                      @PathVariable("api_controller_id")Long apiControllerId){
        return null;
    }

    // API컨트롤러 수정
    @PutMapping("/{project_id}/controller/{api_controller_id}")
    public ResponseEntity<Void> updateApiController(@PathVariable("project_id")Long projectId,
                                                    @PathVariable("api_controller_id")Long apiControllerId,
                                                    @RequestBody @Valid UpdateApiControllerRequest updateApiControllerRequest){
        return null;
    }

    // API컨트롤러 삭제
    @DeleteMapping("/{project_id}/controller/{api_controller_id}")
    public ResponseEntity<Void> deleteApiController(@PathVariable("project_id")Long projectId,
                                                    @PathVariable("api_controller_id")Long apiControllerId){
        return null;
    }

    // API 생성
    @PostMapping("/{project_id}/controller/{api_controller_id}/api")
    public ResponseEntity<Void> createApi(@PathVariable("project_id")Long projectId,
                                          @PathVariable("api_controller_id")Long apiControllerId,
                                          @RequestBody @Valid CreateApiRequest createApiRequest){
        return null;
    }

    // API 수정
    @PutMapping("/{project_id}/controller/{api_controller_id}/api/{api_id}")
    public ResponseEntity<Void> updateApi(@PathVariable("project_id")Long projectId,
                                          @PathVariable("api_controller_id")Long apiControllerId,
                                          @PathVariable("api_id")Long apiId,
                                          @RequestBody @Valid UpdateApiRequest updateApiRequest){
        return null;
    }

    // API 삭제
    @DeleteMapping("/{project_id}/controller/{api_controller_id}/api/{api_id}")
    public ResponseEntity<Void> deleteApi(@PathVariable("project_id")Long projectId,
                                          @PathVariable("api_controller_id")Long apiControllerId,
                                          @PathVariable("api_id")Long apiId){
        return null;
    }

    // API 조회
    @GetMapping("/{project_id}/controller/{api_controller_id}/api/{api_id}")
    public ResponseEntity<Void> findByApiId(@PathVariable("project_id")Long projectId,
                                            @PathVariable("api_controller_id")Long apiControllerId,
                                            @PathVariable("api_id")Long apiId){
        return null;
    }

    // PathVariable 생성
    @PostMapping("/{project_id}/controller/{api_controller_id}/api/{api_id}/pathvariable")
    public ResponseEntity<Void> createPathVariable(@PathVariable("project_id")Long projectId,
                                                   @PathVariable("api_controller_id")Long apiControllerId,
                                                   @PathVariable("api_id")Long apiId,
                                                   @RequestBody @Valid CreatePathVariableRequest createPathVariableRequest) {
        return null;
    }

    // PathVariable 수정
    @PutMapping("/{project_id}/controller/{api_controller_id}/api/{api_id}/pathvariable/{path_variable_id}")
    public ResponseEntity<Void> updatePathVariable(@PathVariable("project_id")Long projectId,
                                                   @PathVariable("api_controller_id")Long apiControllerId,
                                                   @PathVariable("api_id")Long apiId,
                                                   @PathVariable("path_variable_id")Long pathVariableId,
                                                   @RequestBody @Valid UpdatePathVariableRequest updatePathVariableRequest){
        return null;
    }

    // PathVariable 삭제
    @DeleteMapping("/{project_id}/controller/{api_controller_id}/api/{api_id}/pathvariable/{path_variable_id}")
    public ResponseEntity<Void> deletePathVariable(@PathVariable("project_id")Long projectId,
                                                   @PathVariable("api_controller_id")Long apiControllerId,
                                                   @PathVariable("api_id")Long apiId,
                                                   @PathVariable("path_variable_id")Long pathVariableId){
        return null;
    }

    // QueryString 생성
    @PostMapping("/{project_id}/controller/{api_controller_id}/api/{api_id}/querystring")
    public ResponseEntity<Void> createQueryString(@PathVariable("project_id")Long projectId,
                                                   @PathVariable("api_controller_id")Long apiControllerId,
                                                   @PathVariable("api_id")Long apiId,
                                                   @RequestBody @Valid CreateQueryStringRequest createQueryStringRequest) {
        return null;
    }

    // QueryString 수정
    @PutMapping("/{project_id}/controller/{api_controller_id}/api/{api_id}/querystring/{query_string_id}")
    public ResponseEntity<Void> updateQueryString(@PathVariable("project_id")Long projectId,
                                                   @PathVariable("api_controller_id")Long apiControllerId,
                                                   @PathVariable("api_id")Long apiId,
                                                   @PathVariable("query_string_id")Long queryStringId,
                                                   @RequestBody @Valid UpdateQueryStringRequest updateQueryStringRequest){
        return null;
    }

    // QueryString 삭제
    @DeleteMapping("/{project_id}/controller/{api_controller_id}/api/{api_id}/querystring/{query_string_id}")
    public ResponseEntity<Void> deleteQueryString(@PathVariable("project_id")Long projectId,
                                                   @PathVariable("api_controller_id")Long apiControllerId,
                                                   @PathVariable("api_id")Long apiId,
                                                   @PathVariable("query_string_id")Long queryStringId){
        return null;
    }

    // Dto 생성
    @PostMapping("/{project_id}/controller/{api_controller_id}/api/{api_id}/dto")
    public ResponseEntity<Void> createDto(@PathVariable("project_id")Long projectId,
                                                  @PathVariable("api_controller_id")Long apiControllerId,
                                                  @PathVariable("api_id")Long apiId,
                                                  @RequestBody @Valid CreateDtoRequest createDtoRequest) {
        return null;
    }

    // Dto 수정
    @PutMapping("/{project_id}/controller/{api_controller_id}/api/{api_id}/dto/{dto_id}")
    public ResponseEntity<Void> updateDto(@PathVariable("project_id")Long projectId,
                                                  @PathVariable("api_controller_id")Long apiControllerId,
                                                  @PathVariable("api_id")Long apiId,
                                                  @PathVariable("dto_id")Long dtoId,
                                                  @RequestBody @Valid UpdateDtoRequest updateDtoRequest){
        return null;
    }

    // Dto 삭제
    @DeleteMapping("/{project_id}/controller/{api_controller_id}/api/{api_id}/dto/{dto_id}")
    public ResponseEntity<Void> deleteDto(@PathVariable("project_id")Long projectId,
                                                  @PathVariable("api_controller_id")Long apiControllerId,
                                                  @PathVariable("api_id")Long apiId,
                                                  @PathVariable("dto_id")Long dtoId){
        return null;
    }

    // Dto 조회
    @GetMapping("/{project_id}/controller/{api_controller_id}/api/{api_id}/dto/{dto_id}")
    public ResponseEntity<Void> findByDtoId(@PathVariable("project_id")Long projectId,
                                            @PathVariable("api_controller_id")Long apiControllerId,
                                            @PathVariable("api_id")Long apiId,
                                            @PathVariable("dto_id")Long dtoId){
        return null;
    }

    // Dto변수 생성
    @PostMapping("/{project_id}/controller/{api_controller_id}/api/{api_id}/dto/{dto_id}/dtoitem")
    public ResponseEntity<Void> createDtoItem(@PathVariable("project_id")Long projectId,
                                              @PathVariable("api_controller_id")Long apiControllerId,
                                              @PathVariable("api_id")Long apiId,
                                              @PathVariable("dto_id")Long dtoId,
                                              @RequestBody @Valid CreateDtoItemRequest createDtoItemRequest){
        return null;
    }

    // Dto변수 수정
    @PutMapping("/{project_id}/controller/{api_controller_id}/api/{api_id}/dto/{dto_id}/dtoitem/{dto_item_id}")
    public ResponseEntity<Void> updateDtoItem(@PathVariable("project_id")Long projectId,
                                          @PathVariable("api_controller_id")Long apiControllerId,
                                          @PathVariable("api_id")Long apiId,
                                          @PathVariable("dto_id")Long dtoId,
                                          @PathVariable("dto_item_id")Long dtoItemId,
                                          @RequestBody @Valid UpdateDtoItemRequest updateDtoItemRequest){
        return null;
    }


    // Dto변수 삭제
    @DeleteMapping("/{project_id}/controller/{api_controller_id}/api/{api_id}/dto/{dto_id}/dtoitem/{dto_item_id}")
    public ResponseEntity<Void> deleteDtoItem(@PathVariable("project_id")Long projectId,
                                          @PathVariable("api_controller_id")Long apiControllerId,
                                          @PathVariable("api_id")Long apiId,
                                          @PathVariable("dto_id")Long dtoId,
                                          @PathVariable("dto_item_id")Long dtoItemId){
        return null;
    }

    // 자료형 리스트 조회
    @GetMapping("/{project_id}/type")
    public ResponseEntity<Void> findTypeList(@PathVariable("project_id")Long projectId){
        return null;
    }
}
