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
    @PostMapping("/{projectid}/controllers")
    public ResponseEntity<ApiControllerCreateResponse> createApiController(@PathVariable("projectid")Long projectId,
                                                    @RequestBody @Valid CreateApiControllerRequest request){
        ApiControllerCreateResponse body = apiDocsService.createApiController(projectId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(body);
    }

    // API컨트롤러정보 리스트 조회
    @GetMapping("/{projectid}/controllers/list")
    public ResponseEntity<List<ApiControllerResponse>> findApiControllerInfoList(@PathVariable("projectid")Long projectId){
        List<ApiControllerResponse> body = apiDocsService.findApiControllerInfoList(projectId);
        return ResponseEntity.ok().body(body);
    }

    // API컨트롤러 리스트 조회
    @GetMapping("/{projectid}/controllers")
    public ResponseEntity<List<ApiControllerListResponse>> findApiControllerList(@PathVariable("projectid")Long projectId){
        List<ApiControllerListResponse> body = apiDocsService.findApiControllerList(projectId);
        return ResponseEntity.ok().body(body);
    }

    // API컨트롤러 조회
    @GetMapping("/controllers/{apicontrollerid}")
    public ResponseEntity<ApiControllerResponse> findByApiControllerId(@PathVariable("apicontrollerid")Long apiControllerId){
        ApiControllerResponse body = apiDocsService.findByApiControllerId(apiControllerId);
        return ResponseEntity.ok().body(body);
    }

    // API컨트롤러 수정
    @PutMapping("/controllers/{apicontrollerid}")
    public ResponseEntity<Void> updateApiController(@PathVariable("apicontrollerid")Long apiControllerId,
                                                    @RequestBody @Valid UpdateApiControllerRequest request){
        apiDocsService.updateApiController(apiControllerId, request);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    // API컨트롤러 삭제
    @DeleteMapping("/controllers/{apicontrollerid}")
    public ResponseEntity<Void> deleteApiController(@PathVariable("apicontrollerid")Long apiControllerId){
        apiDocsService.deleteApiController(apiControllerId);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    // API 생성
    @PostMapping("/{apicontrollerid}/apis")
    public ResponseEntity<ApiResponse> createApi(@PathVariable("apicontrollerid")Long apiControllerId,
                                          @RequestBody @Valid CreateApiRequest request){
        ApiResponse body = apiDocsService.createApi(apiControllerId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(body);
    }

    // API 수정
    @PutMapping("/apis/{apiid}")
    public ResponseEntity<Void> updateApi(@PathVariable("apiid")Long apiId,
                                          @RequestBody @Valid UpdateApiRequest request){
        apiDocsService.updateApi(apiId, request);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    // API 삭제
    @DeleteMapping("/apis/{apiid}")
    public ResponseEntity<Void> deleteApi(@PathVariable("apiid")Long apiId){
        apiDocsService.deleteApi(apiId);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    // API 조회
    @GetMapping("/apis/{apiid}")
    public ResponseEntity<ApiInfoResponse> findByApiId(@PathVariable("apiid")Long apiId){
        ApiInfoResponse body = apiDocsService.findByApiId(apiId);
        return ResponseEntity.ok().body(body);
    }

    // PathVariable 생성
    @PostMapping("/{apiid}/pathvariables")
    public ResponseEntity<PathVariableResponse> createPathVariable(@PathVariable("apiid")Long apiId,
                                                   @RequestBody @Valid CreatePathVariableRequest request) {
        PathVariableResponse body = apiDocsService.createPathVariable(apiId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(body);
    }

    // PathVariable 수정
    @PutMapping("/pathvariables/{pathvariableid}")
    public ResponseEntity<Void> updatePathVariable(@PathVariable("pathvariableid")Long pathVariableId,
                                                   @RequestBody @Valid UpdatePathVariableRequest request){
        apiDocsService.updatePathVariable(pathVariableId, request);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    // PathVariable 삭제
    @DeleteMapping("/pathvariables/{pathvariableid}")
    public ResponseEntity<Void> deletePathVariable(@PathVariable("pathvariableid")Long pathVariableId){
        apiDocsService.deletePathVariable(pathVariableId);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    // QueryString 생성
    @PostMapping("/{apiid}/querystrings")
    public ResponseEntity<QueryStringResponse> createQueryString(@PathVariable("apiid")Long apiId,
                                                   @RequestBody @Valid CreateQueryStringRequest request) {
        QueryStringResponse body = apiDocsService.createQueryString(apiId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(body);
    }

    // QueryString 수정
    @PutMapping("/querystrings/{querystringid}")
    public ResponseEntity<Void> updateQueryString(@PathVariable("querystringid")Long queryStringId,
                                                   @RequestBody @Valid UpdateQueryStringRequest request){
        apiDocsService.updateQueryString(queryStringId, request);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    // QueryString 삭제
    @DeleteMapping("/querystrings/{querystringid}")
    public ResponseEntity<Void> deleteQueryString(@PathVariable("querystringid")Long queryStringId){
        apiDocsService.deleteQueryString(queryStringId);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    // Dto 생성
    @PostMapping("/{projectid}/customdtos")
    public ResponseEntity<DtoCreateResponse> createCustomDto(@PathVariable("projectid")Long projectId,
                                               @RequestBody @Valid CreateDtoRequest request){
        DtoCreateResponse body = apiDocsService.createCustomDto(projectId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(body);
    }

    // Response Request 생성
    @PostMapping("/{apiid}/dtos")
    public ResponseEntity<DtoCreateResponse> createDto(@PathVariable("apiid")Long apiId,
                                                  @RequestBody @Valid CreateDtoRequest request) {
        DtoCreateResponse body = apiDocsService.createDto(apiId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(body);
    }

    // Dto 수정
    @PutMapping("/dtos/{dtoid}")
    public ResponseEntity<Void> updateDto(@PathVariable("dtoid")Long dtoId,
                                                  @RequestBody @Valid UpdateDtoRequest request){
        apiDocsService.updateDto(dtoId, request);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    // Dto 삭제
    @DeleteMapping("/dtos/{dtoid}")
    public ResponseEntity<Void> deleteDto(@PathVariable("dtoid")Long dtoId){
        apiDocsService.deleteDto(dtoId);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    // Dto 조회
    @GetMapping("/dtos/{dtoid}")
    public ResponseEntity<DtoResponse> findByDtoId(@PathVariable("dtoid")Long dtoId){
        DtoResponse body = apiDocsService.findByDtoId(dtoId);
        return ResponseEntity.ok().body(body);
    }

    // Dto변수 생성
    @PostMapping("/{dtoid}/dtoitems")
    public ResponseEntity<DtoItemResponse> createDtoItem(@PathVariable("dtoid")Long dtoId,
                                              @RequestBody @Valid CreateDtoItemRequest request){
        DtoItemResponse body = apiDocsService.createDtoItem(dtoId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(body);
    }

    // Dto변수 수정
    @PutMapping("/dtoitems/{dtoitemid}")
    public ResponseEntity<Void> updateDtoItem(@PathVariable("dtoitemid")Long dtoItemId,
                                          @RequestBody @Valid UpdateDtoItemRequest request){
        apiDocsService.updateDtoItem(dtoItemId, request);
        return ResponseEntity.status(HttpStatus.OK).build();
    }


    // Dto변수 삭제
    @DeleteMapping("/dtoitems/{dtoitemid}")
    public ResponseEntity<Void> deleteDtoItem(@PathVariable("dtoitemid")Long dtoItemId){
        apiDocsService.deleteDtoItem(dtoItemId);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    // 자료형 리스트 조회
    @GetMapping("/{projectid}/types")
    public ResponseEntity<TypeListResponse> findTypeList(@PathVariable("projectid")Long projectId){
        TypeListResponse body = apiDocsService.findTypeList(projectId);
        return ResponseEntity.ok().body(body);
    }

    // primitive 자료형 조회
    @GetMapping("/primitive")
    public ResponseEntity<List<PrimitiveTypeResponse>> findPrimitiveType(){
        List<PrimitiveTypeResponse> body = apiDocsService.findPrimitiveType();
        return ResponseEntity.ok().body(body);
    }

    // Dto type 자료형 조회
    @GetMapping("/{projectid}/dtotype")
    public ResponseEntity<List<ClassTypeResponse>> findDtoClassType(@PathVariable("projectid")Long projectId){
        List<ClassTypeResponse> body = apiDocsService.findDtoClassType(projectId);
        return ResponseEntity.ok().body(body);
    }

    @GetMapping("/{projectid}/lists")
    public ResponseEntity<List<ProjectInfoListResponse>> findAll(@PathVariable("projectid")Long projectId){
        List<ProjectInfoListResponse> body = apiDocsService.findAll(projectId);
        return ResponseEntity.ok().body(body);
    }
}
