package com.github.jonashonecker.backend.ticket.domain;

import com.github.jonashonecker.backend.user.domain.TicketScoutUser;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("tickets")
public record Ticket(
        String id,
        String projectName,
        String title,
        String description,
        Status status,
        TicketScoutUser author
) {
}
