package com.ssafy.myini.erd.domain.repository;

import com.ssafy.myini.erd.domain.entity.ErdTable;
import com.ssafy.myini.erd.domain.entity.TableColumn;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TableColumnRepository extends JpaRepository<TableColumn, Long> {
    List<TableColumn> findAllByErdTable(ErdTable erdTable);
}
