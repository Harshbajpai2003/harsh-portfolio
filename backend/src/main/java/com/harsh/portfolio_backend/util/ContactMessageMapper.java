package com.harsh.portfolio_backend.util;

import org.springframework.stereotype.Component;

import com.harsh.portfolio_backend.dto.ContactMessageRequest;
import com.harsh.portfolio_backend.dto.ContactMessageResponse;
import com.harsh.portfolio_backend.entity.ContactMessage;

@Component
public class ContactMessageMapper {

    public ContactMessageResponse toResponse(ContactMessage message) {
        return ContactMessageResponse.builder()
                .id(message.getId())
                .name(message.getName())
                .email(message.getEmail())
                .subject(message.getSubject())
                .message(message.getMessage())
                .read(message.isRead())
                .createdAt(message.getCreatedAt())
                .build();
    }

    public ContactMessage toEntity(ContactMessageRequest request) {
        return ContactMessage.builder()
                .name(request.getName())
                .email(request.getEmail())
                .subject(request.getSubject())
                .message(request.getMessage())
                .read(false)
                .build();
    }
}