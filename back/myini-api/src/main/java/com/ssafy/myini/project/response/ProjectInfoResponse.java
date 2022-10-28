package com.ssafy.myini.project.response;

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
    private LocalDate projectfinishedDate;
    private String projectGithubUrl;
    private String proejctJiraUrl;
    private String proejctNotionUrl;
    private String proejctFigmaUrl;
}