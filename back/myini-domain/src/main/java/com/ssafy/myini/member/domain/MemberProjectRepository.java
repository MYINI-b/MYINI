package com.ssafy.myini.member.domain;

import com.ssafy.myini.project.domain.Project;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.*;

public interface MemberProjectRepository extends JpaRepository<MemberProject, Long> {
    MemberProject findByMemberAndProject(Member member, Project project);
    List<Member> findMemberByProject(Project project);

    List<Project> findProjectByMember(Member member);
    boolean existsByMemberAndProject(Member member, Project project);
}