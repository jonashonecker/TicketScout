package com.github.jonashonecker.backend.ticket;

import com.github.jonashonecker.backend.ticket.domain.embedding.EmbeddingRequestDTO;
import com.github.jonashonecker.backend.ticket.domain.embedding.EmbeddingResponseDTO;
import com.github.jonashonecker.backend.ticket.domain.ticket.TicketWithTitleAndDescription;
import com.github.jonashonecker.backend.ticket.exception.EmbeddingFailedException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;

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

    public List<Double> getEmbeddingVectorFromTicket(TicketWithTitleAndDescription ticket) {
        return getEmbeddingVector("<h1>" + ticket.title() + "</h1>" + ticket.description());
    }

    public List<Double> getEmbeddingVectorFromSearchString(String searchText) {
        return getEmbeddingVector(searchText);
    }

    public List<Double> getEmbeddingVector(String text) {
        EmbeddingResponseDTO response = this.restClient.post()
                .body(new EmbeddingRequestDTO(text))
                .retrieve()
                .body(EmbeddingResponseDTO.class);

        if (response == null) {
            throw new EmbeddingFailedException("Failed to retrieve embedding vector for ticket");
        }

        return response.data()
                .stream()
                .filter(o -> "embedding".equals(o.object()))
                .flatMap(o -> o.embedding().stream())
                .toList();
    }
}
