package com.harsh.portfolio_backend.util;

import org.springframework.stereotype.Component;

import com.harsh.portfolio_backend.dto.ProjectRequest;
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
                .technologies(project.getTechnologies())
                .featured(project.isFeatured())
                .displayOrder(project.getDisplayOrder())
                .createdAt(project.getCreatedAt())
                .updatedAt(project.getUpdatedAt())
                .build();
    }

    public Project toEntity(ProjectRequest request) {
        return Project.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .imageUrl(request.getImageUrl())
                .githubUrl(request.getGithubUrl())
                .liveDemoUrl(request.getLiveDemoUrl())
                .technologies(request.getTechnologies())
                .featured(request.isFeatured())
                .displayOrder(request.getDisplayOrder())
                .build();
    }

    public void updateEntityFromRequest(Project project, ProjectRequest request) {
        project.setTitle(request.getTitle());
        project.setDescription(request.getDescription());
        project.setImageUrl(request.getImageUrl());
        project.setGithubUrl(request.getGithubUrl());
        project.setLiveDemoUrl(request.getLiveDemoUrl());
        project.setTechnologies(request.getTechnologies());
        project.setFeatured(request.isFeatured());
        project.setDisplayOrder(request.getDisplayOrder());
    }
}