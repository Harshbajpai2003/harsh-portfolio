package com.harsh.portfolio_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.harsh.portfolio_backend.entity.Testimonial;

@Repository
public interface TestimonialRepository extends JpaRepository<Testimonial, Long> {
}