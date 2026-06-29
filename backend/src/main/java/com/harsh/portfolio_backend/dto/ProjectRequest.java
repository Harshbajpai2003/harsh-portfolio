package com.harsh.portfolio_backend.dto;

import java.util.List;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectRequest {

    @NotBlank(message = "Title is required")
    private String title;

    private String description;
    private String imageUrl;
    private String githubUrl;
    private String liveDemoUrl;
    private List<String> technologies;
    private boolean featured;
    private Integer displayOrder;
}