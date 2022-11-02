package com.ssafy.myini.fileio;

import com.ssafy.myini.apidocs.response.ProjectInfoListResponse;
import com.ssafy.myini.initializer.request.InitializerRequest;

public class ServiceWrite {
    public static String servicePreview(ProjectInfoListResponse projectInfoListResponse, InitializerRequest initializerRequest) {
        return null;
    }

    public static void serviceWrite(ProjectInfoListResponse projectInfoListResponse, InitializerRequest initializerRequest) {
        FileWrite.fileWrite(projectInfoListResponse, initializerRequest, servicePreview(projectInfoListResponse, initializerRequest), "service", "Service");
    }
}