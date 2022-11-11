package com.ssafy.myini.erd.service;

import com.ssafy.myini.erd.domain.entity.*;
import com.ssafy.myini.erd.domain.repository.*;
import com.ssafy.myini.erd.request.TableColumnUpdateRequest;
import com.ssafy.myini.erd.request.ErdTableCreateRequest;
import com.ssafy.myini.erd.request.TableRelationCreateRequest;
import com.ssafy.myini.erd.request.ErdTableUpdateRequest;
import com.ssafy.myini.erd.response.ConditionItemListResponse;
import com.ssafy.myini.erd.response.RelationItemListResponse;
import com.ssafy.myini.erd.response.ErdTableListResponse;
import com.ssafy.myini.NotFoundException;
import com.ssafy.myini.project.domain.Project;
import com.ssafy.myini.project.domain.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.FileUtils;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.io.FileReader;
import java.net.URL;
import java.util.List;
import java.util.stream.Collectors;

import static com.ssafy.myini.NotFoundException.*;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
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
        Project findProject = projectRepository.findById(projectId).orElseThrow(() -> new NotFoundException(PROJECT_NOT_FOUND));

        ErdTable erdTable = ErdTable.createErdTable(erdTableCreateRequest.getErdTableName(), erdTableCreateRequest.getErdTableX(), erdTableCreateRequest.getErdTableY(), erdTableCreateRequest.getErdTableColor(), findProject);
        erdTableRepository.save(erdTable);
    }

    @Override
    public List<ErdTableListResponse> findAllErdTable(Long projectId){
        Project findProject = projectRepository.findById(projectId).orElseThrow(() -> new NotFoundException(PROJECT_NOT_FOUND));
        List<ErdTable> findErdTable = erdTableRepository.findAllByProject(findProject);
        return findErdTable.stream().map(ErdTableListResponse::from).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void updateErdTable(Long erdTableId, ErdTableUpdateRequest erdTableUpdateRequest) {
        ErdTable findErdTable = erdTableRepository.findById(erdTableId).orElseThrow(() -> new NotFoundException(TABLE_NOT_FOUND));

        findErdTable.updateErdTable(erdTableUpdateRequest.getErdTableName(), erdTableUpdateRequest.getErdTableX(), erdTableUpdateRequest.getErdTableY(), erdTableUpdateRequest.getErdTableColor());
    }

    @Override
    @Transactional
    public void deleteErdTable(Long erdTableId) {
        ErdTable findErdTable = erdTableRepository.findById(erdTableId).orElseThrow(() -> new NotFoundException(TABLE_NOT_FOUND));

        erdTableRepository.delete(findErdTable);
    }

    @Override
    @Transactional
    public void createTableRelation(TableRelationCreateRequest tableRelationCreateRequest) {
        ErdTable toErdTable = erdTableRepository.findById(tableRelationCreateRequest.getToErdTableId()).orElseThrow(() -> new NotFoundException(TABLE_NOT_FOUND));
        ErdTable fromErdTable = erdTableRepository.findById(tableRelationCreateRequest.getFromErdTableId()).orElseThrow(() -> new NotFoundException(TABLE_NOT_FOUND));
        RelationItem findRelationItem = relationItemRepository.findById(tableRelationCreateRequest.getRelationItemId()).orElseThrow(() -> new NotFoundException(RELATION_NOT_FOUND));

        TableRelation tableRelation = TableRelation.createTableRelation(toErdTable, fromErdTable, findRelationItem);
        tableRelationRepository.save(tableRelation);
    }

    @Override
    @Transactional
    public void deleteTableRelation(Long tableRelationId) {
        TableRelation findTableRelation = tableRelationRepository.findById(tableRelationId).orElseThrow(() -> new NotFoundException(RELATION_NOT_FOUND));
          tableRelationRepository.delete(findTableRelation);
    }

    @Override
    public List<RelationItemListResponse> findAllRelationItem() {
        List<RelationItem> findRelationItems = relationItemRepository.findAll();

        return findRelationItems.stream().map(RelationItemListResponse::from).collect(Collectors.toList());
    }

    @Override
    public List<ConditionItemListResponse> findAllConditionItem() {
        List<ConditionItem> findConstraints = conditionItemRepository.findAll();

        return findConstraints.stream().map(ConditionItemListResponse::from).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void createTableColumn(Long erdTableId) {
        ErdTable findErdTable = erdTableRepository.findById(erdTableId).orElseThrow(() -> new NotFoundException(TABLE_NOT_FOUND));

        TableColumn tableColumn = TableColumn.createTableColumn(findErdTable);
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
        TableColumn findTableColumn = tableColumnRepository.findById(tableColumnId).orElseThrow(() -> new NotFoundException(TABLE_COLUMN_NOT_FOUND));
          tableColumnRepository.delete(findTableColumn);
    }

    @Override
    public JSONObject getErdJson(Long projectId) {
        try {
            URL url = new URL("https://myini.s3.ap-northeast-2.amazonaws.com/ERD/"+projectId+".myini.json");
            
            File file = new File(projectId+"_vuerd");
            FileUtils.copyURLToFile(url,file);
            
            FileReader fileReader = new FileReader(file);

            JSONParser parser = new JSONParser();
            Object parse = parser.parse(fileReader);
            JSONObject jsonObject = (JSONObject) parse;

            fileReader.close();

            if(file.exists()){
                file.delete();
            }

            return jsonObject;

        }catch (Exception e){
            throw new RuntimeException("erd Json을 다운로드하는데 실패하였습니다.");
        }
    }
}
