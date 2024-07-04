package com.github.jonashonecker.backend.ticket.domain.ticket;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record TicketRequestDTO(
        @NotBlank(message = "Title must not be empty")
        @Size(max = 256, message = "Title must not exceed 256 characters")
        String title,
        @NotBlank(message = "Description must not be empty")
        @Size(max = 20000, message = "Description must not exceed 20000 characters")
        String description
) implements TicketWithTitleAndDescription {
}
