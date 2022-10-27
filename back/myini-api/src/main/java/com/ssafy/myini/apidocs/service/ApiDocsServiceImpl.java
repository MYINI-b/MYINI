package com.ssafy.myini.apidocs.service;

import com.ssafy.myini.NotFoundException;
import com.ssafy.myini.apidocs.domain.*;
import com.ssafy.myini.apidocs.query.ApiDocsQueryRepository;
import com.ssafy.myini.apidocs.request.*;
import com.ssafy.myini.apidocs.response.*;
import com.ssafy.myini.project.domain.Project;
import com.ssafy.myini.project.domain.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.file.Path;
import java.util.List;
import java.util.stream.Collectors;

import static com.ssafy.myini.NotFoundException.*;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ApiDocsServiceImpl implements ApiDocsService {
    private final ProjectRepository projectRepository;
    private final ApiControllerRepository apiControllerRepository;
    private final ApiRepository apiRepository;
    private final ApiDocsQueryRepository apiDocsQueryRepository;
    private final PathVariableRepository pathVariableRepository;
    private final QueryStringRepository queryStringRepository;
    private final DtoRepository dtoRepository;
    private final DtoItemRepository dtoItemRepository;
    private final PrimitiveRepository primitiveRepository;

    // API컨트롤러 생성
    @Transactional
    @Override
    public void createApiController(Long projectId, CreateApiControllerRequest request) {
        Project findProject = projectRepository.findById(projectId)
                .orElseThrow(() -> new NotFoundException(PROJECT_NOT_FOUND));

        ApiController apiController = ApiController.createApiController(request.getApiControllerName(), request.getApiControllerBaseUrl(), request.getApiControllerDescription(), findProject);
        apiControllerRepository.save(apiController);
    }

    // API컨트롤러 리스트 조회
    @Override
    public List<ApiControllerListResponse> findApiControllerList(Long projectId) {
        Project findProject = projectRepository.findById(projectId)
                .orElseThrow(() -> new NotFoundException(PROJECT_NOT_FOUND));

        List<ApiController> findApiControllers = apiControllerRepository.findByProject(findProject);
        return findApiControllers.stream()
                .map(apiController -> new ApiControllerListResponse(apiController.getApiControllerId(), apiController.getApiControllerName()))
                .collect(Collectors.toList());
    }

    // API컨트롤러 조회
    @Override
    public ApiControllerResponse findByApiControllerId(Long projectId, Long apiControllerId) {
        ApiController findApiController = apiControllerRepository.findById(apiControllerId)
                .orElseThrow(() -> new NotFoundException(APICONTROLLER_NOT_FOUND));

        ApiController findApiControllerInfo = apiDocsQueryRepository.findByApiControllerId(findApiController);
        return ApiControllerResponse.from(findApiControllerInfo);
    }

    // API컨트롤러 수정
    @Transactional
    @Override
    public void updateApiController(Long projectId, Long apiControllerId, UpdateApiControllerRequest request) {
        ApiController findApiController = apiControllerRepository.findById(apiControllerId)
                .orElseThrow(() -> new NotFoundException(APICONTROLLER_NOT_FOUND));

        findApiController.updateApiController(request.getApiControllerName(), request.getApiControllerBaseUrl(), request.getApiControllerDescription());
    }

    // API컨트롤러 삭제
    @Transactional
    @Override
    public void deleteApiController(Long projectId, Long apiControllerId) {
        ApiController findApiController = apiControllerRepository.findById(apiControllerId)
                .orElseThrow(() -> new NotFoundException(APICONTROLLER_NOT_FOUND));

        apiControllerRepository.delete(findApiController);
    }

    // API 생성
    @Transactional
    @Override
    public void createApi(Long projectId, Long apiControllerId, CreateApiRequest request) {
        ApiController findApiController = apiControllerRepository.findById(apiControllerId)
                .orElseThrow(() -> new NotFoundException(APICONTROLLER_NOT_FOUND));

        Api api = Api.createApi(request.getApiItemId(), request.getApiName(), request.getApiUrl(), request.getApiMethod(), request.getApiCode(), request.getApiMethodName(), findApiController);
        apiRepository.save(api);
    }

    // API 수정
    @Transactional
    @Override
    public void updateApi(Long projectId, Long apiControllerId, Long apiId, UpdateApiRequest request) {
        Api findApi = apiRepository.findById(apiId)
                .orElseThrow(() -> new NotFoundException(API_NOT_FOUND));

        findApi.updateApi(request.getApiItemId(), request.getApiName(),request.getApiUrl(), request.getApiMethod(), request.getApiCode(), request.getApiMethodName());
    }

    // API 삭제
    @Transactional
    @Override
    public void deleteApi(Long projectId, Long apiControllerId, Long apiId) {
        Api findApi = apiRepository.findById(apiId)
                .orElseThrow(() -> new NotFoundException(API_NOT_FOUND));

        apiRepository.delete(findApi);
    }

    // API 조회
    @Override
    public ApiInfoResponse findByApiId(Long projectId, Long apiControllerId, Long apiId) {
        Api findApi = apiRepository.findById(apiId)
                .orElseThrow(() -> new NotFoundException(API_NOT_FOUND));
        apiDocsQueryRepository.findByApiId(findApi);
        return null;
    }

    // PathVariable 생성
    @Transactional
    @Override
    public void createPathVariable(Long projectId, Long apiControllerId, Long apiId, CreatePathVariableRequest request) {
        apiRepository.findById(apiId)
                .orElseThrow(() -> new NotFoundException(API_NOT_FOUND));

        PathVariable pathVariable = PathVariable.createPathVariable(request.getPathVariableKey(), request.getPathVariableType());
        pathVariableRepository.save(pathVariable);
    }

    // PathVariable 수정
    @Transactional
    @Override
    public void updatePathVariable(Long projectId, Long apiControllerId, Long apiId, Long pathVariableId, UpdatePathVariableRequest request) {
        PathVariable findPathVariable = pathVariableRepository.findById(pathVariableId)
                .orElseThrow(() -> new NotFoundException(PATHVARIABLE_NOT_FOUND));

        findPathVariable.updatePathVariable(request.getPathVariableKey(), request.getPathVariableType());
    }

    // PathVariable 삭제
    @Transactional
    @Override
    public void deletePathVariable(Long projectId, Long apiControllerId, Long apiId, Long pathVariableId) {
        PathVariable findPathVariable = pathVariableRepository.findById(pathVariableId)
                .orElseThrow(() -> new NotFoundException(PATHVARIABLE_NOT_FOUND));

        pathVariableRepository.delete(findPathVariable);
    }

    // QueryString 생성
    @Transactional
    @Override
    public void createQueryString(Long projectId, Long apiControllerId, Long apiId, CreateQueryStringRequest request) {
        apiRepository.findById(apiId)
                .orElseThrow(() -> new NotFoundException(API_NOT_FOUND));

        QueryString queryString = QueryString.createQueryString(request.getQueryStringKey(), request.getQueryStringType());
        queryStringRepository.save(queryString);
    }

    // QueryString 수정
    @Transactional
    @Override
    public void updateQueryString(Long projectId, Long apiControllerId, Long apiId, Long queryStringId, UpdateQueryStringRequest request) {
        QueryString findQueryString = queryStringRepository.findById(queryStringId)
                .orElseThrow(() -> new NotFoundException(QUERYSTRING_NOT_FOUND));

        findQueryString.updateQueryString(request.getQueryStringKey(), request.getQueryStringType());
    }

    // QueryString 삭제
    @Transactional
    @Override
    public void deleteQueryString(Long projectId, Long apiControllerId, Long apiId, Long queryStringId) {
        QueryString findQueryString = queryStringRepository.findById(queryStringId)
                .orElseThrow(() -> new NotFoundException(QUERYSTRING_NOT_FOUND));

        queryStringRepository.delete(findQueryString);
    }

    // Dto 생성
    @Transactional
    @Override
    public void createDto(Long projectId, Long apiControllerId, Long apiId, CreateDtoRequest request) {
        apiRepository.findById(apiId)
                .orElseThrow(() -> new NotFoundException(API_NOT_FOUND));

        Dto dto = Dto.createDto(request.getDtoName(), request.getDtoType());
        dtoRepository.save(dto);
    }

    // Dto 수정
    @Transactional
    @Override
    public void updateDto(Long projectId, Long apiControllerId, Long apiId, Long dtoId, UpdateDtoRequest request) {
        Dto findDto = dtoRepository.findById(dtoId)
                .orElseThrow(() -> new NotFoundException(DTO_NOT_FOUND));

        findDto.updateDto(request.getDtoName(), request.getDtoType());
    }

    // Dto 삭제
    @Transactional
    @Override
    public void deleteDto(Long projectId, Long apiControllerId, Long apiId, Long dtoId) {
        Dto findDto = dtoRepository.findById(dtoId)
                .orElseThrow(() -> new NotFoundException(DTO_NOT_FOUND));

        dtoRepository.delete(findDto);
    }

    // Dto 조회
    @Override
    public DtoResponse findByDtoId(Long projectId, Long apiControllerId, Long apiId, Long dtoId) {
        Dto findDto = dtoRepository.findById(dtoId)
                .orElseThrow(() -> new NotFoundException(DTO_NOT_FOUND));

        Dto findDtoInfo = apiDocsQueryRepository.findByDtoId(findDto);
        return DtoResponse.from(findDtoInfo);
    }

    // Dto변수 생성
    @Transactional
    @Override
    public void createDtoItem(Long projectId, Long apiControllerId, Long apiId, Long dtoId, CreateDtoItemRequest request) {
        dtoRepository.findById(dtoId)
                .orElseThrow(() -> new NotFoundException(DTO_NOT_FOUND));
        Dto findDto = dtoRepository.findById(request.getDtoClassType())
                .orElseThrow(() -> new NotFoundException(DTO_NOT_FOUND));
        Primitive findPrimitive = primitiveRepository.findById(request.getDtoPrimitiveType())
                .orElseThrow(() -> new NotFoundException(PRIMITIVE_NOT_FOUND));

        DtoItem dtoItem = DtoItem.createDtoItem(request.getDtoItemName(), findDto, findPrimitive, request.getDtoIsList());
        dtoItemRepository.save(dtoItem);
    }

    // Dto변수 수정
    @Transactional
    @Override
    public void updateDtoItem(Long projectId, Long apiControllerId, Long apiId, Long dtoId, Long dtoItemId, UpdateDtoItemRequest request) {
        DtoItem findDtoItem = dtoItemRepository.findById(dtoItemId)
                .orElseThrow(() -> new NotFoundException(DTOITEM_NOT_FOUND));
        Dto findDto = dtoRepository.findById(request.getDtoClassType())
                .orElseThrow(() -> new NotFoundException(DTO_NOT_FOUND));
        Primitive findPrimitive = primitiveRepository.findById(request.getDtoPrimitiveType())
                .orElseThrow(() -> new NotFoundException(PRIMITIVE_NOT_FOUND));

        findDtoItem.updateDtoItem(request.getDtoItemName(), findDto, findPrimitive, request.getDtoIsList());
    }

    // Dto변수 삭제
    @Transactional
    @Override
    public void deleteDtoItem(Long projectId, Long apiControllerId, Long apiId, Long dtoId, Long dtoItemId) {
        DtoItem findDtoItem = dtoItemRepository.findById(dtoItemId)
                .orElseThrow(() -> new NotFoundException(DTOITEM_NOT_FOUND));

        dtoItemRepository.delete(findDtoItem);
    }

    // 자료형 리스트 조회
    @Override
    public TypeListResponse findTypeList(Long projectId) {
        List<Primitive> findPrimitives = primitiveRepository.findAll();
        List<Dto> findDtos = null;
        return TypeListResponse.from(findPrimitives, findDtos);
    }
}