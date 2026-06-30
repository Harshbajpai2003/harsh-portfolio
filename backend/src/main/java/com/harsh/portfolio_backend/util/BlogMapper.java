package com.harsh.portfolio_backend.util;

import org.springframework.stereotype.Component;

import com.harsh.portfolio_backend.dto.BlogRequest;
import com.harsh.portfolio_backend.dto.BlogResponse;
import com.harsh.portfolio_backend.entity.Blog;

@Component
public class BlogMapper {

    public BlogResponse toResponse(Blog blog) {
        return BlogResponse.builder()
                .id(blog.getId())
                .title(blog.getTitle())
                .slug(blog.getSlug())
                .summary(blog.getSummary())
                .content(blog.getContent())
                .coverImageUrl(blog.getCoverImageUrl())
                .status(blog.getStatus().name())
                .createdAt(blog.getCreatedAt())
                .updatedAt(blog.getUpdatedAt())
                .publishedAt(blog.getPublishedAt())
                .build();
    }

    public Blog toEntity(BlogRequest request) {
        String generatedSlug = request.getTitle()
                .toLowerCase()
                .trim()
                .replaceAll("[^a-z0-9\\s-]", "")
                .replaceAll("\\s+", "-");

        Blog.Status status = "PUBLISHED".equalsIgnoreCase(request.getStatus())
                ? Blog.Status.PUBLISHED
                : Blog.Status.DRAFT;

        return Blog.builder()
                .title(request.getTitle())
                .slug(generatedSlug)
                .summary(request.getSummary())
                .content(request.getContent())
                .coverImageUrl(request.getCoverImageUrl())
                .status(status)
                .publishedAt(status == Blog.Status.PUBLISHED ? java.time.LocalDateTime.now() : null)
                .build();
    }

    public void updateEntityFromRequest(Blog blog, BlogRequest request) {
        blog.setTitle(request.getTitle());
        blog.setSummary(request.getSummary());
        blog.setContent(request.getContent());
        blog.setCoverImageUrl(request.getCoverImageUrl());

        Blog.Status status = "PUBLISHED".equalsIgnoreCase(request.getStatus())
                ? Blog.Status.PUBLISHED
                : Blog.Status.DRAFT;
        blog.setStatus(status);

        if (status == Blog.Status.PUBLISHED && blog.getPublishedAt() == null) {
            blog.setPublishedAt(java.time.LocalDateTime.now());
        }
    }
}