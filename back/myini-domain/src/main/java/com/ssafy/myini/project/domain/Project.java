package com.ssafy.myini.project.domain;

import com.ssafy.myini.apidocs.domain.ApiController;
import com.ssafy.myini.ERD.domain.entity.ErdTable;
import com.ssafy.myini.member.domain.MemberProject;
import com.ssafy.myini.requirement.domain.Requirement;
import com.ssafy.myini.requirement.domain.RequirementCategory;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "project_id")
    private Long projectId;

    @Column(nullable = false)
    private String projectName;

    private String projectDescription;

    private String projectImg;

    private LocalDate projectStartedDate;

    private LocalDate projectFinishedDate;

    private String projectGithubUrl;

    private String projectJiraUrl;

    private String projectNotionUrl;

    private String projectFigmaUrl;

    @OneToMany(mappedBy = "project", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<MemberProject> memberProjects = new ArrayList<>();

    @OneToMany(mappedBy = "project", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<RequirementCategory> requirementCategories = new ArrayList<>();

    @OneToMany(mappedBy = "project", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Requirement> requirements = new ArrayList<>();

    @OneToMany(mappedBy = "project", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<ApiController> apiControllers = new ArrayList<>();

    @OneToMany(mappedBy = "project", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<ErdTable> tables  = new ArrayList<>();

    public static Project createProject() {
        Project project = new Project();
        project.projectName = "Untitled";
        return project;
    }
}
