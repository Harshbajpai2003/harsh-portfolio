package com.harsh.portfolio_backend.util;

import org.springframework.stereotype.Component;

import com.harsh.portfolio_backend.dto.SkillRequest;
import com.harsh.portfolio_backend.dto.SkillResponse;
import com.harsh.portfolio_backend.entity.Skill;

@Component
public class SkillMapper {

    public SkillResponse toResponse(Skill skill) {
        return SkillResponse.builder()
                .id(skill.getId())
                .name(skill.getName())
                .category(skill.getCategory())
                .proficiencyLevel(skill.getProficiencyLevel())
                .iconUrl(skill.getIconUrl())
                .displayOrder(skill.getDisplayOrder())
                .build();
    }

    public Skill toEntity(SkillRequest request) {
        return Skill.builder()
                .name(request.getName())
                .category(request.getCategory())
                .proficiencyLevel(request.getProficiencyLevel())
                .iconUrl(request.getIconUrl())
                .displayOrder(request.getDisplayOrder())
                .build();
    }

    public void updateEntityFromRequest(Skill skill, SkillRequest request) {
        skill.setName(request.getName());
        skill.setCategory(request.getCategory());
        skill.setProficiencyLevel(request.getProficiencyLevel());
        skill.setIconUrl(request.getIconUrl());
        skill.setDisplayOrder(request.getDisplayOrder());
    }
}