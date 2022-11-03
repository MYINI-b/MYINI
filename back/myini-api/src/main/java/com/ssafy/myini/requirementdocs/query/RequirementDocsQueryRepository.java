package com.ssafy.myini.requirementdocs.query;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.myini.member.domain.QMember;
import com.ssafy.myini.requirementdocs.domain.QRequirement;
import com.ssafy.myini.requirementdocs.domain.QRequirementCategory;
import com.ssafy.myini.requirementdocs.domain.Requirement;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import java.util.List;

import static com.ssafy.myini.member.domain.QMember.member;
import static com.ssafy.myini.requirementdocs.domain.QRequirement.requirement;
import static com.ssafy.myini.requirementdocs.domain.QRequirementCategory.requirementCategory;

@Repository
@RequiredArgsConstructor
public class RequirementDocsQueryRepository {
    private final JPAQueryFactory queryFactory;

    public List<Requirement> findAllRequirement(Long projectId) {
        return queryFactory
                .selectFrom(requirement)
                .leftJoin(requirement.requirementCategory, requirementCategory).fetchJoin()
                .leftJoin(requirement.member, member).fetchJoin()
                .where(requirement.project.projectId.eq(projectId))
                .fetch();
    }
}
