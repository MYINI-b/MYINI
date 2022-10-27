package com.ssafy.myini.ERD.domain.entity;

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
public class RelationItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "relation_item_id")
    private Long relationItemId;

    @Column(nullable = false)
    private String relationItemName;

    @OneToMany(mappedBy = "relationItem", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<TableRelation> tableRelations = new ArrayList<>();
}
