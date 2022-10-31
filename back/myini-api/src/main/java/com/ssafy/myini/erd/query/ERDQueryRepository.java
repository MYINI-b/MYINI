package com.ssafy.myini.erd.query;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.myini.erd.domain.entity.ErdTable;
import com.ssafy.myini.erd.domain.entity.QErdTable;
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


        return null;
    }
}
