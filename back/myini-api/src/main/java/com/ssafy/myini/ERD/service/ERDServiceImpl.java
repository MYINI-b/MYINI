package com.ssafy.myini.ERD.service;

import com.ssafy.myini.ERD.domain.entity.*;
import com.ssafy.myini.ERD.domain.repository.*;
import com.ssafy.myini.ERD.request.TableColumnUpdateRequest;
import com.ssafy.myini.ERD.request.TableCreateRequest;
import com.ssafy.myini.ERD.request.TableRelationCreateRequest;
import com.ssafy.myini.ERD.request.TableUpdateRequest;
import com.ssafy.myini.ERD.response.ConstraintListResponse;
import com.ssafy.myini.ERD.response.RelationListResponse;
import com.ssafy.myini.ERD.response.TableListResponse;
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
@Transactional(readOnly = true)
public class ERDServiceImpl implements ERDService{
    private final TableRepository tableRepository;
    private final MemberRepository memberRepository;
    private final ProjectRepository projectRepository;
    private final TableRelationRepository tableRelationRepository;
    private final TableColumnRepository tableColumnRepository;
    private final RelationRepository relationRepository;
    private final ConstraintRepository constraintRepository;
    private final ColumnConstraintRepository columnConstraintRepository;


    @Override
    public void createTable(Long projectId, TableCreateRequest tableCreateRequest) {
        Project project = projectRepository.findById(projectId).orElseThrow(() -> new NotFoundException(PROJECT_NOT_FOUND));
        System.out.println("project = " + project.getProjectName());
        System.out.println("tableCreateRequest = " + tableCreateRequest);
        ErdTable erdTable = ErdTable.createErdTable(tableCreateRequest.getTableName(), tableCreateRequest.getTableX(), tableCreateRequest.getTableY(), tableCreateRequest.getTableColor(), project);
        tableRepository.save(erdTable);
    }

    @Override
    public void updateTable(Long projectId, Long tableId, TableUpdateRequest tableUpdateRequest) {
        ErdTable erdTable = tableRepository.findById(tableId).orElseThrow(() -> new NotFoundException(TABLE_NOT_FOUND));

        if(projectId.equals(erdTable.getProject().getProjectId())) {
            erdTable.updateErdTable(tableUpdateRequest.getTableName(), tableUpdateRequest.getTableX(), tableUpdateRequest.getTableY(), tableUpdateRequest.getTableColor());
        }else{
            new NotMatchException(PROJECT_NOT_MATCH);
        }
    }

    @Override
    public void deleteTable(Long projectId, Long tableId) {
        ErdTable erdTable = tableRepository.findById(tableId).orElseThrow(() -> new NotFoundException(TABLE_NOT_FOUND));
        if(projectId.equals(erdTable.getProject().getProjectId())) {
            tableRepository.delete(erdTable);
        }else{
            new NotMatchException(PROJECT_NOT_MATCH);
        }

    }

    @Override
    public void createTableRelation(Long projectId, TableRelationCreateRequest tableRelationCreateRequest) {
        ErdTable toErdTable = tableRepository.findById(tableRelationCreateRequest.getToTableId()).orElseThrow(() -> new NotFoundException(TABLE_NOT_FOUND));
        ErdTable fromErdTable = tableRepository.findById(tableRelationCreateRequest.getFromTableId()).orElseThrow(() -> new NotFoundException(TABLE_NOT_FOUND));
        Relation relation = relationRepository.findById(tableRelationCreateRequest.getRelationId()).orElseThrow(() -> new NotFoundException(RELATION_NOT_FOUND));

        if(projectId.equals(toErdTable.getProject().getProjectId()) && projectId.equals(fromErdTable.getProject().getProjectId())){
            TableRelation tableRelation = TableRelation.createTableRelation(toErdTable, fromErdTable, relation);
            tableRelationRepository.save(tableRelation);
        }else{
            new NotMatchException(PROJECT_NOT_MATCH);
        }


    }

