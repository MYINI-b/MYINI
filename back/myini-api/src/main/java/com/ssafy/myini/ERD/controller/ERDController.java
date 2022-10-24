package com.ssafy.myini.ERD.controller;

import com.ssafy.myini.ERD.request.TableColumnUpdateRequest;
import com.ssafy.myini.ERD.request.TableCreateRequest;
import com.ssafy.myini.ERD.request.TableRelationCreateRequest;
import com.ssafy.myini.ERD.request.TableUpdateRequest;
import com.ssafy.myini.ERD.response.ConstraintListResponse;
import com.ssafy.myini.ERD.response.RelationListResponse;
import com.ssafy.myini.ERD.response.TableListResponse;
import com.ssafy.myini.ERD.service.ERDService;
import com.ssafy.myini.config.LoginMember;
import com.ssafy.myini.member.domain.Member;
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
    public ResponseEntity<Void> createTable(@LoginMember Member member, Long projectId, TableCreateRequest tableCreateRequest){
        erdService.createTable(member, projectId, tableCreateRequest);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/{project_id}/table")
    public ResponseEntity<List<TableListResponse>> findAllTable(@LoginMember Member member, Long projectId){
        List<TableListResponse> body = erdService.findAllTable(member, projectId);

        return ResponseEntity.ok().body(body);
    }

    @PutMapping("/{project_id}/table/{table_id}")
    public ResponseEntity<Void> updateTable(@LoginMember Member member, Long projectId, Long tableId, TableUpdateRequest tableUpdateRequest){
        erdService.updateTable(member,projectId,tableId,tableUpdateRequest);

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @DeleteMapping("/{project_id}/table/{table_id}")
    public ResponseEntity<Void> deleteTable(@LoginMember Member member, Long projectId, Long tableId){
        erdService.deleteTable(member,projectId,tableId);

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PostMapping("/{project_id}/tablerelation")
    public ResponseEntity<Void> createTableRelation(@LoginMember Member member, Long projectId, TableRelationCreateRequest tableRelationCreateRequest){
        erdService.createTableRelation(member,projectId,tableRelationCreateRequest);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @DeleteMapping("/{project_id}/tablerelation/{table_relation_id}")
    public ResponseEntity<Void> deleteTableRelation(@LoginMember Member member, Long projectId, Long tableRelationId){
        erdService.deleteTableRelation(member,projectId,tableRelationId);

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
    public ResponseEntity<Void> createTableColumn(@LoginMember Member member, Long projectId, Long tableId){
        erdService.createTableColumn(member,projectId,tableId);

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping("/{project_id}/table/{table_id}/tablecolumn/{column_id}")
    public ResponseEntity<Void> updateTableColumn(@LoginMember Member member,
                           Long projectId,
                           Long tableId,
                           Long tableColumnId,
                           TableColumnUpdateRequest tableColumnUpdateRequest){
        erdService.updateTableColumn(member,projectId,tableId,tableColumnId,tableColumnUpdateRequest);

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping("/{project_id}/table/{table_id}/column/{column_id}")
    public ResponseEntity<Void> deleteTableColumn(@LoginMember Member member, Long projectId, Long tableColumnId){
        erdService.deleteTableColumn(member,projectId,tableColumnId);

        return ResponseEntity.status(HttpStatus.OK).build();
    }


}
