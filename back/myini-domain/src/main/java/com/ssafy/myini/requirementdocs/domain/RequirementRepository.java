package com.ssafy.myini.requirementdocs.domain;

import com.ssafy.myini.member.domain.Member;
import com.ssafy.myini.project.domain.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RequirementRepository extends JpaRepository<Requirement, Long> {

    boolean existsByRequirementCategory(RequirementCategory requirementCategory);
}