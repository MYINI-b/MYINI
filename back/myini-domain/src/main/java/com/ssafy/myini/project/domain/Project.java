package com.ssafy.myini.project.domain;

import com.ssafy.myini.apidocs.domain.ApiController;
import com.ssafy.myini.erd.domain.entity.ErdTable;
import com.ssafy.myini.member.domain.MemberProject;
import com.ssafy.myini.requirementdocs.domain.Requirement;
import com.ssafy.myini.requirementdocs.domain.RequirementCategory;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

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

    public void updateProject(String projectName, String projectDescription, String projectImg, LocalDate projectStartedDate, LocalDate projectFinishedDate,
                              String projectGithubUrl, String projectJiraUrl, String projectNotionUrl, String projectFigmaUrl){
        this.projectName = projectName;
        this.projectDescription = projectDescription;
        this.projectImg = projectImg;
        this.projectStartedDate = projectStartedDate;
        this.projectFinishedDate = projectFinishedDate;
        this.projectGithubUrl = projectGithubUrl;
        this.projectJiraUrl = projectJiraUrl;
        this.projectNotionUrl = projectNotionUrl;
        this.projectFigmaUrl = projectFigmaUrl;
    }
}
