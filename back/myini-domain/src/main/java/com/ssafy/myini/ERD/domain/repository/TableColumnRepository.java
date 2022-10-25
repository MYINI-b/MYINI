package com.ssafy.myini.ERD.domain.repository;

import com.ssafy.myini.ERD.domain.entity.TableColumn;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TableColumnRepository extends JpaRepository<TableColumn, Long> {
}
