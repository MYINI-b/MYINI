package com.ssafy.myini.project.response;

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
    private String jiraApiKey;
    private String jiraId;
    private String jiraDomain;
    private String jiraProjectKey;
    private String jiraProjectId;


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
        projectInfoResponse.jiraApiKey = project.getJiraApiKey();
        projectInfoResponse.jiraId = project.getJiraId();
        projectInfoResponse.jiraDomain = project.getJiraDomain();
        projectInfoResponse.jiraProjectKey = project.getJiraProjectKey();
        projectInfoResponse.jiraProjectId = project.getJiraProjectId();
        return  projectInfoResponse;
    }
}