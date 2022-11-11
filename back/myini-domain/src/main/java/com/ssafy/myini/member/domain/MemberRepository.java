package com.ssafy.myini.member.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByMemberName(String memberName);
    Optional<Member> findByMemberEmail(String memberEmail);
    List<Member> findByMemberEmailContains(String memberEmail);
}