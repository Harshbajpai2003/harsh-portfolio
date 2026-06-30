package com.harsh.portfolio_backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.harsh.portfolio_backend.dto.ExperienceRequest;
import com.harsh.portfolio_backend.dto.ExperienceResponse;
import com.harsh.portfolio_backend.entity.Experience;
import com.harsh.portfolio_backend.exception.ResourceNotFoundException;
import com.harsh.portfolio_backend.repository.ExperienceRepository;
import com.harsh.portfolio_backend.util.ExperienceMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ExperienceService {

    private final ExperienceRepository experienceRepository;
    private final ExperienceMapper experienceMapper;

    public List<ExperienceResponse> getAllExperiences() {
        return experienceRepository.findAllByOrderByDisplayOrderAsc()
                .stream().map(experienceMapper::toResponse).toList();
    }

    public List<ExperienceResponse> getByType(Experience.Type type) {
        return experienceRepository.findByType(type)
                .stream().map(experienceMapper::toResponse).toList();
    }

    public ExperienceResponse getById(Long id) {
        Experience experience = experienceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Experience not found with id: " + id));
        return experienceMapper.toResponse(experience);
    }

    public ExperienceResponse create(ExperienceRequest request) {
        Experience saved = experienceRepository.save(experienceMapper.toEntity(request));
        return experienceMapper.toResponse(saved);
    }

    public ExperienceResponse update(Long id, ExperienceRequest request) {
        Experience experience = experienceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Experience not found with id: " + id));
        experienceMapper.updateEntityFromRequest(experience, request);
        return experienceMapper.toResponse(experienceRepository.save(experience));
    }

    public void delete(Long id) {
        if (!experienceRepository.existsById(id)) {
            throw new ResourceNotFoundException("Experience not found with id: " + id);
        }
        experienceRepository.deleteById(id);
    }
}