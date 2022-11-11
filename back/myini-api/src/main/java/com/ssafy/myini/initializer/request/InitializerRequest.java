package com.ssafy.myini.initializer.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InitializerRequest {
    private String springType;
    private String springLanguage;
    private String springPlatformVersion;
    private String springPackaging;
    private String springJvmVersion;
    private String springGroupId;
    private String springArtifactId;
    private String springName;
    private String springDescription;
    private String springPackageName;
    private String springDependencyName;
}
