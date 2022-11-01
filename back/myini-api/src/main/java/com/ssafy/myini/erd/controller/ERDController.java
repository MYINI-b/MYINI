package com.ssafy.myini.erd.controller;

import com.ssafy.myini.erd.request.TableColumnUpdateRequest;
import com.ssafy.myini.erd.request.ErdTableCreateRequest;
import com.ssafy.myini.erd.request.TableRelationCreateRequest;
import com.ssafy.myini.erd.request.ErdTableUpdateRequest;
import com.ssafy.myini.erd.response.ConditionItemListResponse;
import com.ssafy.myini.erd.response.RelationItemListResponse;
import com.ssafy.myini.erd.response.ErdTableListResponse;
import com.ssafy.myini.erd.service.ERDService;
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

    @PostMapping("/{projectid}/erdtables")
    public ResponseEntity<Void> createErdTable(@PathVariable("projectid") Long projectId,
                                               @RequestBody ErdTableCreateRequest erdTableCreateRequest){
        erdService.createErdTable(projectId, erdTableCreateRequest);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/{projectid}/erdtables")
    public ResponseEntity<List<ErdTableListResponse>> findAllErdTable(@PathVariable("projectid") Long projectId){
        List<ErdTableListResponse> body = erdService.findAllErdTable(projectId);

        return ResponseEntity.ok().body(body);
    }

    @PutMapping("/erdtables/{erdtableid}")
    public ResponseEntity<Void> updateErdTable(@PathVariable("erdtableid") Long erdTableId,
                                               @RequestBody ErdTableUpdateRequest erdTableUpdateRequest){
        erdService.updateErdTable(erdTableId, erdTableUpdateRequest);

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @DeleteMapping("/erdtables/{erdtableid}")
    public ResponseEntity<Void> deleteErdTable(@PathVariable("erdtableid") Long erdTableId){
        erdService.deleteErdTable(erdTableId);

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PostMapping("/tablerelations")
    public ResponseEntity<Void> createTableRelation(@RequestBody TableRelationCreateRequest tableRelationCreateRequest){
        erdService.createTableRelation(tableRelationCreateRequest);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @DeleteMapping("/tablerelations/{tablerelationid}")
    public ResponseEntity<Void> deleteTableRelation(@PathVariable("tablerelationid") Long tableRelationId){
        erdService.deleteTableRelation(tableRelationId);

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping("/relationitems")
    public ResponseEntity<List<RelationItemListResponse>> findAllRelationItem(){
        List<RelationItemListResponse> body = erdService.findAllRelationItem();

        return ResponseEntity.ok().body(body);
    }

    @GetMapping("/conditionitems")
    public ResponseEntity<List<ConditionItemListResponse>> findAllConditionItem(){
        List<ConditionItemListResponse> body = erdService.findAllConditionItem();

        return ResponseEntity.ok().body(body);
    }

    @PostMapping("/erdtables/{erdtableid}/tablecolumns")
    public ResponseEntity<Void> createTableColumn(@PathVariable("erdtableid")Long erdTableId){
        erdService.createTableColumn(erdTableId);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping("/tablecolumns/{tablecolumnid}")
    public ResponseEntity<Void> updateTableColumn(@PathVariable("tablecolumnid") Long tableColumnId,
                                                  @RequestBody TableColumnUpdateRequest tableColumnUpdateRequest){
        erdService.updateTableColumn(tableColumnId,tableColumnUpdateRequest);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @DeleteMapping("/tablecolumns/{tablecolumnid}")
    public ResponseEntity<Void> deleteTableColumn(@PathVariable("tablecolumnid") Long tableColumnId){
        erdService.deleteTableColumn(tableColumnId);

        return ResponseEntity.status(HttpStatus.OK).build();
    }

//    @PostMapping("/erdparsing/{projectid}")
//    public ResponseEntity<Void> erdParsing(@PathVariable("projectid") Long projectId){
//        erdService.erdParsing(projectId);
//
//        return ResponseEntity.status(HttpStatus.OK).build();
//    }
}
