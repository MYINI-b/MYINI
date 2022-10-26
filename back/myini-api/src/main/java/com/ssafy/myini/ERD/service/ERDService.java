package com.ssafy.myini.ERD.service;

import com.ssafy.myini.ERD.request.TableColumnUpdateRequest;
import com.ssafy.myini.ERD.request.ErdTableCreateRequest;
import com.ssafy.myini.ERD.request.TableRelationCreateRequest;
import com.ssafy.myini.ERD.request.ErdTableUpdateRequest;
import com.ssafy.myini.ERD.response.ConstraintListResponse;
import com.ssafy.myini.ERD.response.RelationListResponse;
import com.ssafy.myini.ERD.response.ErdTableListResponse;

import java.util.List;

public interface ERDService {
    void createTable(Long projectId, ErdTableCreateRequest erdTableCreateRequest);
    void updateTable(Long projectId, Long tableId, ErdTableUpdateRequest erdTableUpdateRequest);
    void deleteTable(Long projectId, Long tableId);
    void createTableRelation(Long projectId, TableRelationCreateRequest tableRelationCreateRequest);
    void deleteTableRelation(Long projectId, Long tableRelationId);
    List<RelationListResponse> findAllRelation();
    List<ConstraintListResponse> findAllConstraint();
    void createTableColumn(Long projectId, Long tableId);
    void updateTableColumn(
                           Long projectId,
                           Long tableId,
                           Long tableColumnId,
                           TableColumnUpdateRequest tableColumnUpdateRequest);
    void deleteTableColumn(Long projectId, Long tableColumnId);
    List<ErdTableListResponse> findAllTable(Long projectId);
}
