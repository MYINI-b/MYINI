package com.ssafy.myini.ERD.domain.repository;

import com.ssafy.myini.ERD.domain.entity.Relation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RelationRepository extends JpaRepository<Relation, Long> {
}
