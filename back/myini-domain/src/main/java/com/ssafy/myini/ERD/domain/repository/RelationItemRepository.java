package com.ssafy.myini.ERD.domain.repository;

import com.ssafy.myini.ERD.domain.entity.RelationItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RelationItemRepository extends JpaRepository<RelationItem, Long> {
}
