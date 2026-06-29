package com.harsh.portfolio_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.harsh.portfolio_backend.entity.Experience;

@Repository
public interface ExperienceRepository extends JpaRepository<Experience, Long> {

    List<Experience> findByType(Experience.Type type);

    List<Experience> findAllByOrderByDisplayOrderAsc();
}