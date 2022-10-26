package com.ssafy.myini.ERD.controller;

import com.ssafy.myini.ERD.request.TableColumnUpdateRequest;
import com.ssafy.myini.ERD.request.ErdTableCreateRequest;
import com.ssafy.myini.ERD.request.TableRelationCreateRequest;
import com.ssafy.myini.ERD.request.ErdTableUpdateRequest;
import com.ssafy.myini.ERD.response.ConstraintListResponse;
import com.ssafy.myini.ERD.response.RelationListResponse;
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

    @PostMapping("/{project_id}/table")
    public ResponseEntity<Void> createTable(@PathVariable("project_id") Long projectId,
                                            @RequestBody ErdTableCreateRequest erdTableCreateRequest){
        erdService.createTable(projectId, erdTableCreateRequest);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/{project_id}/table")
    public ResponseEntity<List<ErdTableListResponse>> findAllTable(
                                                                @PathVariable("project_id") Long projectId){
        List<ErdTableListResponse> body = erdService.findAllTable( projectId);

        return ResponseEntity.ok().body(body);
    }

    @PutMapping("/{project_id}/table/{table_id}")
    public ResponseEntity<Void> updateTable(
                                            @PathVariable("project_id") Long projectId,
                                            @PathVariable("table_id") Long tableId,
                                            @RequestBody ErdTableUpdateRequest erdTableUpdateRequest){
        erdService.updateTable(projectId,tableId, erdTableUpdateRequest);

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @DeleteMapping("/{project_id}/table/{table_id}")
    public ResponseEntity<Void> deleteTable(
                                            @PathVariable("project_id") Long projectId,
                                            @PathVariable("table_id") Long tableId){
        erdService.deleteTable(projectId,tableId);

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

    @GetMapping("/relation")
    public ResponseEntity<List<RelationListResponse>> findAllRelation(){
        List<RelationListResponse> body = erdService.findAllRelation();

        return ResponseEntity.ok().body(body);
    }

    @GetMapping("/constraint")
    public ResponseEntity<List<ConstraintListResponse>> findListConstraint(){
        List<ConstraintListResponse> body = erdService.findAllConstraint();

        return ResponseEntity.ok().body(body);
    }

    @GetMapping("/{project_id}/table/{table_id}/tablecolumn")
    public ResponseEntity<Void> createTableColumn(
                                                  @PathVariable("project_id") Long projectId,
                                                  @PathVariable("table_id")Long tableId){
        erdService.createTableColumn(projectId,tableId);

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping("/{project_id}/table/{table_id}/tablecolumn/{table_column_id}")
    public ResponseEntity<Void> updateTableColumn(@PathVariable("project_id") Long projectId,
                                                  @PathVariable("table_id") Long tableId,
                                                  @PathVariable("table_column_id") Long tableColumnId,
                                                  @RequestBody TableColumnUpdateRequest tableColumnUpdateRequest){
        erdService.updateTableColumn(projectId,tableId,tableColumnId,tableColumnUpdateRequest);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping("/{project_id}/table/{table_id}/column/{table_column_id}")
    public ResponseEntity<Void> deleteTableColumn(
                                                  @PathVariable("project_id") Long projectId,
                                                  @PathVariable("table_column_id") Long tableColumnId){
        erdService.deleteTableColumn(projectId,tableColumnId);

        return ResponseEntity.status(HttpStatus.OK).build();
    }


}
