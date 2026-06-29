package com.harsh.portfolio_backend.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CertificateRequest {

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Issuer is required")
    private String issuedBy;

    private LocalDate issueDate;
    private String credentialUrl;
    private String imageUrl;
    private Integer displayOrder;
}