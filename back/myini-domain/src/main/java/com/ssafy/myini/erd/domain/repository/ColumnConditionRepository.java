package com.ssafy.myini.erd.domain.repository;

import com.ssafy.myini.erd.domain.entity.ColumnCondition;
import com.ssafy.myini.erd.domain.entity.TableColumn;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ColumnConditionRepository extends JpaRepository<ColumnCondition, Long> {
    Void deleteAllInBatchByTableColumn(TableColumn tableColumn);
    Integer deleteAllInBatchByTableColumn_TableColumnId(Long tableColumnId);
}
