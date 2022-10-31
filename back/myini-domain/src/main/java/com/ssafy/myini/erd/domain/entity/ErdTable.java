package com.ssafy.myini.erd.domain.entity;

import com.ssafy.myini.project.domain.Project;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.persistence.Column;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
public class ErdTable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "erd_table_id")
    private Long erdTableId;

    @Column(nullable = false)
    private String erdTableName;

    @Column(nullable = false)
    private Double erdTableX;

    @Column(nullable = false)
    private Double erdTableY;

    @Column(nullable = false)
    private String erdTableColor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    private Project project;

    @OneToMany(mappedBy = "toErdTable", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<TableRelation> toErdTableRelations = new ArrayList<>();

    @OneToMany(mappedBy = "fromErdTable", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<TableRelation> fromErdTableRelations = new ArrayList<>();

    @OneToMany(mappedBy = "erdTable", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<TableColumn> erdTableColumns = new ArrayList<>();

    public static ErdTable createErdTable(String erdTableName, Double erdTableX, Double erdTableY, String erdTableColor, Project project){
        ErdTable erdTable = new ErdTable();
        erdTable.erdTableName = erdTableName;
        erdTable.erdTableX = erdTableX;
        erdTable.erdTableY = erdTableY;
        erdTable.erdTableColor = erdTableColor;
        erdTable.project = project;
        return erdTable;
    }

    public void updateErdTable(String erdTableName, Double erdTableX, Double erdTableY, String erdTableColor){
        this.erdTableName = erdTableName;
        this.erdTableX = erdTableX;
        this.erdTableY = erdTableY;
        this.erdTableColor = erdTableColor;
    }
}
