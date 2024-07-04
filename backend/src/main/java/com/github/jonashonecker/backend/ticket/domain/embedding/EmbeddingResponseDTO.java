package com.github.jonashonecker.backend.ticket.domain.embedding;

import java.util.List;

public record EmbeddingResponseDTO(
        List<EmbeddingResponseDataDTO> data
) {
}
