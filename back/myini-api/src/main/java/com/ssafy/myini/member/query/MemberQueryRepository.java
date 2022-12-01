package com.ssafy.myini.member.query;

import com.querydsl.jpa.impl.*;
import com.ssafy.myini.member.domain.*;
import com.ssafy.myini.project.domain.*;
import lombok.*;
import org.springframework.stereotype.*;

import java.util.*;

import static com.ssafy.myini.member.domain.QMemberProject.memberProject;

@Repository
@RequiredArgsConstructor
public class MemberQueryRepository {
    private final JPAQueryFactory queryFactory;

    public List<Member> findCrewById(Member me) {
        // 회원이 참가했던 프로젝트들
        List<Project> projects = queryFactory
                .select(memberProject.project)
                .from(memberProject)
                .where(memberProject.member.eq(me))
                .fetch();

        List<Member> members = queryFactory
                .select(memberProject.member)
                .from(memberProject)
                .where(memberProject.project.in(projects)
                        .and(memberProject.member.ne(me)))
                .fetch();

        return members;
    }
}
