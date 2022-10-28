package com.ssafy.myini.apidocs.domain;

import com.ssafy.myini.project.domain.Project;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApiControllerRepository extends JpaRepository<ApiController, Long> {
    List<ApiController> findByProject(Project project);
}
