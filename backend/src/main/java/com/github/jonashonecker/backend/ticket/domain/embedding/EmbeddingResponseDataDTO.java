package com.github.jonashonecker.backend.ticket.domain.embedding;

import java.math.BigDecimal;
import java.util.List;

public record EmbeddingResponseDataDTO(
        String object,
        List<Double> embedding
) {
}
