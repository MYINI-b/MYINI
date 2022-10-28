package com.ssafy.myini.ERD.domain.repository;

import com.ssafy.myini.ERD.domain.entity.ConditionItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConditionItemRepository extends JpaRepository<ConditionItem, Long> {
}
