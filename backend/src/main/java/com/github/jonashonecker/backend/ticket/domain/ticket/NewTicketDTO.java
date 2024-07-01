package com.github.jonashonecker.backend.ticket.domain.ticket;

import jakarta.validation.constraints.NotBlank;

public record NewTicketDTO(
        @NotBlank(message = "Title must not be empty")
        String title,
        @NotBlank(message = "Description must not be empty")
        String description
) implements TicketWithTitleAndDescription{
}
