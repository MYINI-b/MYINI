package com.ssafy.myini.ERD.service;

import com.ssafy.myini.ERD.request.TableColumnUpdateRequest;
import com.ssafy.myini.ERD.request.ErdTableCreateRequest;
import com.ssafy.myini.ERD.request.TableRelationCreateRequest;
import com.ssafy.myini.ERD.request.ErdTableUpdateRequest;
import com.ssafy.myini.ERD.response.ConditionItemListResponse;
import com.ssafy.myini.ERD.response.RelationItemListResponse;
import com.ssafy.myini.ERD.response.ErdTableListResponse;

import java.util.List;

public interface ERDService {
    void createErdTable(Long projectId, ErdTableCreateRequest erdTableCreateRequest);
    List<ErdTableListResponse> findAllErdTable(Long projectId);
    void updateErdTable(Long tableId, ErdTableUpdateRequest erdTableUpdateRequest);
    void deleteErdTable(Long tableId);
    void createTableRelation(TableRelationCreateRequest tableRelationCreateRequest);
    void deleteTableRelation(Long tableRelationId);
    List<RelationItemListResponse> findAllRelationItem();
    List<ConditionItemListResponse> findAllConditionItem();
    void createTableColumn(Long tableId);
    void updateTableColumn(Long tableColumnId,TableColumnUpdateRequest tableColumnUpdateRequest);
    void deleteTableColumn(Long tableColumnId);

}
