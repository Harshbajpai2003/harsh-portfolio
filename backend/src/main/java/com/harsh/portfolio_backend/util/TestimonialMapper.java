package com.harsh.portfolio_backend.util;

import org.springframework.stereotype.Component;

import com.harsh.portfolio_backend.dto.TestimonialRequest;
import com.harsh.portfolio_backend.dto.TestimonialResponse;
import com.harsh.portfolio_backend.entity.Testimonial;

@Component
public class TestimonialMapper {

    public TestimonialResponse toResponse(Testimonial testimonial) {
        return TestimonialResponse.builder()
                .id(testimonial.getId())
                .authorName(testimonial.getAuthorName())
                .authorRole(testimonial.getAuthorRole())
                .authorImageUrl(testimonial.getAuthorImageUrl())
                .message(testimonial.getMessage())
                .rating(testimonial.getRating())
                .createdAt(testimonial.getCreatedAt())
                .build();
    }

    public Testimonial toEntity(TestimonialRequest request) {
        return Testimonial.builder()
                .authorName(request.getAuthorName())
                .authorRole(request.getAuthorRole())
                .authorImageUrl(request.getAuthorImageUrl())
                .message(request.getMessage())
                .rating(request.getRating())
                .build();
    }

    public void updateEntityFromRequest(Testimonial testimonial, TestimonialRequest request) {
        testimonial.setAuthorName(request.getAuthorName());
        testimonial.setAuthorRole(request.getAuthorRole());
        testimonial.setAuthorImageUrl(request.getAuthorImageUrl());
        testimonial.setMessage(request.getMessage());
        testimonial.setRating(request.getRating());
    }
}