package com.ssafy.myini.requirementdocs.domain;

import com.ssafy.myini.project.domain.Project;
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
public class RequirementCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "requirement_category_id")
    private Long projectId;

    @Column(nullable = false)
    private String categoryName;

    @Column(nullable = false)
    private String categoryColor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    private Project project;

    @OneToMany(mappedBy = "requirementCategory", fetch = FetchType.LAZY)
    private List<Requirement> requirements = new ArrayList<>();

    public static RequirementCategory createRequirementCategory(String categoryName, String categoryColor, Project project) {
        RequirementCategory requirementCategory = new RequirementCategory();
        requirementCategory.categoryName = categoryName;
        requirementCategory.categoryColor = categoryColor;
        requirementCategory.project = project;
        return requirementCategory;
    }
}
