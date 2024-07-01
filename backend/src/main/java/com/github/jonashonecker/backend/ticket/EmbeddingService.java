package com.github.jonashonecker.backend.ticket;

import com.github.jonashonecker.backend.ticket.domain.embedding.EmbeddingRequestDTO;
import com.github.jonashonecker.backend.ticket.domain.embedding.EmbeddingResponseDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class EmbeddingService {

    private final RestClient restClient;

    public EmbeddingService(
            @Value("${app.openai-api-key}") String apiKey,
            @Value("${app.openai-embedding-baseUrl}") String baseUrl
    ) {
        this.restClient = RestClient.builder()
                .baseUrl(baseUrl)
                .defaultHeader("Authorization", "Bearer " + apiKey)
                .build();
    }

    public EmbeddingResponseDTO getEmbeddingVector(String searchText) {
        return this.restClient.post()
                .body(new EmbeddingRequestDTO(searchText))
                .retrieve()
                .body(EmbeddingResponseDTO.class);
    }
}
