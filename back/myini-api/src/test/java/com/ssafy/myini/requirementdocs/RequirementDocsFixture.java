package com.ssafy.myini.requirementdocs;

import com.ssafy.myini.requirementdocs.domain.type.RequirementPart;
import com.ssafy.myini.requirementdocs.request.*;
import com.ssafy.myini.requirementdocs.response.RequirementCategoryCreateResponse;
import com.ssafy.myini.requirementdocs.response.RequirementCategoryDto;
import com.ssafy.myini.requirementdocs.response.RequirementCategoryListResponse;
import com.ssafy.myini.requirementdocs.response.RequirementListResponse;

public class RequirementDocsFixture {
    public static final Long ID = 1L;
    public static final String CONTENT = "내용";
    public static final String NAME = "이름";

    public static final String EMAIL = "이메일";
    public static final Integer NUM = 1;
    public static final Double DOUNUM = 1.0;

    public static final RequirementCategoryCreateRequest TEST_REQUIREMENT_CATEGORY_CREATE_REQUEST
             = new RequirementCategoryCreateRequest(NAME,CONTENT);

    public static final RequirementCategoryUpdateRequest TEST_REQUIREMENT_CATEGORY_UPDATE_REQUEST
            = new RequirementCategoryUpdateRequest(ID);

    public static final RequirementContentUpdateRequest TEST_REQUIREMENT_CONTENT_UPDATE_REQUEST
            = new RequirementContentUpdateRequest(CONTENT);

    public static final RequirementMemberUpdateRequest TEST_REQUIREMENT_MEMBER_UPDATE_REQUEST
            = new RequirementMemberUpdateRequest(CONTENT);

    public static final RequirementNameUpdateRequest TEST_REQUIREMENT_NAME_UPDATE_REQUEST
            = new RequirementNameUpdateRequest(CONTENT);

    public static final RequirementPartUpdateRequest TEST_REQUIREMENT_PART_UPDATE_REQUEST
            = new RequirementPartUpdateRequest(RequirementPart.BE);

    public static final RequirementPriorityUpdateRequest TEST_REQUIREMENT_PRIORITY_UPDATE_REQUEST
            = new RequirementPriorityUpdateRequest(NUM);

    public static final RequirementStoryPointUpdateRequest TEST_REQUIREMENT_STORY_POINT_UPDATE_REQUEST
            = new RequirementStoryPointUpdateRequest(DOUNUM);

    public static final RequirementCategoryDto TEST_REQUIREMENT_CATEGORY_DTO
            = new RequirementCategoryDto(ID,NAME,CONTENT);

    public static final RequirementCategoryListResponse TEST_REQUIREMENT_CATEGORY_LIST_RESPONSE
            = new RequirementCategoryListResponse(ID,NAME,CONTENT);

    public static final RequirementListResponse TEST_REQUIREMENT_LIST_RESPONSE
            = new RequirementListResponse(ID,TEST_REQUIREMENT_CATEGORY_DTO,NAME,CONTENT,RequirementPart.BE,NAME,EMAIL,NUM,DOUNUM);
    public static final RequirementCategoryCreateResponse TEST_REQUIREMENT_CATEGORU_RESPONSE
            = new RequirementCategoryCreateResponse(ID);

}
