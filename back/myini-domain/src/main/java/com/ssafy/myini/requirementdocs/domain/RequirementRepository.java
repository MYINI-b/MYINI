package com.ssafy.myini.requirementdocs.domain;

import org.springframework.data.jpa.repository.JpaRepository;


public interface RequirementRepository extends JpaRepository<Requirement, Long> {

    boolean existsByRequirementCategory(RequirementCategory requirementCategory);
}