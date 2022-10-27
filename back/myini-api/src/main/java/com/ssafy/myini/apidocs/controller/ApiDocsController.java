package com.ssafy.myini.apidocs.controller;

import com.ssafy.myini.apidocs.request.*;
import com.ssafy.myini.apidocs.response.*;
import com.ssafy.myini.apidocs.service.ApiDocsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RequestMapping("/api/apidocs")
@RestController
@RequiredArgsConstructor
public class ApiDocsController {
    private final ApiDocsService apiDocsService;

    // API컨트롤러 생성
    @PostMapping("/{project_id}/controller")
    public ResponseEntity<Void> createApiController(@PathVariable("project_id")Long projectId,
                                                    @RequestBody @Valid CreateApiControllerRequest request){
        apiDocsService.createApiController(projectId, request);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    // API컨트롤러 리스트 조회
    @GetMapping("/{project_id}/controller")
    public ResponseEntity<List<ApiControllerListResponse>> findApiControllerList(@PathVariable("project_id")Long projectId){
        List<ApiControllerListResponse> body = apiDocsService.findApiControllerList(projectId);
        return ResponseEntity.ok().body(body);
    }

    // API컨트롤러 조회
    @GetMapping("/controller/{api_controller_id}")
    public ResponseEntity<ApiControllerResponse> findByApiControllerId(@PathVariable("api_controller_id")Long apiControllerId){
        ApiControllerResponse body = apiDocsService.findByApiControllerId(apiControllerId);
        return ResponseEntity.ok().body(body);
    }

    // API컨트롤러 수정
    @PutMapping("/controller/{api_controller_id}")
    public ResponseEntity<Void> updateApiController(@PathVariable("api_controller_id")Long apiControllerId,
                                                    @RequestBody @Valid UpdateApiControllerRequest request){
        apiDocsService.updateApiController(apiControllerId, request);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    // API컨트롤러 삭제
    @DeleteMapping("/controller/{api_controller_id}")
    public ResponseEntity<Void> deleteApiController(@PathVariable("api_controller_id")Long apiControllerId){
        apiDocsService.deleteApiController(apiControllerId);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    // API 생성
    @PostMapping("/{api_controller_id}/api")
    public ResponseEntity<Void> createApi(@PathVariable("api_controller_id")Long apiControllerId,
                                          @RequestBody @Valid CreateApiRequest request){
        apiDocsService.createApi(apiControllerId, request);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    // API 수정
    @PutMapping("/api/{api_id}")
    public ResponseEntity<Void> updateApi(@PathVariable("api_id")Long apiId,
                                          @RequestBody @Valid UpdateApiRequest request){
        apiDocsService.updateApi(apiId, request);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    // API 삭제
    @DeleteMapping("/api/{api_id}")
    public ResponseEntity<Void> deleteApi(@PathVariable("api_id")Long apiId){
        apiDocsService.deleteApi(apiId);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    // API 조회
    @GetMapping("/api/{api_id}")
    public ResponseEntity<ApiInfoResponse> findByApiId(@PathVariable("api_id")Long apiId){
        ApiInfoResponse body = apiDocsService.findByApiId(apiId);
        return ResponseEntity.ok().body(body);
    }

    // PathVariable 생성
    @PostMapping("/{api_id}/pathvariable")
    public ResponseEntity<Void> createPathVariable(@PathVariable("api_id")Long apiId,
                                                   @RequestBody @Valid CreatePathVariableRequest request) {
        apiDocsService.createPathVariable(apiId, request);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    // PathVariable 수정
    @PutMapping("/pathvariable/{path_variable_id}")
    public ResponseEntity<Void> updatePathVariable(@PathVariable("path_variable_id")Long pathVariableId,
                                                   @RequestBody @Valid UpdatePathVariableRequest request){
        apiDocsService.updatePathVariable(pathVariableId, request);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    // PathVariable 삭제
    @DeleteMapping("/pathvariable/{path_variable_id}")
    public ResponseEntity<Void> deletePathVariable(@PathVariable("path_variable_id")Long pathVariableId){
        apiDocsService.deletePathVariable(pathVariableId);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    // QueryString 생성
    @PostMapping("/{api_id}/querystring")
    public ResponseEntity<Void> createQueryString(@PathVariable("api_id")Long apiId,
                                                   @RequestBody @Valid CreateQueryStringRequest request) {
        apiDocsService.createQueryString(apiId, request);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    // QueryString 수정
    @PutMapping("/querystring/{query_string_id}")
    public ResponseEntity<Void> updateQueryString(@PathVariable("query_string_id")Long queryStringId,
                                                   @RequestBody @Valid UpdateQueryStringRequest request){
        apiDocsService.updateQueryString(queryStringId, request);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    // QueryString 삭제
    @DeleteMapping("/querystring/{query_string_id}")
    public ResponseEntity<Void> deleteQueryString(@PathVariable("query_string_id")Long queryStringId){
        apiDocsService.deleteQueryString(queryStringId);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    // Dto 생성
    @PostMapping("/{api_id}/dto")
    public ResponseEntity<Void> createDto(@PathVariable("api_id")Long apiId,
                                                  @RequestBody @Valid CreateDtoRequest request) {
        apiDocsService.createDto(apiId, request);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    // Dto 수정
    @PutMapping("/dto/{dto_id}")
    public ResponseEntity<Void> updateDto(@PathVariable("dto_id")Long dtoId,
                                                  @RequestBody @Valid UpdateDtoRequest request){
        apiDocsService.updateDto(dtoId, request);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    // Dto 삭제
    @DeleteMapping("/dto/{dto_id}")
    public ResponseEntity<Void> deleteDto(@PathVariable("dto_id")Long dtoId){
        apiDocsService.deleteDto(dtoId);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    // Dto 조회
    @GetMapping("/dto/{dto_id}")
    public ResponseEntity<DtoResponse> findByDtoId(@PathVariable("dto_id")Long dtoId){
        DtoResponse body = apiDocsService.findByDtoId(dtoId);
        return ResponseEntity.ok().body(body);
    }

    // Dto변수 생성
    @PostMapping("/{dto_id}/dtoitem")
    public ResponseEntity<Void> createDtoItem(@PathVariable("dto_id")Long dtoId,
                                              @RequestBody @Valid CreateDtoItemRequest request){
        apiDocsService.createDtoItem(dtoId, request);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    // Dto변수 수정
    @PutMapping("/dtoitem/{dto_item_id}")
    public ResponseEntity<Void> updateDtoItem(@PathVariable("dto_item_id")Long dtoItemId,
                                          @RequestBody @Valid UpdateDtoItemRequest request){
        apiDocsService.updateDtoItem(dtoItemId, request);
        return ResponseEntity.status(HttpStatus.OK).build();
    }


    // Dto변수 삭제
    @DeleteMapping("/dtoitem/{dto_item_id}")
    public ResponseEntity<Void> deleteDtoItem(@PathVariable("dto_item_id")Long dtoItemId){
        apiDocsService.deleteDtoItem(dtoItemId);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    // 자료형 리스트 조회
    @GetMapping("/{project_id}/type")
    public ResponseEntity<TypeListResponse> findTypeList(@PathVariable("project_id")Long projectId){
        TypeListResponse body = apiDocsService.findTypeList(projectId);
        return ResponseEntity.ok().body(body);
    }
}
