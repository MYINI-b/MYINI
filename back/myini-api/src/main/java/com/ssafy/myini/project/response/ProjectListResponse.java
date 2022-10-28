package com.ssafy.myini.project.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectListResponse {
    private String projectName;
    private String projectDescription;
    private String projectImg;
    private List<ProjectMemberResponse> projectMemberResponses;

}