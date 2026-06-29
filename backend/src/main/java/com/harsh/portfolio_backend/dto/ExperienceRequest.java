package com.harsh.portfolio_backend.dto;

import java.time.LocalDate;

import com.harsh.portfolio_backend.entity.Experience;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExperienceRequest {

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Organization is required")
    private String organization;

    private String description;
    private LocalDate startDate;
    private LocalDate endDate;

    @NotNull(message = "Type is required")
    private Experience.Type type;

    private Integer displayOrder;
}