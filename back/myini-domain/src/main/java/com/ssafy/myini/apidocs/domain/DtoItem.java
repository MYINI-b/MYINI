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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dto_id")
    private Dto dto;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dto_class_type")
    private Dto dtoClassType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "primitive_id")
    private Primitive primitive;

    public static DtoItem createDtoItem(String dtoItemName, Dto dto, Dto dtoClassType, Primitive primitive, String dtoIsList){
        DtoItem dtoItem = new DtoItem();
        dtoItem.dtoItemName = dtoItemName;
        dtoItem.dto = dto;
        dtoItem.dtoClassType = dtoClassType;
        dtoItem.primitive = primitive;
        dtoItem.dtoIsList = YN.valueOf(dtoIsList);
        return dtoItem;
    }
    public void updateDtoItem(String dtoItemName, Dto dtoClassType, Primitive primitive, String dtoIsList){
        this.dtoItemName = dtoItemName;
        this.dtoClassType = dtoClassType;
        this.primitive = primitive;
        this.dtoIsList = YN.valueOf(dtoIsList);
    }
}
