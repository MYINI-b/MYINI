package com.ssafy.myini.initializer.service;

import com.ssafy.myini.initializer.request.InitializerRequest;
import com.ssafy.myini.initializer.response.InitializerPossibleResponse;
import com.ssafy.myini.initializer.response.PreviewResponse;
import com.ssafy.myini.member.domain.Member;

import java.io.ByteArrayOutputStream;
import java.util.List;

public interface InitializerService {
    InitializerPossibleResponse initializerIsPossible(Long projectId);
    Void initializerStart(Long projectId, InitializerRequest initializerRequest);
    List<PreviewResponse> initializerPreview(Long projectId, InitializerRequest initializerRequest);
    ByteArrayOutputStream myIniDownload();
}
