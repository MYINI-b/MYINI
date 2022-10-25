package com.ssafy.myini.ERD.domain.repository;

import com.ssafy.myini.ERD.domain.entity.Condition;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConstraintRepository extends JpaRepository<Condition, Long> {
}
