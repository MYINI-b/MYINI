package com.ssafy.myini.requirementdocs.domain;

import com.ssafy.myini.member.domain.Member;
import com.ssafy.myini.project.domain.Project;
import com.ssafy.myini.requirementdocs.domain.type.RequirementPart;
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

    public static Requirement createRequirement(Project project){
        Requirement requirement = new Requirement();
        requirement.project = project;
        return requirement;
    }

    public void updateRequirementCategory(RequirementCategory requirementCategory){
        this.requirementCategory = requirementCategory;
    }
    public void updateRequirementName(String requirementName){
        this.requirementName = requirementName;
    }
    public void updateRequirementContent(String requirementContent){
        this.requirementContent = requirementContent;
    }
    public void updateRequirementPart(RequirementPart requirementPart){
        this.requirementPart = requirementPart;
    }
    public void updateRequirementMember(Member member){
        this.member = member;
    }
    public void updateRequirementPriority(Integer requirementPriority){
        this.requirementPriority = requirementPriority;
    }
    public void updateRequirementStoryPoint(Double requirementStoryPoint){
        this.requirementStoryPoint = requirementStoryPoint;
    }


}
