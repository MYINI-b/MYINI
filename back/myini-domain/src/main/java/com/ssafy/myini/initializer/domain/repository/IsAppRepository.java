package com.ssafy.myini.initializer.domain.repository;

import com.ssafy.myini.erd.domain.entity.ColumnCondition;
import com.ssafy.myini.initializer.domain.entity.IsApp;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IsAppRepository extends JpaRepository<IsApp, Long> {
}