    @Override
    public void deleteTableRelation(Long projectId, Long tableRelationId) {
        TableRelation tableRelation = tableRelationRepository.findById(tableRelationId).orElseThrow(() -> new NotFoundException(RELATION_NOT_FOUND));
        if (projectId.equals(tableRelation.getToErdTable().getProject().getProjectId()) && projectId.equals(tableRelation.getFromErdTable().getProject().getProjectId())){
            tableRelationRepository.delete(tableRelation);
        }else{
            new NotMatchException(PROJECT_NOT_MATCH);
        }
    }

    @Override
    public List<RelationListResponse> findAllRelation() {
        List<Relation> relations = relationRepository.findAll();
        List<RelationListResponse> relationListResponses = relations.stream().map(RelationListResponse::from).collect(Collectors.toList());

        return relationListResponses;
    }

    @Override
    public List<ConstraintListResponse> findAllConstraint() {
        List<Condition> constraints = constraintRepository.findAll();
        List<ConstraintListResponse> constraintListResponses = constraints.stream().map(ConstraintListResponse::from).collect(Collectors.toList());

        return constraintListResponses;
    }

    @Override
    public void createTableColumn(Long projectId, Long tableId) {
        ErdTable erdTable = tableRepository.findById(tableId).orElseThrow(() -> new NotFoundException(TABLE_NOT_FOUND));
        if(projectId.equals(erdTable.getProject().getProjectId())){
            TableColumn tableColumn = TableColumn.createTableColumn(erdTable);
            tableColumnRepository.save(tableColumn);
        }else{
            new NotMatchException(PROJECT_NOT_MATCH);
        }

    }

    @Override
    public void updateTableColumn(Long projectId, Long tableId, Long tableColumnId, TableColumnUpdateRequest tableColumnUpdateRequest) {
        ErdTable erdTable = tableRepository.findById(tableId).orElseThrow(() -> new NotFoundException(TABLE_NOT_FOUND));
        if(projectId.equals(erdTable.getProject().getProjectId())){
            TableColumn tableColumn = tableColumnRepository.findById(tableColumnId).orElseThrow(() -> new NotFoundException(TABLE_COLUMN_NOT_FOUND));
            if(tableId.equals(tableColumn.getErdTable().getErdTableId())){
                //컬럼이름 바꾸기
                tableColumn.updateTableColumn(tableColumnUpdateRequest.getTableColumnName());

                //컬럼에 딸린 제약조건 다 삭제하고
                columnConstraintRepository.deleteAllByTableColumn(tableColumn);
                //새롭게 제약조건 설정
                for (Long constraintId : tableColumnUpdateRequest.getConstraintIds()) {
                    Condition condition = constraintRepository.findById(constraintId).orElseThrow(() -> new NotFoundException(CONSTRAINT_NOT_FOUND));
                    ColumnCondition.createColumnCondition(tableColumn, condition);
                }
            }else{
                new NotMatchException(TABLE_NOT_MATCH);
            }
        }else{
            new NotMatchException(PROJECT_NOT_MATCH);
        }
    }

    @Override
    public void deleteTableColumn(Long projectId, Long tableColumnId) {
        TableColumn tableColumn = tableColumnRepository.findById(tableColumnId).orElseThrow(() -> new NotFoundException(TABLE_COLUMN_NOT_FOUND));
        if(projectId.equals(tableColumn.getErdTable().getProject().getProjectId())){
            tableColumnRepository.delete(tableColumn);
        }else{
            new NotMatchException(PROJECT_NOT_MATCH);
        }

    }

    @Override
    public List<TableListResponse> findAllTable(Long projectId){
        Project project = projectRepository.findById(projectId).orElseThrow(() -> new NotFoundException(PROJECT_NOT_FOUND));
        List<ErdTable> tables = tableRepository.findAllByProject(project);

        List<TableListResponse> tableListResponses = tables.stream().map(TableListResponse::from).collect(Collectors.toList());

        return tableListResponses;
    }
}
