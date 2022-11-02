package com.ssafy.myini.apidocs.domain;

import com.ssafy.myini.apidocs.domain.type.DtoType;
import com.ssafy.myini.common.type.YN;
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

    @Enumerated(EnumType.STRING)
    private YN dtoIsList;

    @OneToMany(mappedBy = "dto", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<DtoItem> dtoItemChildren = new ArrayList<>();

    @OneToMany(mappedBy = "dtoClassType", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<DtoItem> dtoItems = new ArrayList<>();

    public static Dto createDto(String dtoName, String dtoType, Api api, String dtoIsList){
        Dto dto = new Dto();
        dto.dtoName = dtoName;
        dto.dtoType = DtoType.valueOf(dtoType);
        dto.api = api;
        dto.dtoIsList = YN.valueOf(dtoIsList);
        return dto;
    }

    public void updateDto(String dtoName, String dtoType, String dtoIsList){
        this.dtoName = dtoName;
        this.dtoType = DtoType.valueOf(dtoType);
        this.dtoIsList = YN.valueOf(dtoIsList);
    }
}
