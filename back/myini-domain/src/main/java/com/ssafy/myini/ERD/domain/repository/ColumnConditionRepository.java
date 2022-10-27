package com.ssafy.myini.ERD.domain.repository;

import com.ssafy.myini.ERD.domain.entity.ColumnCondition;
import com.ssafy.myini.ERD.domain.entity.TableColumn;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ColumnConditionRepository extends JpaRepository<ColumnCondition, Long> {
    Void deleteAllInBatchByTableColumn(TableColumn tableColumn);
    Integer deleteAllInBatchByTableColumn_TableColumnId(Long tableColumnId);
}
