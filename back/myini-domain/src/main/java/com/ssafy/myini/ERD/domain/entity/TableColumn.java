package com.ssafy.myini.ERD.domain.entity;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class TableColumn {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "table_column_id")
    private Long tableColumnId;

    @Column(nullable = false)
    private String tableColumnName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "table_id")
    private Table table;

    @OneToMany(mappedBy = "tableColumn", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    List<ColumnConstraint> columnConstraints = new ArrayList<>();
}
