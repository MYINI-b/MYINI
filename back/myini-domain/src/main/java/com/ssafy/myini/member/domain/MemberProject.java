package com.ssafy.myini.member.domain;

import com.ssafy.myini.project.domain.Project;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
public class MemberProject {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_project_id")
    private Long memberProjectId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    private Project project;

    public static MemberProject createMemberProject(Member member, Project project){
        MemberProject memberProject = new MemberProject();
        memberProject.member = member;
        memberProject.project = project;
        return memberProject;
    }
}
