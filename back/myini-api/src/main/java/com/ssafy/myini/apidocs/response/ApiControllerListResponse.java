package com.ssafy.myini.apidocs.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ApiControllerListResponse {
    private Long apiControllerId;
    private String apiControllerName;
}