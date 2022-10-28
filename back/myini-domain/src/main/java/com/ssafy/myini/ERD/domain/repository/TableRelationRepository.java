package com.ssafy.myini.ERD.domain.repository;

import com.ssafy.myini.ERD.domain.entity.TableRelation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TableRelationRepository extends JpaRepository<TableRelation, Long> {
}
