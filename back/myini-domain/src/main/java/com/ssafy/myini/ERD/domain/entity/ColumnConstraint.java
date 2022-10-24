package com.ssafy.myini.ERD.domain.entity;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.persistence.Column;


@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class ColumnConstraint {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "column_constraint_id")
    private Long columnConstraintId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "column_id")
    private TableColumn tableColumn;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "constraint_id")
    private Constraint constraint;
}
