package com.ssafy.myini.erd.query;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.myini.erd.domain.entity.*;
import com.ssafy.myini.project.domain.Project;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
@RequiredArgsConstructor
public class ERDQueryRepository {
    private final JPAQueryFactory jpaQueryFactory;

    public List<ErdTable> findAllErdTable(Project project){
        QErdTable erdTable = new QErdTable("erdTable");
        QTableColumn tableColumn = new QTableColumn("tableColumn");
        QTableRelation tableRelation = new QTableRelation("tableRelation");
        QColumnCondition columnCondition = new QColumnCondition("columnCondition");


        List<ErdTable> erdTables = jpaQueryFactory
                .selectFrom(erdTable).distinct()
                .leftJoin(erdTable.fromErdTableRelations, tableRelation)
                .leftJoin(erdTable.toErdTableRelations, tableRelation)
                .leftJoin(erdTable.erdTableColumns, tableColumn)
                .leftJoin(tableColumn.columnConditions, columnCondition)
                .where(erdTable.project.eq(project))
                .fetch();

        return erdTables;
    }
}
