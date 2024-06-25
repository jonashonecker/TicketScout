package com.github.jonashonecker.backend.error.domain;

public record InputValidationError(
        String field,
        String errorMessage
) {
}
