package com.ssafy.myini.requirementdocs.domain;

import com.ssafy.myini.project.domain.Project;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RequirementRepository extends JpaRepository<Requirement, Long> {
    List<Requirement> findAllByProject(Project project);
}