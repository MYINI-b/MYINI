package com.ssafy.myini.member.domain;

import com.ssafy.myini.member.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Integer> {
    Optional<Member> findByMemberName(String memberName);
}