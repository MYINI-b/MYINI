package com.ssafy.myini.initializer.service;

import com.ssafy.myini.initializer.request.InitializerRequest;
import com.ssafy.myini.initializer.response.InitializerPossibleResponse;
import com.ssafy.myini.member.domain.Member;

public interface InitializerService {
    InitializerPossibleResponse initializerIsPossible(Long projectId);
    Void initializerStart(Long projectId, InitializerRequest initializerRequest);
    Void myIniDownload();
}
