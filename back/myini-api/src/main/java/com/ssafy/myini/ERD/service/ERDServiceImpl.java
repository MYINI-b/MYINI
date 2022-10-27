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
import com.ssafy.myini.NotMatchException;
import com.ssafy.myini.member.domain.MemberRepository;
import com.ssafy.myini.project.domain.Project;
import com.ssafy.myini.project.domain.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

import static com.ssafy.myini.NotFoundException.*;
import static com.ssafy.myini.NotMatchException.*;

@Service
@RequiredArgsConstructor
@Transactional
public class ERDServiceImpl implements ERDService{
    private final ErdTableRepository erdTableRepository;
    private final MemberRepository memberRepository;
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

        List<ErdTableListResponse> erdTableListRespons = tables.stream().map(ErdTableListResponse::from).collect(Collectors.toList());

        return erdTableListRespons;
    }

    @Override
    @Transactional
    public void updateErdTable(Long projectId, Long erdTableId, ErdTableUpdateRequest erdTableUpdateRequest) {
        ErdTable erdTable = erdTableRepository.findById(erdTableId).orElseThrow(() -> new NotFoundException(TABLE_NOT_FOUND));

        if(projectId.equals(erdTable.getProject().getProjectId())) {
            erdTable.updateErdTable(erdTableUpdateRequest.getErdTableName(), erdTableUpdateRequest.getErdTableX(), erdTableUpdateRequest.getErdTableY(), erdTableUpdateRequest.getErdTableColor());
        }else{
            new NotMatchException(PROJECT_NOT_MATCH);
        }
    }

    @Override
    @Transactional
    public void deleteErdTable(Long projectId, Long erdTableId) {
        ErdTable erdTable = erdTableRepository.findById(erdTableId).orElseThrow(() -> new NotFoundException(TABLE_NOT_FOUND));
        if(projectId.equals(erdTable.getProject().getProjectId())) {
            erdTableRepository.delete(erdTable);
        }else{
            new NotMatchException(PROJECT_NOT_MATCH);
        }

    }

    @Override
    @Transactional
    public void createTableRelation(Long projectId, TableRelationCreateRequest tableRelationCreateRequest) {
        ErdTable toErdTable = erdTableRepository.findById(tableRelationCreateRequest.getToErdTableId()).orElseThrow(() -> new NotFoundException(TABLE_NOT_FOUND));
        ErdTable fromErdTable = erdTableRepository.findById(tableRelationCreateRequest.getFromErdTableId()).orElseThrow(() -> new NotFoundException(TABLE_NOT_FOUND));
        RelationItem relationItem = relationItemRepository.findById(tableRelationCreateRequest.getRelationItemId()).orElseThrow(() -> new NotFoundException(RELATION_NOT_FOUND));

        if(projectId.equals(toErdTable.getProject().getProjectId()) && projectId.equals(fromErdTable.getProject().getProjectId())){
            TableRelation tableRelation = TableRelation.createTableRelation(toErdTable, fromErdTable, relationItem);
            tableRelationRepository.save(tableRelation);
        }else{
            new NotMatchException(PROJECT_NOT_MATCH);
        }


    }

    @Override
    @Transactional
    public void deleteTableRelation(Long projectId, Long tableRelationId) {
        TableRelation tableRelation = tableRelationRepository.findById(tableRelationId).orElseThrow(() -> new NotFoundException(RELATION_NOT_FOUND));
        if (projectId.equals(tableRelation.getToErdTable().getProject().getProjectId()) && projectId.equals(tableRelation.getFromErdTable().getProject().getProjectId())){
            tableRelationRepository.delete(tableRelation);
        }else{
            new NotMatchException(PROJECT_NOT_MATCH);
        }
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
    public void createTableColumn(Long projectId, Long erdTableId) {
        ErdTable erdTable = erdTableRepository.findById(erdTableId).orElseThrow(() -> new NotFoundException(TABLE_NOT_FOUND));
        if(projectId.equals(erdTable.getProject().getProjectId())){
            TableColumn tableColumn = TableColumn.createTableColumn(erdTable);
            tableColumnRepository.save(tableColumn);
        }else{
            new NotMatchException(PROJECT_NOT_MATCH);
        }

    }

    @Override
    @Transactional
    public void updateTableColumn(Long projectId, Long erdTableId, Long tableColumnId, TableColumnUpdateRequest tableColumnUpdateRequest) {
        ErdTable erdTable = erdTableRepository.findById(erdTableId).orElseThrow(() -> new NotFoundException(TABLE_NOT_FOUND));
        if(projectId.equals(erdTable.getProject().getProjectId())){
            TableColumn tableColumn = tableColumnRepository.findById(tableColumnId).orElseThrow(() -> new NotFoundException(TABLE_COLUMN_NOT_FOUND));
            if(erdTableId.equals(tableColumn.getErdTable().getErdTableId())){
                //컬럼이름 바꾸기
                tableColumn.updateTableColumn(tableColumnUpdateRequest.getTableColumnName());
                //컬럼에 딸린 제약조건 다 삭제하고
                columnConditionRepository.deleteAllInBatchByTableColumn_TableColumnId(tableColumn.getTableColumnId());
                //새롭게 제약조건 설정
                for (Long conditionItemId : tableColumnUpdateRequest.getConditionItemIds()) {
                    ConditionItem conditionItem = conditionItemRepository.findById(conditionItemId).orElseThrow(() -> new NotFoundException(CONSTRAINT_NOT_FOUND));
                    ColumnCondition columnCondition = ColumnCondition.createColumnCondition(tableColumn, conditionItem);
                    columnConditionRepository.save(columnCondition);
                }
            }else{
                new NotMatchException(TABLE_NOT_MATCH);
            }
        }else{
            new NotMatchException(PROJECT_NOT_MATCH);
        }
    }

    @Override
    @Transactional
    public void deleteTableColumn(Long projectId, Long tableColumnId) {
        TableColumn tableColumn = tableColumnRepository.findById(tableColumnId).orElseThrow(() -> new NotFoundException(TABLE_COLUMN_NOT_FOUND));
        if(projectId.equals(tableColumn.getErdTable().getProject().getProjectId())){
            tableColumnRepository.delete(tableColumn);
        }else{
            new NotMatchException(PROJECT_NOT_MATCH);
        }

    }


}
