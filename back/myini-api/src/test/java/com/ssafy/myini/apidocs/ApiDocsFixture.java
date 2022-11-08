package com.ssafy.myini.apidocs;

import com.ssafy.myini.apidocs.domain.Api;
import com.ssafy.myini.apidocs.request.*;
import com.ssafy.myini.apidocs.response.*;

import java.util.Arrays;

public class ApiDocsFixture {
    public static final int ITEM_ID = 1;
    public static final Long ID = 1L;
    public static final String NAME = "테스트 이름";
    public static final String URL = "테스트 URL";
    public static final String APIMETHOD = "GET"; //enum
    public static final String APICODE = "200"; //enum
    public static final String API_METHOD_NAME = "findById";
    public static final String APIDESCRIPTION = "테스트 설명";
    public static final String DTOTYPE = "RESPONSE"; // enum
    public static final String YN_FIELD = "Y";
    public static final String KEY = "id";
    public static final String TYPE = "Long";



    public static final CreateApiControllerRequest TEST_CREATE_API_CONTROLLER_REQUEST
            = new CreateApiControllerRequest(NAME, URL, APIDESCRIPTION);
    public static final UpdateApiControllerRequest TEST_UPDATE_API_CONTROLLER_REQUEST
            = new UpdateApiControllerRequest(NAME, URL, APIDESCRIPTION);
    public static final CreateApiRequest TEST_CREATE_API_REQUEST
            = new CreateApiRequest(NAME, APIDESCRIPTION, URL, APIMETHOD, APICODE, API_METHOD_NAME);
    public static final UpdateApiRequest TEST_UPDATE_API_REQUEST
            = new UpdateApiRequest(NAME, APIDESCRIPTION, URL, APIMETHOD, APICODE, API_METHOD_NAME);
    public static final CreatePathVariableRequest TEST_CREATE_PATHVARIABLE_REQUEST
            = new CreatePathVariableRequest(KEY, TYPE);
    public static final UpdatePathVariableRequest TEST_UPDATE_PATHVARIABLE_REQUEST
            = new UpdatePathVariableRequest(KEY, TYPE);
    public static final CreateQueryStringRequest TEST_CREATE_QUERYSTRING_REQUEST
            = new CreateQueryStringRequest(KEY, TYPE);
    public static final UpdateQueryStringRequest TEST_UPDATE_QUERYSTRING_REQUEST
            = new UpdateQueryStringRequest(KEY, TYPE);
    public static final CreateDtoRequest TEST_CREATE_DTO_REQUEST
            = new CreateDtoRequest(NAME, TYPE, YN_FIELD);
    public static final UpdateDtoRequest TEST_UPDATE_DTO_REQUEST
            = new UpdateDtoRequest(NAME, TYPE, YN_FIELD);
    public static final CreateDtoItemRequest TEST_CREATE_DTO_ITEM_REQUEST
            = new CreateDtoItemRequest(NAME, ID, ID, YN_FIELD);
    public static final UpdateDtoItemRequest TEST_UPDATE_DTO_ITEM_REQUEST
            = new UpdateDtoItemRequest(NAME, ID, ID, YN_FIELD);

    public static final ApiControllerListResponse TEST_API_CONTROLLER_LIST_RESPONSE
            = new ApiControllerListResponse(ID, NAME);
    public static final ApiResponse TEST_API_RESPONSE
            = new ApiResponse(ID, NAME, APIDESCRIPTION, URL, APIMETHOD, APICODE, API_METHOD_NAME);
    public static final ApiControllerResponse TEST_API_CONTROLLER_RESPONSE
            = new ApiControllerResponse(ID, NAME, URL, APIDESCRIPTION, Arrays.asList(TEST_API_RESPONSE));
    public static final PathVariableResponse TEST_PATHVARIABLE_RESPONSE
            = new PathVariableResponse(ID, KEY, TYPE);
    public static final QueryStringResponse TEST_QUERYSTRING_RESPONSE
            = new QueryStringResponse(ID, KEY, TYPE);
    public static final DtoItemResponse TEST_DTO_ITEM_RESPONSE
            = new DtoItemResponse(ID, NAME, ID, ID, YN_FIELD, NAME, NAME);
    public static final DtoResponse TEST_DTO_RESPONSE
            = new DtoResponse(ID, NAME, TYPE, Arrays.asList(TEST_DTO_ITEM_RESPONSE), YN_FIELD);
    public static final ApiInfoResponse TEST_API_INFO_RESPONSE
            = new ApiInfoResponse(TEST_API_RESPONSE, Arrays.asList(TEST_PATHVARIABLE_RESPONSE), Arrays.asList(TEST_QUERYSTRING_RESPONSE), Arrays.asList(TEST_DTO_RESPONSE));
    public static final PrimitiveTypeResponse TEST_PRIMITIVE_TYPE_RESPONSE
            = new PrimitiveTypeResponse(ID, NAME);
    public static final ClassTypeResponse TEST_CLASS_TYPE_RESPONSE
            = new ClassTypeResponse(ID, NAME);
    public static final TypeListResponse TEST_TYPE_LIST_RESPONSE
            = new TypeListResponse(Arrays.asList(TEST_PRIMITIVE_TYPE_RESPONSE), Arrays.asList(TEST_CLASS_TYPE_RESPONSE));
    public static final ApiControllerCreateResponse TEST_API_CONTROLLER_CREATE_RESPONSE
            = new ApiControllerCreateResponse(ID);
    public static final DtoCreateResponse TEST_DTO_CREATE_RESPONSE
            = new DtoCreateResponse(ID);
}
