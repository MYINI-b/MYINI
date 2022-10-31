package com.ssafy.myini.erd.domain.entity;

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
public class ConditionItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "condition_item_id")
    private Long conditionItemId;

    @Column(nullable = false)
    private String conditionItemName;

    @OneToMany(mappedBy = "conditionItem", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<ColumnCondition> columnConditions = new ArrayList<>();
}
