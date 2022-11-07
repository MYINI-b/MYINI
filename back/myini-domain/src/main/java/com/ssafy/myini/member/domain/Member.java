package com.ssafy.myini.member.domain;

import com.ssafy.myini.common.BaseEntity;
import com.ssafy.myini.member.domain.type.Provider;
import com.ssafy.myini.member.domain.type.Role;
import com.ssafy.myini.requirementdocs.domain.Requirement;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
public class Member extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long memberId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Provider memberProvider;

    @Column(nullable = false)
    private String memberProviderId;

    @Column(nullable = false)
    private String memberName;

    @Column(nullable = false)
    private String memberEmail;

    private String memberJiraEmail;

    @Column(nullable = false)
    private String memberNickname;

    private String memberProfileImg;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<MemberProject> memberProjects = new ArrayList<>();

    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY)
    private List<Requirement> requirements = new ArrayList<>();

    public static Member createMember(Provider memberProvider, String memberProviderId, String memberName, String memberEmail, String memberNickname, Role role) {
        Member member = new Member();
        member.memberProvider = memberProvider;
        member.memberProviderId = memberProviderId;
        member.memberName = memberName;
        member.memberEmail = memberEmail;
        member.memberNickname = memberNickname;
        member.role = role;
        return member;
    }

    public void updateMemberProfileImg(String profileImg){
        this.memberProfileImg = profileImg;
    }
    public void updateMemberJiraEmail(String memberJiraEmail){
        this.memberJiraEmail = memberJiraEmail;
    }
}
