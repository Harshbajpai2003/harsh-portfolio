package com.harsh.portfolio_backend.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CertificateResponse {

    private Long id;
    private String title;
    private String issuedBy;
    private LocalDate issueDate;
    private String credentialUrl;
    private String imageUrl;
    private Integer displayOrder;
}