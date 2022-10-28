package com.ssafy.myini.initializer.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InitializerRequest {
    private String spring_base_path;
    private String spring_type;
    private String spring_language;
    private String spring_platform_version;
    private String spring_packaging;
    private String spring_jvm_version;
    private String spring_group_id;
    private String spring_artifact_id;
    private String spring_name;
    private String spring_description;
    private String spring_package_name;
    private List<String> spring_dependency_name;
}
