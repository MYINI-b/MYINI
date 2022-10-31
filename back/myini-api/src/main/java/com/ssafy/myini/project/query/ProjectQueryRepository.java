package com.ssafy.myini.project.query;


import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.myini.member.domain.Member;
import com.ssafy.myini.member.domain.MemberProject;
import com.ssafy.myini.member.domain.QMember;
import com.ssafy.myini.member.domain.QMemberProject;
import com.ssafy.myini.project.domain.Project;
import com.ssafy.myini.project.domain.QProject;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.ssafy.myini.member.domain.QMember.member;
import static com.ssafy.myini.member.domain.QMemberProject.memberProject;
import static com.ssafy.myini.project.domain.QProject.project;

@Repository
@RequiredArgsConstructor
public class ProjectQueryRepository {
    private final JPAQueryFactory queryFactory;

    public List<MemberProject> findProjectMemberList(Long projectId){
        return queryFactory
                .selectFrom(memberProject)
                .join(memberProject.member, member).fetchJoin()
                .where(memberProject.project.projectId.eq(projectId))
                .fetch();
    }

    public List<Project> findAll(Member findMember){

        return queryFactory
                .selectFrom(project).distinct()
                .leftJoin(project.memberProjects, memberProject).fetchJoin()
                .leftJoin(memberProject.member, member).fetchJoin()
                .where(project.in(
                        JPAExpressions
                                .select(project)
                                .from(memberProject)
                                .where(memberProject.member.eq(findMember))
                        ))
                .fetch();
    }
}
