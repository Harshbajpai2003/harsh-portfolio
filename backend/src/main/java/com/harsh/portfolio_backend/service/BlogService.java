package com.harsh.portfolio_backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.harsh.portfolio_backend.dto.BlogRequest;
import com.harsh.portfolio_backend.dto.BlogResponse;
import com.harsh.portfolio_backend.entity.Blog;
import com.harsh.portfolio_backend.exception.ResourceNotFoundException;
import com.harsh.portfolio_backend.repository.BlogRepository;
import com.harsh.portfolio_backend.util.BlogMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BlogService {

    private final BlogRepository blogRepository;
    private final BlogMapper blogMapper;

    public List<BlogResponse> getAll() {
        return blogRepository.findAll()
                .stream().map(blogMapper::toResponse).toList();
    }

    public List<BlogResponse> getPublished() {
        return blogRepository.findByStatus(Blog.Status.PUBLISHED)
                .stream().map(blogMapper::toResponse).toList();
    }

    public BlogResponse getBySlug(String slug) {
        Blog blog = blogRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Blog not found with slug: " + slug));
        return blogMapper.toResponse(blog);
    }

    public BlogResponse getById(Long id) {
        Blog blog = blogRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Blog not found with id: " + id));
        return blogMapper.toResponse(blog);
    }

    public BlogResponse create(BlogRequest request) {
        Blog saved = blogRepository.save(blogMapper.toEntity(request));
        return blogMapper.toResponse(saved);
    }

    public BlogResponse update(Long id, BlogRequest request) {
        Blog blog = blogRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Blog not found with id: " + id));
        blogMapper.updateEntityFromRequest(blog, request);
        return blogMapper.toResponse(blogRepository.save(blog));
    }

    public void delete(Long id) {
        if (!blogRepository.existsById(id)) {
            throw new ResourceNotFoundException("Blog not found with id: " + id);
        }
        blogRepository.deleteById(id);
    }
}