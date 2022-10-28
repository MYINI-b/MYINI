package com.ssafy.myini.ERD;

import com.ssafy.myini.ERD.request.TableColumnUpdateRequest;
import com.ssafy.myini.ERD.request.ErdTableCreateRequest;
import com.ssafy.myini.ERD.request.TableRelationCreateRequest;
import com.ssafy.myini.ERD.request.ErdTableUpdateRequest;
import com.ssafy.myini.ERD.response.*;

import java.util.List;

public class ERDFixture {
    public static final Long ID = 1L;
    public static final String CONTENT = "내용";
    public static final String NAME = "이름";
    public static final Double X = 1.0;
    public static final List<Long> LIST1 = null;
    public static final List<TableColumnDto> LIST2 = null;
    public static final List<TableRelationDto> LIST3 = null;

    public static final ErdTableCreateRequest TEST_TABLE_CREATE_REQUEST = new ErdTableCreateRequest(NAME,X,X,CONTENT);
    public static final ErdTableUpdateRequest TEST_TABLE_UPDATE_REQUEST = new ErdTableUpdateRequest(NAME,X,X,CONTENT);
    public static final TableRelationCreateRequest TEST_RELATION_CREATE_REQUEST = new TableRelationCreateRequest(ID,ID,ID);
//    public static final TableColumnUpdateRequest TEST_COLUMN_UPDATE_REQUEST = new TableColumnUpdateRequest(CONTENT, LIST1);

    public static final ConditionItemListResponse TEST_CONSTRAINT_LIST_RESPONSE = new ConditionItemListResponse(ID,NAME);
    public static final RelationItemListResponse TEST_RELATION_LIST_RESPONSE = new RelationItemListResponse(ID,NAME);
    public static final ErdTableListResponse TEST_TABLE_LIST_RESPONSE = new ErdTableListResponse(ID,NAME,X,X,CONTENT,LIST2,LIST3);

}
