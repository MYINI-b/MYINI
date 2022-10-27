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
    void updateErdTable(Long projectId, Long tableId, ErdTableUpdateRequest erdTableUpdateRequest);
    void deleteErdTable(Long projectId, Long tableId);
    void createTableRelation(Long projectId, TableRelationCreateRequest tableRelationCreateRequest);
    void deleteTableRelation(Long projectId, Long tableRelationId);
    List<RelationItemListResponse> findAllRelationItem();
    List<ConditionItemListResponse> findAllConditionItem();
    void createTableColumn(Long projectId, Long tableId);
    void updateTableColumn(
                           Long projectId,
                           Long tableId,
                           Long tableColumnId,
                           TableColumnUpdateRequest tableColumnUpdateRequest);
    void deleteTableColumn(Long projectId, Long tableColumnId);

}
