package com.github.jonashonecker.backend.ticket.domain;

import jakarta.validation.constraints.NotBlank;

public record UpdateTicketDTO(
        @NotBlank(message = "Id must not be empty")
        String id,
        @NotBlank(message = "Title must not be empty")
        String title,
        @NotBlank(message = "Description must not be empty")
        String description
) {
}
