package com.harsh.portfolio_backend.dto;

import com.harsh.portfolio_backend.entity.Skill;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SkillResponse {

    private Long id;
    private String name;
    private Skill.Category category;
    private Integer proficiencyLevel;
    private String iconUrl;
    private Integer displayOrder;
}