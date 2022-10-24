package com.ssafy.myini.ERD.domain.entity;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.persistence.Column;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Table {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "table_id")
    private Long tableId;

    @Column(nullable = false)
    private String tableName;

    @Column(nullable = false)
    private Double tableX;

    @Column(nullable = false)
    private Double tableY;

    @Column(nullable = false)
    private String tableColor;

    //project연결

    @OneToMany(mappedBy = "toTable", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    List<TableRelation> toTableRelations = new ArrayList<>();

    @OneToMany(mappedBy = "fromTable", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    List<TableRelation> fromTableRelations = new ArrayList<>();

    @OneToMany(mappedBy = "table", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    List<TableColumn> tableColumns = new ArrayList<>();

    public static Table createTable(){
        return null;
    }
}
