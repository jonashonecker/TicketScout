package com.github.jonashonecker.backend.ticket.domain.embedding;

public record EmbeddingRequestDTO(
        String input,
        String model
) {
    public EmbeddingRequestDTO(String input) {
        this(input, "text-embedding-3-large");
    }
}
