package com.ssafy.myini.ERD.service;

import com.ssafy.myini.ERD.domain.entity.*;
import com.ssafy.myini.ERD.domain.repository.*;
import com.ssafy.myini.ERD.request.TableColumnUpdateRequest;
import com.ssafy.myini.ERD.request.ErdTableCreateRequest;
import com.ssafy.myini.ERD.request.TableRelationCreateRequest;
import com.ssafy.myini.ERD.request.ErdTableUpdateRequest;
import com.ssafy.myini.ERD.response.ConditionItemListResponse;
import com.ssafy.myini.ERD.response.RelationItemListResponse;
import com.ssafy.myini.ERD.response.ErdTableListResponse;
import com.ssafy.myini.NotFoundException;
import com.ssafy.myini.project.domain.Project;
import com.ssafy.myini.project.domain.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

import static com.ssafy.myini.NotFoundException.*;

@Service
@RequiredArgsConstructor
@Transactional
public class ERDServiceImpl implements ERDService{
    private final ErdTableRepository erdTableRepository;
    private final ProjectRepository projectRepository;
    private final TableRelationRepository tableRelationRepository;
    private final TableColumnRepository tableColumnRepository;
    private final RelationItemRepository relationItemRepository;
    private final ConditionItemRepository conditionItemRepository;
    private final ColumnConditionRepository columnConditionRepository;


    @Override
    @Transactional
    public void createErdTable(Long projectId, ErdTableCreateRequest erdTableCreateRequest) {
        Project project = projectRepository.findById(projectId).orElseThrow(() -> new NotFoundException(PROJECT_NOT_FOUND));

        ErdTable erdTable = ErdTable.createErdTable(erdTableCreateRequest.getErdTableName(), erdTableCreateRequest.getErdTableX(), erdTableCreateRequest.getErdTableY(), erdTableCreateRequest.getErdTableColor(), project);
        erdTableRepository.save(erdTable);
        System.out.println("erdTable = " + erdTable);
    }

    @Override
    public List<ErdTableListResponse> findAllErdTable(Long projectId){
        Project project = projectRepository.findById(projectId).orElseThrow(() -> new NotFoundException(PROJECT_NOT_FOUND));
        List<ErdTable> tables = erdTableRepository.findAllByProject(project);

        List<ErdTableListResponse> erdTableListResponse = tables.stream().map(ErdTableListResponse::from).collect(Collectors.toList());

        System.out.println(erdTableListResponse.get(1).getTableColumnDtos().get(1).getTableColumnType());
        return erdTableListResponse;
    }

    @Override
    @Transactional
    public void updateErdTable(Long erdTableId, ErdTableUpdateRequest erdTableUpdateRequest) {
        ErdTable erdTable = erdTableRepository.findById(erdTableId).orElseThrow(() -> new NotFoundException(TABLE_NOT_FOUND));


            erdTable.updateErdTable(erdTableUpdateRequest.getErdTableName(), erdTableUpdateRequest.getErdTableX(), erdTableUpdateRequest.getErdTableY(), erdTableUpdateRequest.getErdTableColor());

    }

    @Override
    @Transactional
    public void deleteErdTable(Long erdTableId) {
        ErdTable erdTable = erdTableRepository.findById(erdTableId).orElseThrow(() -> new NotFoundException(TABLE_NOT_FOUND));

            erdTableRepository.delete(erdTable);


    }

    @Override
    @Transactional
    public void createTableRelation(TableRelationCreateRequest tableRelationCreateRequest) {
        ErdTable toErdTable = erdTableRepository.findById(tableRelationCreateRequest.getToErdTableId()).orElseThrow(() -> new NotFoundException(TABLE_NOT_FOUND));
        ErdTable fromErdTable = erdTableRepository.findById(tableRelationCreateRequest.getFromErdTableId()).orElseThrow(() -> new NotFoundException(TABLE_NOT_FOUND));
        RelationItem relationItem = relationItemRepository.findById(tableRelationCreateRequest.getRelationItemId()).orElseThrow(() -> new NotFoundException(RELATION_NOT_FOUND));

           TableRelation tableRelation = TableRelation.createTableRelation(toErdTable, fromErdTable, relationItem);
            tableRelationRepository.save(tableRelation);



    }

    @Override
    @Transactional
    public void deleteTableRelation(Long tableRelationId) {
        TableRelation tableRelation = tableRelationRepository.findById(tableRelationId).orElseThrow(() -> new NotFoundException(RELATION_NOT_FOUND));
          tableRelationRepository.delete(tableRelation);

    }

    @Override
    public List<RelationItemListResponse> findAllRelationItem() {
        List<RelationItem> relationItems = relationItemRepository.findAll();
        List<RelationItemListResponse> relationItemListRespons = relationItems.stream().map(RelationItemListResponse::from).collect(Collectors.toList());

        return relationItemListRespons;
    }

    @Override
    public List<ConditionItemListResponse> findAllConditionItem() {
        List<ConditionItem> constraints = conditionItemRepository.findAll();
        List<ConditionItemListResponse> conditionItemListRespons = constraints.stream().map(ConditionItemListResponse::from).collect(Collectors.toList());

        return conditionItemListRespons;
    }

    @Override
    @Transactional
    public void createTableColumn(Long erdTableId) {
        ErdTable erdTable = erdTableRepository.findById(erdTableId).orElseThrow(() -> new NotFoundException(TABLE_NOT_FOUND));
          TableColumn tableColumn = TableColumn.createTableColumn(erdTable);
            tableColumnRepository.save(tableColumn);


    }

    @Override
    @Transactional
    public void updateTableColumn(Long tableColumnId, TableColumnUpdateRequest tableColumnUpdateRequest) {
         TableColumn tableColumn = tableColumnRepository.findById(tableColumnId).orElseThrow(() -> new NotFoundException(TABLE_COLUMN_NOT_FOUND));

         //컬럼이름 바꾸기
        tableColumn.updateTableColumn(tableColumnUpdateRequest.getTableColumnName(), tableColumnUpdateRequest.getTableColumnType());
        //컬럼에 딸린 제약조건 다 삭제하고
        columnConditionRepository.deleteAllInBatchByTableColumn_TableColumnId(tableColumn.getTableColumnId());
        //새롭게 제약조건 설정
        for (Long conditionItemId : tableColumnUpdateRequest.getConditionItemIds()) {
            ConditionItem conditionItem = conditionItemRepository.findById(conditionItemId).orElseThrow(() -> new NotFoundException(CONSTRAINT_NOT_FOUND));
            ColumnCondition columnCondition = ColumnCondition.createColumnCondition(tableColumn, conditionItem);
            columnConditionRepository.save(columnCondition);
        }
    }

    @Override
    @Transactional
    public void deleteTableColumn( Long tableColumnId) {
        TableColumn tableColumn = tableColumnRepository.findById(tableColumnId).orElseThrow(() -> new NotFoundException(TABLE_COLUMN_NOT_FOUND));
          tableColumnRepository.delete(tableColumn);


    }


}
