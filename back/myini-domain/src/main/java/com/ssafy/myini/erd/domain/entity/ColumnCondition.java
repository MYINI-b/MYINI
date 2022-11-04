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
public class ColumnCondition {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "column_condition_id")
    private Long columnConditionId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "table_column_id")
    private TableColumn tableColumn;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "condition_item_id")
    private ConditionItem conditionItem;

    public static ColumnCondition createColumnCondition(TableColumn tableColumn, ConditionItem conditionItem){
        ColumnCondition columnCondition = new ColumnCondition();
        columnCondition.tableColumn = tableColumn;
        columnCondition.conditionItem = conditionItem;

        return columnCondition;
    }
}
