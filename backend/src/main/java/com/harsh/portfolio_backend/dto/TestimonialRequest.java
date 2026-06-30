package com.harsh.portfolio_backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TestimonialRequest {

    @NotBlank(message = "Author name is required")
    private String authorName;

    private String authorRole;
    private String authorImageUrl;

    @NotBlank(message = "Message is required")
    private String message;

    private Integer rating;
}