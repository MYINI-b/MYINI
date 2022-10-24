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
    void createTable(Member member, Long projectId, TableCreateRequest tableCreateRequest);
    void updateTable(Member member, Long projectId, Long tableId, TableUpdateRequest tableUpdateRequest);
    void deleteTable(Member member, Long projectId, Long tableId);
    void createTableRelation(Member member, Long projectId, TableRelationCreateRequest tableRelationCreateRequest);
    void deleteTableRelation(Member member, Long projectId, Long tableRelationId);
    List<RelationListResponse> findAllRelation();
    List<ConstraintListResponse> findListConstraint();
    void createTableColumn(Member member, Long projectId, Long tableId);
    void updateTableColumn(Member member,
                           Long projectId,
                           Long tableId,
                           Long tableColumnId,
                           TableColumnUpdateRequest tableColumnUpdateRequest);
    void deleteTableColumn(Member member, Long projectId, Long tableColumnId);
    List<TableListResponse> findAllTable(Member member, Long projectId);
}
