package com.harsh.portfolio_backend.dto;

import com.harsh.portfolio_backend.entity.Skill;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SkillRequest {

    @NotBlank(message = "Skill name is required")
    private String name;

    @NotNull(message = "Category is required")
    private Skill.Category category;

    private Integer proficiencyLevel;
    private String iconUrl;
    private Integer displayOrder;
}