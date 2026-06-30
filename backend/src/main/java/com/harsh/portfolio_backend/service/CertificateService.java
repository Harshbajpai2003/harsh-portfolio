package com.harsh.portfolio_backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.harsh.portfolio_backend.dto.CertificateRequest;
import com.harsh.portfolio_backend.dto.CertificateResponse;
import com.harsh.portfolio_backend.entity.Certificate;
import com.harsh.portfolio_backend.exception.ResourceNotFoundException;
import com.harsh.portfolio_backend.repository.CertificateRepository;
import com.harsh.portfolio_backend.util.CertificateMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CertificateService {

    private final CertificateRepository certificateRepository;
    private final CertificateMapper certificateMapper;

    public List<CertificateResponse> getAllCertificates() {
        return certificateRepository.findAllByOrderByDisplayOrderAsc()
                .stream().map(certificateMapper::toResponse).toList();
    }

    public CertificateResponse getCertificateById(Long id) {
        Certificate certificate = certificateRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Certificate not found with id: " + id));
        return certificateMapper.toResponse(certificate);
    }

    public CertificateResponse createCertificate(CertificateRequest request) {
        Certificate saved = certificateRepository.save(certificateMapper.toEntity(request));
        return certificateMapper.toResponse(saved);
    }

    public CertificateResponse updateCertificate(Long id, CertificateRequest request) {
        Certificate certificate = certificateRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Certificate not found with id: " + id));
        certificateMapper.updateEntityFromRequest(certificate, request);
        return certificateMapper.toResponse(certificateRepository.save(certificate));
    }

    public void deleteCertificate(Long id) {
        if (!certificateRepository.existsById(id)) {
            throw new ResourceNotFoundException("Certificate not found with id: " + id);
        }
        certificateRepository.deleteById(id);
    }
}