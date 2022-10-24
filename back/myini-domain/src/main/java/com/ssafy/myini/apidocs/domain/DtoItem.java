package com.ssafy.myini.apidocs.domain;

import com.ssafy.myini.common.type.YN;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
public class DtoItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "dto_item_id")
    private Long dtoItemId;

    private String dtoItemName;

    @Enumerated(EnumType.STRING)
    private YN dtoIsList;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dto_id")
    private Dto dto;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dto_class_type")
    private Dto dtoClassType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "primitive_id")
    private Primitive primitive;
}
