package com.harsh.portfolio_backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.harsh.portfolio_backend.dto.TestimonialRequest;
import com.harsh.portfolio_backend.dto.TestimonialResponse;
import com.harsh.portfolio_backend.entity.Testimonial;
import com.harsh.portfolio_backend.exception.ResourceNotFoundException;
import com.harsh.portfolio_backend.repository.TestimonialRepository;
import com.harsh.portfolio_backend.util.TestimonialMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TestimonialService {

    private final TestimonialRepository testimonialRepository;
    private final TestimonialMapper testimonialMapper;

    public List<TestimonialResponse> getAll() {
        return testimonialRepository.findAll()
                .stream().map(testimonialMapper::toResponse).toList();
    }

    public TestimonialResponse getById(Long id) {
        Testimonial testimonial = testimonialRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Testimonial not found with id: " + id));
        return testimonialMapper.toResponse(testimonial);
    }

    public TestimonialResponse create(TestimonialRequest request) {
        Testimonial saved = testimonialRepository.save(testimonialMapper.toEntity(request));
        return testimonialMapper.toResponse(saved);
    }

    public TestimonialResponse update(Long id, TestimonialRequest request) {
        Testimonial testimonial = testimonialRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Testimonial not found with id: " + id));
        testimonialMapper.updateEntityFromRequest(testimonial, request);
        return testimonialMapper.toResponse(testimonialRepository.save(testimonial));
    }

    public void delete(Long id) {
        if (!testimonialRepository.existsById(id)) {
            throw new ResourceNotFoundException("Testimonial not found with id: " + id);
        }
        testimonialRepository.deleteById(id);
    }
}