package com.ssafy.myini.member.domain;

import com.ssafy.myini.project.domain.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberProjectRepository extends JpaRepository<MemberProject, Long> {
    Long findByMemberAndProject(Member member, Project project);
}