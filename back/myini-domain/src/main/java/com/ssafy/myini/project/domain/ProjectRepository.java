package com.ssafy.myini.project.domain;

import com.ssafy.myini.ERD.domain.entity.ErdTable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    Optional<Project> findByTables(ErdTable erdTable);
}