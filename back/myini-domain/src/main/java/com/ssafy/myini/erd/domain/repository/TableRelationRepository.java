package com.ssafy.myini.erd.domain.repository;

import com.ssafy.myini.erd.domain.entity.TableRelation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TableRelationRepository extends JpaRepository<TableRelation, Long> {
}
