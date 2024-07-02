package com.github.jonashonecker.backend.ticket.utils;

import com.github.jonashonecker.backend.ticket.domain.ticket.Ticket;
import com.github.jonashonecker.backend.ticket.domain.ticket.TicketResponseDTO;

import java.util.function.Function;

public class Utils {

    private Utils() {
        throw new IllegalStateException("Utility class");
    }

    public static final Function<Ticket, TicketResponseDTO> ticketToDtoMapper = ticket -> new TicketResponseDTO(
            ticket.id(),
            ticket.projectName(),
            ticket.title(),
            ticket.description(),
            ticket.status(),
            ticket.author()
    );
}
