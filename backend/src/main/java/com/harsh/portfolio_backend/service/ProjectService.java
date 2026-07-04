package com.harsh.portfolio_backend.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.harsh.portfolio_backend.dto.ProjectRequest;
import com.harsh.portfolio_backend.dto.ProjectResponse;
import com.harsh.portfolio_backend.entity.Project;
import com.harsh.portfolio_backend.exception.ResourceNotFoundException;
import com.harsh.portfolio_backend.repository.ProjectRepository;
import com.harsh.portfolio_backend.util.ProjectMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)   // <-- add this at class level
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final ProjectMapper projectMapper;

    public List<ProjectResponse> getAllProjects() {
        return projectRepository.findAllByOrderByDisplayOrderAsc()
                .stream()
                .map(projectMapper::toResponse)
                .toList();
    }

    public List<ProjectResponse> getFeaturedProjects() {
        return projectRepository.findByFeaturedTrue()
                .stream()
                .map(projectMapper::toResponse)
                .toList();
    }

    public ProjectResponse getProjectById(Long id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id: " + id));
        return projectMapper.toResponse(project);
    }

    @Transactional  // override class default (readOnly=true) for writes
    public ProjectResponse createProject(ProjectRequest request) {
        Project project = projectMapper.toEntity(request);
        Project saved = projectRepository.save(project);
        return projectMapper.toResponse(saved);
    }

    @Transactional
    public ProjectResponse updateProject(Long id, ProjectRequest request) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id: " + id));
        projectMapper.updateEntityFromRequest(project, request);
        Project updated = projectRepository.save(project);
        return projectMapper.toResponse(updated);
    }

    @Transactional
    public void deleteProject(Long id) {
        if (!projectRepository.existsById(id)) {
            throw new ResourceNotFoundException("Project not found with id: " + id);
        }
        projectRepository.deleteById(id);
    }
}