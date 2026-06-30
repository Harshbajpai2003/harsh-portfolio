package com.harsh.portfolio_backend.util;

import org.springframework.stereotype.Component;

import com.harsh.portfolio_backend.dto.ExperienceRequest;
import com.harsh.portfolio_backend.dto.ExperienceResponse;
import com.harsh.portfolio_backend.entity.Experience;

@Component
public class ExperienceMapper {

    public ExperienceResponse toResponse(Experience experience) {
        return ExperienceResponse.builder()
                .id(experience.getId())
                .title(experience.getTitle())
                .organization(experience.getOrganization())
                .description(experience.getDescription())
                .startDate(experience.getStartDate())
                .endDate(experience.getEndDate())
                .type(experience.getType())
                .displayOrder(experience.getDisplayOrder())
                .build();
    }

    public Experience toEntity(ExperienceRequest request) {
        return Experience.builder()
                .title(request.getTitle())
                .organization(request.getOrganization())
                .description(request.getDescription())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .type(request.getType())
                .displayOrder(request.getDisplayOrder())
                .build();
    }

    public void updateEntityFromRequest(Experience experience, ExperienceRequest request) {
        experience.setTitle(request.getTitle());
        experience.setOrganization(request.getOrganization());
        experience.setDescription(request.getDescription());
        experience.setStartDate(request.getStartDate());
        experience.setEndDate(request.getEndDate());
        experience.setType(request.getType());
        experience.setDisplayOrder(request.getDisplayOrder());
    }
}