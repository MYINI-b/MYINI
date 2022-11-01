package com.ssafy.myini.project.response;

import com.querydsl.core.annotations.QueryProjection;
import com.ssafy.myini.project.domain.Project;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectInfoResponse {
    private String projectName;
    private String projectDescription;
    private String projectImg;
    private LocalDate projectStartedDate;
    private LocalDate projectFinishedDate;
    private String projectGithubUrl;
    private String projectJiraUrl;
    private String projectNotionUrl;
    private String projectFigmaUrl;


    public static ProjectInfoResponse from(Project project){
        ProjectInfoResponse projectInfoResponse = new ProjectInfoResponse();
        projectInfoResponse.projectName = project.getProjectName();
        projectInfoResponse.projectDescription = project.getProjectDescription();
        projectInfoResponse.projectImg = project.getProjectImg();
        projectInfoResponse.projectStartedDate = project.getProjectStartedDate();
        projectInfoResponse.projectFinishedDate = project.getProjectFinishedDate();
        projectInfoResponse.projectGithubUrl = project.getProjectGithubUrl();
        projectInfoResponse.projectJiraUrl = project.getProjectJiraUrl();
        projectInfoResponse.projectNotionUrl = project.getProjectNotionUrl();
        projectInfoResponse.projectFigmaUrl = project.getProjectFigmaUrl();
        return  projectInfoResponse;
    }
}