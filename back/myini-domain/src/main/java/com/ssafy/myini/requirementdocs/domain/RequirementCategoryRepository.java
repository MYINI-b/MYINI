package com.ssafy.myini.requirementdocs.domain;

import com.ssafy.myini.project.domain.Project;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RequirementCategoryRepository extends JpaRepository<RequirementCategory, Long> {
    List<RequirementCategory> findAllByProject(Project project);
}