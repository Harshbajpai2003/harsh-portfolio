package com.harsh.portfolio_backend.dto;

import java.time.LocalDate;

import com.harsh.portfolio_backend.entity.Experience;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExperienceResponse {

    private Long id;
    private String title;
    private String organization;
    private String description;
    private LocalDate startDate;
    private LocalDate endDate;
    private Experience.Type type;
    private Integer displayOrder;
}