package com.harsh.portfolio_backend.util;

import java.util.ArrayList;

import org.springframework.stereotype.Component;

import com.harsh.portfolio_backend.dto.ProjectResponse;
import com.harsh.portfolio_backend.entity.Project;

@Component
public class ProjectMapper {

    public ProjectResponse toResponse(Project project) {
        return ProjectResponse.builder()
                .id(project.getId())
                .title(project.getTitle())
                .description(project.getDescription())
                .imageUrl(project.getImageUrl())
                .githubUrl(project.getGithubUrl())
                .liveDemoUrl(project.getLiveDemoUrl())
                .technologies(new ArrayList<>(project.getTechnologies()))   // <-- force initialization here
                .featured(project.isFeatured())
                .displayOrder(project.getDisplayOrder())
                .createdAt(project.getCreatedAt())
                .updatedAt(project.getUpdatedAt())
                .build();
    }

    // toEntity and updateEntityFromRequest unchanged
    
}