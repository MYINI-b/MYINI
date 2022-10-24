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

public class ERDServiceImpl implements ERDService{
    @Override
    public void createTable(Member member, Long projectId, TableCreateRequest tableCreateRequest) {

    }

    @Override
    public void updateTable(Member member, Long projectId, Long tableId, TableUpdateRequest tableUpdateRequest) {

    }

    @Override
    public void deleteTable(Member member, Long projectId, Long tableId) {

    }

    @Override
    public void createTableRelation(Member member, Long projectId, TableRelationCreateRequest tableRelationCreateRequest) {

    }

    @Override
    public void deleteTableRelation(Member member, Long projectId, Long tableRelationId) {

    }

    @Override
    public List<RelationListResponse> findAllRelation() {
        return null;
    }

    @Override
    public List<ConstraintListResponse> findListConstraint() {
        return null;
    }

    @Override
    public void createTableColumn(Member member, Long projectId, Long tableId) {

    }

    @Override
    public void updateTableColumn(Member member, Long projectId, Long tableId, Long tableColumnId, TableColumnUpdateRequest tableColumnUpdateRequest) {

    }

    @Override
    public void deleteTableColumn(Member member, Long projectId, Long tableColumnId) {

    }

    @Override
    public List<TableListResponse> findAllTable(Member member, Long projectId) {
        return null;
    }
}
