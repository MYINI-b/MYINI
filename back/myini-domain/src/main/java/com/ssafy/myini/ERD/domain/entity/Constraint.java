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
public class Constraint {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "constraint_id")
    private Long constraintId;

    @Column(nullable = false)
    private String constraintName;

    @OneToMany(mappedBy = "constraint", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    List<ColumnConstraint> columnConstraints  = new ArrayList<>();
}
