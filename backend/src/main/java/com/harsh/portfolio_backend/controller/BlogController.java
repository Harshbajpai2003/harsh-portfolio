package com.harsh.portfolio_backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.harsh.portfolio_backend.dto.BlogRequest;
import com.harsh.portfolio_backend.dto.BlogResponse;
import com.harsh.portfolio_backend.service.BlogService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/blogs")
@RequiredArgsConstructor
public class BlogController {

    private final BlogService blogService;

    @GetMapping
    public ResponseEntity<List<BlogResponse>> getAll() {
        return ResponseEntity.ok(blogService.getAll());
    }

    @GetMapping("/published")
    public ResponseEntity<List<BlogResponse>> getPublished() {
        return ResponseEntity.ok(blogService.getPublished());
    }

    @GetMapping("/slug/{slug}")
    public ResponseEntity<BlogResponse> getBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(blogService.getBySlug(slug));
    }

    @GetMapping("/{id}")
    public ResponseEntity<BlogResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(blogService.getById(id));
    }

    @PostMapping
    public ResponseEntity<BlogResponse> create(@Valid @RequestBody BlogRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(blogService.create(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<BlogResponse> update(@PathVariable Long id, @Valid @RequestBody BlogRequest request) {
        return ResponseEntity.ok(blogService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        blogService.delete(id);
        return ResponseEntity.noContent().build();
    }
}