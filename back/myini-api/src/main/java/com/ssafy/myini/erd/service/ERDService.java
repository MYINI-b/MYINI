package com.ssafy.myini.erd.service;

import com.ssafy.myini.erd.request.TableColumnUpdateRequest;
import com.ssafy.myini.erd.request.ErdTableCreateRequest;
import com.ssafy.myini.erd.request.TableRelationCreateRequest;
import com.ssafy.myini.erd.request.ErdTableUpdateRequest;
import com.ssafy.myini.erd.response.ConditionItemListResponse;
import com.ssafy.myini.erd.response.RelationItemListResponse;
import com.ssafy.myini.erd.response.ErdTableListResponse;
import org.json.simple.JSONObject;

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
    JSONObject getErdJson(Long projectId);

}
