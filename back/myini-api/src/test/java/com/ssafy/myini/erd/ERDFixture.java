package com.ssafy.myini.erd;

import com.ssafy.myini.erd.request.ErdTableCreateRequest;
import com.ssafy.myini.erd.request.TableColumnUpdateRequest;
import com.ssafy.myini.erd.request.TableRelationCreateRequest;
import com.ssafy.myini.erd.request.ErdTableUpdateRequest;
import com.ssafy.myini.erd.response.*;

import javax.print.attribute.standard.MediaSize;
import java.util.Arrays;
import java.util.List;

public class ERDFixture {
    public static final Long ID = 1L;
    public static final String CONTENT = "내용";
    public static final String NAME = "이름";
    public static final Double X = 1.0;

    public static final ErdTableCreateRequest TEST_TABLE_CREATE_REQUEST = new ErdTableCreateRequest(NAME,X,X,CONTENT);
    public static final ErdTableUpdateRequest TEST_TABLE_UPDATE_REQUEST = new ErdTableUpdateRequest(NAME,X,X,CONTENT);
    public static final TableRelationCreateRequest TEST_RELATION_CREATE_REQUEST = new TableRelationCreateRequest(ID,ID,ID);
    public static final TableColumnUpdateRequest TEST_COLUMN_UPDATE_REQUEST = new TableColumnUpdateRequest(NAME, CONTENT, Arrays.asList(ID));

    public static final ConditionItemListResponse TEST_CONDITION_LIST_RESPONSE = new ConditionItemListResponse(ID,NAME);
    public static final RelationItemListResponse TEST_RELATION_LIST_RESPONSE = new RelationItemListResponse(ID,NAME);
    public static final ConditionItemDto TEST_CONDITION_ITEM_DTO = new ConditionItemDto(ID,NAME);
    public static final TableColumnDto TEST_TABLE_COLUMN_DTO = new TableColumnDto(ID, NAME,NAME,Arrays.asList(TEST_CONDITION_ITEM_DTO));
    public static final TableRelationDto TEST_TABLE_RELATION_DTO = new TableRelationDto(ID,NAME,ID,NAME);
    public static final ErdTableListResponse TEST_TABLE_LIST_RESPONSE = new ErdTableListResponse(ID,NAME,X,X,CONTENT, Arrays.asList(TEST_TABLE_COLUMN_DTO),Arrays.asList(TEST_TABLE_RELATION_DTO));

}