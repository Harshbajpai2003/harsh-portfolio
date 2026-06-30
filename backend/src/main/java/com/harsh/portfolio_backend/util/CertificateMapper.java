package com.harsh.portfolio_backend.util;

import org.springframework.stereotype.Component;

import com.harsh.portfolio_backend.dto.CertificateRequest;
import com.harsh.portfolio_backend.dto.CertificateResponse;
import com.harsh.portfolio_backend.entity.Certificate;

@Component
public class CertificateMapper {

    public CertificateResponse toResponse(Certificate certificate) {
        return CertificateResponse.builder()
                .id(certificate.getId())
                .title(certificate.getTitle())
                .issuedBy(certificate.getIssuedBy())
                .issueDate(certificate.getIssueDate())
                .credentialUrl(certificate.getCredentialUrl())
                .imageUrl(certificate.getImageUrl())
                .displayOrder(certificate.getDisplayOrder())
                .build();
    }

    public Certificate toEntity(CertificateRequest request) {
        return Certificate.builder()
                .title(request.getTitle())
                .issuedBy(request.getIssuedBy())
                .issueDate(request.getIssueDate())
                .credentialUrl(request.getCredentialUrl())
                .imageUrl(request.getImageUrl())
                .displayOrder(request.getDisplayOrder())
                .build();
    }

    public void updateEntityFromRequest(Certificate certificate, CertificateRequest request) {
        certificate.setTitle(request.getTitle());
        certificate.setIssuedBy(request.getIssuedBy());
        certificate.setIssueDate(request.getIssueDate());
        certificate.setCredentialUrl(request.getCredentialUrl());
        certificate.setImageUrl(request.getImageUrl());
        certificate.setDisplayOrder(request.getDisplayOrder());
    }
}