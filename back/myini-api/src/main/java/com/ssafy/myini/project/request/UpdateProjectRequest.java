package com.ssafy.myini.project.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateProjectRequest {
    private String projectName;
    private String projectDescription;
    private String projectImg;
    private LocalDate projectStartedDate;
    private LocalDate projectFinishedDate;
    private String projectGithubUrl;
    private String projectJiraUrl;
    private String projectNotionUrl;
    private String projectFigmaUrl;
}