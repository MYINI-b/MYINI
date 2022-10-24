package com.ssafy.myini.apidocs.domain;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
public class PathVariable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "path_variable_id")
    private Long pathVariableId;

    private String pathVariableKey;

    private String pathVariableType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "api_id")
    private Api api;
}
