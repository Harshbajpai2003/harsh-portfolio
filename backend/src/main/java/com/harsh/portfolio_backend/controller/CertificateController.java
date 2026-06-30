package com.harsh.portfolio_backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.harsh.portfolio_backend.dto.CertificateRequest;
import com.harsh.portfolio_backend.dto.CertificateResponse;
import com.harsh.portfolio_backend.service.CertificateService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/certificates")
@RequiredArgsConstructor
public class CertificateController {

    private final CertificateService certificateService;

    @GetMapping
    public ResponseEntity<List<CertificateResponse>> getAll() {
        return ResponseEntity.ok(certificateService.getAllCertificates());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CertificateResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(certificateService.getCertificateById(id));
    }

    @PostMapping
    public ResponseEntity<CertificateResponse> create(@Valid @RequestBody CertificateRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(certificateService.createCertificate(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CertificateResponse> update(@PathVariable Long id, @Valid @RequestBody CertificateRequest request) {
        return ResponseEntity.ok(certificateService.updateCertificate(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        certificateService.deleteCertificate(id);
        return ResponseEntity.noContent().build();
    }
}