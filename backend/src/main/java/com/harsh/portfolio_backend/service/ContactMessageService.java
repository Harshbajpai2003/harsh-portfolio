package com.harsh.portfolio_backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.harsh.portfolio_backend.dto.ContactMessageRequest;
import com.harsh.portfolio_backend.dto.ContactMessageResponse;
import com.harsh.portfolio_backend.entity.ContactMessage;
import com.harsh.portfolio_backend.exception.ResourceNotFoundException;
import com.harsh.portfolio_backend.repository.ContactMessageRepository;
import com.harsh.portfolio_backend.util.ContactMessageMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ContactMessageService {

    private final ContactMessageRepository contactMessageRepository;
    private final ContactMessageMapper contactMessageMapper;

    public List<ContactMessageResponse> getAll() {
        return contactMessageRepository.findAllByOrderByCreatedAtDesc()
                .stream().map(contactMessageMapper::toResponse).toList();
    }

    public List<ContactMessageResponse> getUnread() {
        return contactMessageRepository.findByReadFalse()
                .stream().map(contactMessageMapper::toResponse).toList();
    }

    public ContactMessageResponse create(ContactMessageRequest request) {
        ContactMessage saved = contactMessageRepository.save(contactMessageMapper.toEntity(request));
        return contactMessageMapper.toResponse(saved);
    }

    public ContactMessageResponse markAsRead(Long id) {
        ContactMessage message = contactMessageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Message not found with id: " + id));
        message.setRead(true);
        return contactMessageMapper.toResponse(contactMessageRepository.save(message));
    }

    public void delete(Long id) {
        if (!contactMessageRepository.existsById(id)) {
            throw new ResourceNotFoundException("Message not found with id: " + id);
        }
        contactMessageRepository.deleteById(id);
    }
}