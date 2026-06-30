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

import com.harsh.portfolio_backend.dto.ExperienceRequest;
import com.harsh.portfolio_backend.dto.ExperienceResponse;
import com.harsh.portfolio_backend.entity.Experience;
import com.harsh.portfolio_backend.service.ExperienceService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/experiences")
@RequiredArgsConstructor
public class ExperienceController {

    private final ExperienceService experienceService;

    @GetMapping
    public ResponseEntity<List<ExperienceResponse>> getAll() {
        return ResponseEntity.ok(experienceService.getAllExperiences());
    }

    @GetMapping("/type/{type}")
    public ResponseEntity<List<ExperienceResponse>> getByType(@PathVariable Experience.Type type) {
        return ResponseEntity.ok(experienceService.getByType(type));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ExperienceResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(experienceService.getById(id));
    }

    @PostMapping
    public ResponseEntity<ExperienceResponse> create(@Valid @RequestBody ExperienceRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(experienceService.create(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ExperienceResponse> update(@PathVariable Long id, @Valid @RequestBody ExperienceRequest request) {
        return ResponseEntity.ok(experienceService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        experienceService.delete(id);
        return ResponseEntity.noContent().build();
    }
}