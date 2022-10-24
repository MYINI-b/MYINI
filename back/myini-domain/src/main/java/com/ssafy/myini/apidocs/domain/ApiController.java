package com.ssafy.myini.apidocs.domain;

import com.ssafy.myini.common.BaseEntity;
import com.ssafy.myini.project.domain.Project;
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
public class ApiController extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "api_controller_id")
    private Long apiControllerId;

    private String apiControllerName;

    private String apiControllerBaseUrl;

    private String apiControllerDescription;

    @OneToMany(mappedBy = "apiController", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Api> apis = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    private Project project;


}
