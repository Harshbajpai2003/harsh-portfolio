package com.harsh.portfolio_backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.harsh.portfolio_backend.dto.SkillRequest;
import com.harsh.portfolio_backend.dto.SkillResponse;
import com.harsh.portfolio_backend.entity.Skill;
import com.harsh.portfolio_backend.exception.ResourceNotFoundException;
import com.harsh.portfolio_backend.repository.SkillRepository;
import com.harsh.portfolio_backend.util.SkillMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SkillService {

    private final SkillRepository skillRepository;
    private final SkillMapper skillMapper;

    public List<SkillResponse> getAllSkills() {
        return skillRepository.findAllByOrderByDisplayOrderAsc()
                .stream().map(skillMapper::toResponse).toList();
    }

    public List<SkillResponse> getSkillsByCategory(Skill.Category category) {
        return skillRepository.findByCategory(category)
                .stream().map(skillMapper::toResponse).toList();
    }

    public SkillResponse getSkillById(Long id) {
        Skill skill = skillRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Skill not found with id: " + id));
        return skillMapper.toResponse(skill);
    }

    public SkillResponse createSkill(SkillRequest request) {
        Skill saved = skillRepository.save(skillMapper.toEntity(request));
        return skillMapper.toResponse(saved);
    }

    public SkillResponse updateSkill(Long id, SkillRequest request) {
        Skill skill = skillRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Skill not found with id: " + id));
        skillMapper.updateEntityFromRequest(skill, request);
        return skillMapper.toResponse(skillRepository.save(skill));
    }

    public void deleteSkill(Long id) {
        if (!skillRepository.existsById(id)) {
            throw new ResourceNotFoundException("Skill not found with id: " + id);
        }
        skillRepository.deleteById(id);
    }
}