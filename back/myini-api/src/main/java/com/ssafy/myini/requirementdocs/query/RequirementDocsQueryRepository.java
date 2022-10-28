package com.ssafy.myini.requirementdocs.query;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.myini.member.domain.QMember;
import com.ssafy.myini.requirementdocs.domain.QRequirement;
import com.ssafy.myini.requirementdocs.domain.QRequirementCategory;
import com.ssafy.myini.requirementdocs.domain.Requirement;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class RequirementDocsQueryRepository {
    private final JPAQueryFactory queryFactory;

    public List<Requirement> findAllRequirement(Long projectId) {
        QRequirement requirement = new QRequirement("requirement");
        QRequirementCategory requirementCategory = new QRequirementCategory("requirementCategory");
        QMember member = new QMember("member");

        List<Requirement> requirements = queryFactory
                .selectFrom(requirement)
                .join(requirementCategory)
                .on(requirementCategory.eq(requirement.requirementCategory))
                .join(member)
                .on(member.eq(requirement.member))
                .where(requirement.project.projectId.eq(projectId))
                .fetch();

        return requirements;
    }
}
