package com.ssafy.myini.erd.domain.repository;

import com.ssafy.myini.erd.domain.entity.ErdTable;
import com.ssafy.myini.project.domain.Project;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ErdTableRepository extends JpaRepository<ErdTable, Long> {
    List<ErdTable> findAllByProject(Project project);
}
