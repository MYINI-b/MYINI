package com.ssafy.myini.ERD.domain.entity;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
public class TableColumn {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "table_column_id")
    private Long tableColumnId;

    @Column(nullable = false)
    private String tableColumnName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "table_id")
    private ErdTable erdTable;

    @OneToMany(mappedBy = "tableColumn", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<ColumnCondition> columnConditions = new ArrayList<>();

    public static TableColumn createTableColumn(ErdTable erdTable){
        TableColumn tableColumn = new TableColumn();
        tableColumn.tableColumnName = "이름을 입력해주세요";
        tableColumn.erdTable = erdTable;

        return tableColumn;
    }

    public void updateTableColumn(String tableColumnName){
        this.tableColumnName = tableColumnName;
    }
}
