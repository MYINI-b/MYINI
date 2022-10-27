package com.ssafy.myini.apidocs.service;

import com.ssafy.myini.apidocs.request.*;
import com.ssafy.myini.apidocs.response.*;

import java.util.List;

public interface ApiDocsService {
    //API 컨트롤러 생성
    void createApiController(Long projectId, CreateApiControllerRequest request);
    //API 컨트롤러 리스트 조회
    List<ApiControllerListResponse> findApiControllerList(Long projectId);
    //API 컨트롤러 조회
    ApiControllerResponse findByApiControllerId(Long projectId, Long apiControllerId);
    //API 컨트롤러 수정
    void updateApiController(Long projectId, Long apiControllerId, UpdateApiControllerRequest request);
    //API 컨트롤러 삭제
    void deleteApiController(Long projectId, Long apiControllerId);
    //API 생성
    void createApi(Long projectId, Long apiControllerId, CreateApiRequest request);
    //API 수정
    void updateApi(Long projectId, Long apiControllerId, Long apiId, UpdateApiRequest request);
    //API 삭제
    void deleteApi(Long projectId, Long apiControllerId, Long apiId);
    //API 조회
    ApiInfoResponse findByApiId(Long projectId, Long apiControllerId, Long apiId);
    //PathVariable 생성
    void createPathVariable(Long projectId, Long apiControllerId, Long apiId, CreatePathVariableRequest request);
    //PathVariable 수정
    void updatePathVariable(Long projectId, Long apiControllerId, Long apiId, Long pathVariableId, UpdatePathVariableRequest request);
    //PathVariable 삭제
    void deletePathVariable(Long projectId, Long apiControllerId, Long apiId, Long pathVariableId);
    //QueryString 생성
    void createQueryString(Long projectId, Long apiControllerId, Long apiId, CreateQueryStringRequest request);
    //QueryString 수정
    void updateQueryString(Long projectId, Long apiControllerId, Long apiId, Long queryStringId, UpdateQueryStringRequest request);
    //QueryString 삭제
    void deleteQueryString(Long projectId, Long apiControllerId, Long apiId, Long queryStringId);
    //DTO 생성
    void createDto(Long projectId, Long apiControllerId, Long apiId, CreateDtoRequest request);
    //DTO 수정
    void updateDto(Long projectId, Long apiControllerId, Long apiId, Long dtoId, UpdateDtoRequest request);
    //DTO 삭제
    void deleteDto(Long projectId, Long apiControllerId, Long apiId, Long dtoId);
    //DTO 조회
    DtoResponse findByDtoId(Long projectId, Long apiControllerId, Long apiId, Long dtoId);
    //DTO 변수 생성
    void createDtoItem(Long projectId, Long apiControllerId, Long apiId, Long dtoId, CreateDtoItemRequest request);
    //DTO 변수 수정
    void updateDtoItem(Long projectId, Long apiControllerId, Long apiId, Long dtoId, Long dtoItemId, UpdateDtoItemRequest request);
    //DTO 변수 삭제
    void deleteDtoItem(Long projectId, Long apiControllerId, Long apiId, Long dtoId, Long dtoItemId);
    //자료형 리스트 조회
    TypeListResponse findTypeList(Long projectId);
}
