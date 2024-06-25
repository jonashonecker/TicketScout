package com.github.jonashonecker.backend.ticket.domain;

import jakarta.validation.constraints.NotBlank;

public record NewTicket(
        @NotBlank(message = "Title must not be empty")
        String title,
        @NotBlank(message = "Description must not be empty")
        String description
) {
}
