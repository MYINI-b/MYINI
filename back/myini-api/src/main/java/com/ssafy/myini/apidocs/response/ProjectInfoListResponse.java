package com.ssafy.myini.apidocs.response;

import com.ssafy.myini.apidocs.domain.ApiController;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProjectInfoListResponse {
    private Long apiControllerId;
    private String apiControllerName;
    private String apiControllerBaseUrl;
    private String apiControllerDescription;
    private List<ApiInfoResponse> apiInfoResponses;

    public static ProjectInfoListResponse from(ApiController apiController){
        ProjectInfoListResponse projectInfoListResponse = new ProjectInfoListResponse();
        projectInfoListResponse.apiControllerId = apiController.getApiControllerId();
        projectInfoListResponse.apiControllerName = apiController.getApiControllerName();
        projectInfoListResponse.apiControllerBaseUrl = apiController.getApiControllerBaseUrl();
        projectInfoListResponse.apiControllerDescription = apiController.getApiControllerDescription();
        if(apiController.getApis() != null){
            projectInfoListResponse.apiInfoResponses = apiController.getApis().stream()
                    .map(ApiInfoResponse::from)
                    .collect(Collectors.toList());
        }
        return projectInfoListResponse;
    }
}
