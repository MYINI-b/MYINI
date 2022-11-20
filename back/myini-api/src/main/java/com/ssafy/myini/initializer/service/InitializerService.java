package com.ssafy.myini.initializer.service;

import com.ssafy.myini.initializer.request.InitializerRequest;
import com.ssafy.myini.initializer.response.InitializerPossibleResponse;
import com.ssafy.myini.initializer.response.InitializerStartResponse;
import com.ssafy.myini.initializer.response.PreviewResponse;
import org.json.simple.JSONObject;

import java.io.ByteArrayOutputStream;
import java.util.List;

public interface InitializerService {
    InitializerPossibleResponse initializerIsPossible(Long projectId);

    InitializerStartResponse initializerStart(Long projectId, InitializerRequest initializerRequest);

    List<PreviewResponse> initializerPreview(Long projectId, InitializerRequest initializerRequest);

    ByteArrayOutputStream myIniDownload();

    JSONObject initializerSettings();

    String initializerApp(String flag);

    String initializerApp2();

    void deleteZipfile(String fileName);
}
