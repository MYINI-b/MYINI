package com.ssafy.myini.project.response;

import com.ssafy.myini.member.domain.Member;
import com.ssafy.myini.member.domain.MemberProject;
import com.ssafy.myini.project.domain.Project;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectListResponse {
    private String projectName;
    private String projectDescription;
    private String projectImg;
    private List<ProjectMemberResponse> projectMemberResponses;

    public static ProjectListResponse from(Project project){
        ProjectListResponse projectListResponse = new ProjectListResponse();
        projectListResponse.projectName = project.getProjectName();
        projectListResponse.projectDescription = project.getProjectDescription();
        projectListResponse.projectImg = project.getProjectImg();
        projectListResponse.projectMemberResponses = project.getMemberProjects().stream()
                .map(memberProject -> ProjectMemberResponse.from(memberProject.getMember()))
                .collect(Collectors.toList());
        return null;
    }

}