package com.ssafy.myini.requirementdocs.response;

import com.ssafy.myini.project.domain.Project;
import com.ssafy.myini.project.response.ProjectCreateResponse;
import com.ssafy.myini.requirementdocs.domain.Requirement;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RequirementCreateResponse {
    Long requirementId;
    public static RequirementCreateResponse from(Requirement requirement){
        RequirementCreateResponse requirementCreateResponse = new RequirementCreateResponse();
        requirementCreateResponse.requirementId = requirement.getRequirementId();
        return  requirementCreateResponse;
    }
}
