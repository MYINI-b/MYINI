package com.ssafy.myini.project.response;

import com.ssafy.myini.project.domain.Project;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectCreateResponse {
    private Long projectId;

    public static ProjectCreateResponse from(Project project){
        ProjectCreateResponse projectCreateResponse = new ProjectCreateResponse();
        projectCreateResponse.projectId = project.getProjectId();
        return  projectCreateResponse;
    }
}
