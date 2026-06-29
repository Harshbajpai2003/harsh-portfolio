package com.harsh.portfolio_backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.harsh.portfolio_backend.entity.Blog;

@Repository
public interface BlogRepository extends JpaRepository<Blog, Long> {

    Optional<Blog> findBySlug(String slug);

    List<Blog> findByStatus(Blog.Status status);
}