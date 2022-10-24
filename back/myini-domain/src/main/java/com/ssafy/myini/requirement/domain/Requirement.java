package com.ssafy.myini.requirement.domain;

import com.ssafy.myini.member.domain.Member;
import com.ssafy.myini.project.domain.Project;
import com.ssafy.myini.requirement.domain.type.RequirementPart;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
public class Requirement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "requirement_id")
    private Long requirementId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "requirement_category_id")
    private RequirementCategory requirementCategory;

    private String requirementName;

    private String requirementContent;

    @Enumerated(EnumType.STRING)
    private RequirementPart requirementPart;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member; // 담당자

    private Integer requirementPriority;

    private Double requirementStoryPoint;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    private Project project;
}
