package com.ssafy.myini.erd.domain.entity;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.persistence.Column;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
public class TableRelation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "table_relation_id")
    private Long tableRelationId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "to_erd_table_id")
    private ErdTable toErdTable;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "from_erd_table_id")
    private ErdTable fromErdTable;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "relation_item_id")
    private RelationItem relationItem;

    public static TableRelation createTableRelation(ErdTable toErdTable, ErdTable fromErdTable, RelationItem relationItem){
        TableRelation tableRelation = new TableRelation();
        tableRelation.toErdTable = toErdTable;
        tableRelation.fromErdTable = fromErdTable;
        tableRelation.relationItem = relationItem;

        return tableRelation;
    }
}
