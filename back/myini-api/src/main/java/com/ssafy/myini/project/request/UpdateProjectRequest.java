package com.ssafy.myini.project.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.URL;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateProjectRequest {
    private String projectName;
    private String projectDescription;
    private LocalDate projectStartedDate;
    private LocalDate projectFinishedDate;
    @URL(message = "URL형식에 맞춰주세요.")
    private String projectGithubUrl;
    @URL(message = "URL형식에 맞춰주세요.")
    private String projectJiraUrl;
    @URL(message = "URL형식에 맞춰주세요.")
    private String projectNotionUrl;
    @URL(message = "URL형식에 맞춰주세요.")
    private String projectFigmaUrl;
}