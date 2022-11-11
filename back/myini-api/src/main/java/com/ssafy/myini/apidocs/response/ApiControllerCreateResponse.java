package com.ssafy.myini.apidocs.response;

import com.ssafy.myini.apidocs.domain.ApiController;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ApiControllerCreateResponse {
    private Long apiControllerId;

    public static ApiControllerCreateResponse from(ApiController apiController){
        ApiControllerCreateResponse apiControllerCreateResponse = new ApiControllerCreateResponse();
        apiControllerCreateResponse.apiControllerId = apiController.getApiControllerId();
        return apiControllerCreateResponse;
    }
}
