package com.ssafy.myini.ERD.service;

import com.ssafy.myini.ERD.request.TableColumnUpdateRequest;
import com.ssafy.myini.ERD.request.TableCreateRequest;
import com.ssafy.myini.ERD.request.TableRelationCreateRequest;
import com.ssafy.myini.ERD.request.TableUpdateRequest;
import com.ssafy.myini.ERD.response.ConstraintListResponse;
import com.ssafy.myini.ERD.response.RelationListResponse;
import com.ssafy.myini.ERD.response.TableListResponse;
import com.ssafy.myini.member.domain.Member;

import java.util.List;

public interface ERDService {
    void createTable(Long projectId, TableCreateRequest tableCreateRequest);
    void updateTable(Long projectId, Long tableId, TableUpdateRequest tableUpdateRequest);
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
    List<TableListResponse> findAllTable(Long projectId);
}
