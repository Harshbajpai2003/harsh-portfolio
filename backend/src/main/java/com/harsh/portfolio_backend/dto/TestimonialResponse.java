package com.harsh.portfolio_backend.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TestimonialResponse {

    private Long id;
    private String authorName;
    private String authorRole;
    private String authorImageUrl;
    private String message;
    private Integer rating;
    private LocalDateTime createdAt;
}