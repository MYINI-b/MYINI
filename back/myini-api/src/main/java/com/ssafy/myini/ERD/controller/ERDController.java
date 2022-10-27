package com.ssafy.myini.ERD.controller;

import com.ssafy.myini.ERD.request.TableColumnUpdateRequest;
import com.ssafy.myini.ERD.request.ErdTableCreateRequest;
import com.ssafy.myini.ERD.request.TableRelationCreateRequest;
import com.ssafy.myini.ERD.request.ErdTableUpdateRequest;
import com.ssafy.myini.ERD.response.ConditionItemListResponse;
import com.ssafy.myini.ERD.response.RelationItemListResponse;
import com.ssafy.myini.ERD.response.ErdTableListResponse;
import com.ssafy.myini.ERD.service.ERDService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/erds")
@RestController
@RequiredArgsConstructor
public class ERDController {
    private final ERDService erdService;

    @PostMapping("/{project_id}/erdtable")
    public ResponseEntity<Void> createErdTable(@PathVariable("project_id") Long projectId,
                                            @RequestBody ErdTableCreateRequest erdTableCreateRequest){
        erdService.createErdTable(projectId, erdTableCreateRequest);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/{project_id}/erdtable")
    public ResponseEntity<List<ErdTableListResponse>> findAllErdTable(
                                                                @PathVariable("project_id") Long projectId){
        List<ErdTableListResponse> body = erdService.findAllErdTable(projectId);

        return ResponseEntity.ok().body(body);
    }

    @PutMapping("/{project_id}/erdtable/{erd_table_id}")
    public ResponseEntity<Void> updateErdTable(
                                            @PathVariable("project_id") Long projectId,
                                            @PathVariable("erd_table_id") Long erdTableId,
                                            @RequestBody ErdTableUpdateRequest erdTableUpdateRequest){
        erdService.updateErdTable(projectId,erdTableId, erdTableUpdateRequest);

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @DeleteMapping("/{project_id}/erdtable/{erd_table_id}")
    public ResponseEntity<Void> deleteErdTable(
                                            @PathVariable("project_id") Long projectId,
                                            @PathVariable("erd_table_id") Long erdTableId){
        erdService.deleteErdTable(projectId,erdTableId);

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PostMapping("/{project_id}/tablerelation")
    public ResponseEntity<Void> createTableRelation(
                                                    @PathVariable("project_id") Long projectId,
                                                    @RequestBody TableRelationCreateRequest tableRelationCreateRequest){
        erdService.createTableRelation(projectId,tableRelationCreateRequest);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @DeleteMapping("/{project_id}/tablerelation/{table_relation_id}")
    public ResponseEntity<Void> deleteTableRelation(
                                                    @PathVariable("project_id") Long projectId,
                                                    @PathVariable("table_relation_id") Long tableRelationId){
        erdService.deleteTableRelation(projectId,tableRelationId);

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping("/relationitem")
    public ResponseEntity<List<RelationItemListResponse>> findAllRelationItem(){
        List<RelationItemListResponse> body = erdService.findAllRelationItem();

        return ResponseEntity.ok().body(body);
    }

    @GetMapping("/conditionitem")
    public ResponseEntity<List<ConditionItemListResponse>> findAllConditionItem(){
        List<ConditionItemListResponse> body = erdService.findAllConditionItem();

        return ResponseEntity.ok().body(body);
    }

    @PostMapping("/{project_id}/erdtable/{erd_table_id}/tablecolumn")
    public ResponseEntity<Void> createTableColumn(
                                                  @PathVariable("project_id") Long projectId,
                                                  @PathVariable("erd_table_id")Long erdTableId){
        erdService.createTableColumn(projectId,erdTableId);

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PutMapping("/{project_id}/erdtable/{erd_table_id}/tablecolumn/{table_column_id}")
    public ResponseEntity<Void> updateTableColumn(@PathVariable("project_id") Long projectId,
                                                  @PathVariable("erd_table_id") Long erdTableId,
                                                  @PathVariable("table_column_id") Long tableColumnId,
                                                  @RequestBody TableColumnUpdateRequest tableColumnUpdateRequest){
        erdService.updateTableColumn(projectId,erdTableId,tableColumnId,tableColumnUpdateRequest);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @DeleteMapping("/{project_id}/erdtable/{erd_table_id}/tablecolumn/{table_column_id}")
    public ResponseEntity<Void> deleteTableColumn(
                                                  @PathVariable("project_id") Long projectId,
                                                  @PathVariable("table_column_id") Long tableColumnId){
        erdService.deleteTableColumn(projectId,tableColumnId);

        return ResponseEntity.status(HttpStatus.OK).build();
    }


}
