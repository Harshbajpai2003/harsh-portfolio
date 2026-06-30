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

import com.harsh.portfolio_backend.dto.ContactMessageRequest;
import com.harsh.portfolio_backend.dto.ContactMessageResponse;
import com.harsh.portfolio_backend.service.ContactMessageService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
public class ContactMessageController {

    private final ContactMessageService contactMessageService;

    @GetMapping
    public ResponseEntity<List<ContactMessageResponse>> getAll() {
        return ResponseEntity.ok(contactMessageService.getAll());
    }

    @GetMapping("/unread")
    public ResponseEntity<List<ContactMessageResponse>> getUnread() {
        return ResponseEntity.ok(contactMessageService.getUnread());
    }

    @PostMapping
    public ResponseEntity<ContactMessageResponse> create(@Valid @RequestBody ContactMessageRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(contactMessageService.create(request));
    }

    @PutMapping("/{id}/read")
    public ResponseEntity<ContactMessageResponse> markAsRead(@PathVariable Long id) {
        return ResponseEntity.ok(contactMessageService.markAsRead(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        contactMessageService.delete(id);
        return ResponseEntity.noContent().build();
    }
}