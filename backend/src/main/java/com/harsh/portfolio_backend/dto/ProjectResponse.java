package com.harsh.portfolio_backend.dto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProjectResponse {

    private Long id;
    private String title;
    private String description;
    private String imageUrl;
    private String githubUrl;
    private String liveDemoUrl;
    private List<String> technologies;
    private boolean featured;
    private Integer displayOrder;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}