package com.github.jonashonecker.backend.ticket.domain;

public record UpdateTicket(
        String id,
        String title,
        String description
) {
}
