package com.ssafy.myini.member.domain;

import com.ssafy.myini.common.BaseEntity;
import com.ssafy.myini.member.domain.type.Provider;
import com.ssafy.myini.member.domain.type.Role;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
public class Member extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Integer memberId;

    @Column(nullable = false)
    private String memberName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Provider memberProvider;

    @Column(nullable = false)
    private String memberProviderId;

    @Column(nullable = false)
    private String memberNickname;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @Column(nullable = false)
    private String memberProfileImg;

    public static Member createMember(Provider memberProvider, String memberProviderId, String memberName, Role role, String memberNickname) {
        Member member = new Member();
        member.memberProvider = memberProvider;
        member.memberProviderId = memberProviderId;
        member.memberName = memberName;
        member.role = role;
        member.memberNickname = memberNickname;
        return member;
    }
}
