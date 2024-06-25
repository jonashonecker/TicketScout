package com.github.jonashonecker.backend.ticket;

import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class IdService {
    public String getUUID() {
        return UUID.randomUUID().toString();
    }
}
