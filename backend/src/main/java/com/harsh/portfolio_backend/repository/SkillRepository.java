package com.harsh.portfolio_backend.repository;

import com.harsh.portfolio_backend.entity.Skill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SkillRepository extends JpaRepository<Skill, Long> {

    List<Skill> findByCategory(Skill.Category category);

    List<Skill> findAllByOrderByDisplayOrderAsc();
}