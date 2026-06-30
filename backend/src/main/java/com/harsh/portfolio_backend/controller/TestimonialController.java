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

import com.harsh.portfolio_backend.dto.TestimonialRequest;
import com.harsh.portfolio_backend.dto.TestimonialResponse;
import com.harsh.portfolio_backend.service.TestimonialService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/testimonials")
@RequiredArgsConstructor
public class TestimonialController {

    private final TestimonialService testimonialService;

    @GetMapping
    public ResponseEntity<List<TestimonialResponse>> getAll() {
        return ResponseEntity.ok(testimonialService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TestimonialResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(testimonialService.getById(id));
    }

    @PostMapping
    public ResponseEntity<TestimonialResponse> create(@Valid @RequestBody TestimonialRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(testimonialService.create(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TestimonialResponse> update(@PathVariable Long id, @Valid @RequestBody TestimonialRequest request) {
        return ResponseEntity.ok(testimonialService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        testimonialService.delete(id);
        return ResponseEntity.noContent().build();
    }
}