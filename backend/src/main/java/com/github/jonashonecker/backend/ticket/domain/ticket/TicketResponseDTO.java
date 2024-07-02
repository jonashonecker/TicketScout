package com.github.jonashonecker.backend.ticket.domain.ticket;

import com.github.jonashonecker.backend.user.domain.TicketScoutUser;

public record TicketResponseDTO(
        String id,
        String projectName,
        String title,
        String description,
        Status status,
        TicketScoutUser author
) {
}
