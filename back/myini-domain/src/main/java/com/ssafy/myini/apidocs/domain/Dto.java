package com.ssafy.myini.apidocs.domain;

import com.ssafy.myini.apidocs.domain.type.DtoType;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor(access =  AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
public class Dto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "dto_id")
    private Long dtoId;

    private String dtoName;

    @Enumerated(EnumType.STRING)
    private DtoType dtoType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "api_id")
    private Api api;

    @OneToOne(mappedBy = "dto", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private DtoItem dtoItem;

    @OneToMany(mappedBy = "dtoClassType", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<DtoItem> dtoItems = new ArrayList<>();
}
