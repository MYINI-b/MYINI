package com.ssafy.myini.apidocs.domain;

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
public class Primitive {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "primitive_id")
    private Long primitiveId;

    private String primitiveName;

    @OneToMany(mappedBy = "primitive", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<DtoItem> dtoItems = new ArrayList<>();
}
