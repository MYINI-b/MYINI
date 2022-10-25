package com.ssafy.myini.apidocs.service;

import com.ssafy.myini.apidocs.request.*;
import com.ssafy.myini.apidocs.response.ApiControllerListResponse;
import com.ssafy.myini.apidocs.response.ApiControllerResponse;
import com.ssafy.myini.apidocs.response.ApiInfoResponse;

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
    //PathVariable 삭제
    //QueryString 생성
    //QueryString 수정
    //QueryString 삭제
    //DTO 생성
    //DTO 수정
    //DTO 삭제
    //DTO 조회
    //DTO 변수 생성
    //DTO 변수 수정
    //DTO 변수 삭제
    //자료형 리스트 조회
}
