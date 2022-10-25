package com.ssafy.myini.ERD.domain.entity;

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
    @JoinColumn(name = "to_table_id")
    private ErdTable toErdTable;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "from_table_id")
    private ErdTable fromErdTable;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "relation_id")
    private Relation relation;

    public static TableRelation createTableRelation(ErdTable toErdTable, ErdTable fromErdTable, Relation relation){
        TableRelation tableRelation = new TableRelation();
        tableRelation.toErdTable = toErdTable;
        tableRelation.fromErdTable = fromErdTable;
        tableRelation.relation = relation;

        return tableRelation;
    }
}
