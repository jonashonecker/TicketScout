package com.github.jonashonecker.backend.ticket;

import com.github.jonashonecker.backend.ticket.domain.ticket.TicketRequestDTO;
import com.github.jonashonecker.backend.ticket.exception.EmbeddingFailedException;
import okhttp3.mockwebserver.MockResponse;
import okhttp3.mockwebserver.MockWebServer;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;

import java.io.IOException;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class EmbeddingServiceTest {

    private static MockWebServer mockWebServer;
    @Autowired
    private EmbeddingService embeddingService;

    @BeforeAll
    static void beforeAll() throws IOException {
        mockWebServer = new MockWebServer();
        mockWebServer.start();
    }

    @AfterAll
    static void tearDown() throws IOException {
        mockWebServer.shutdown();
    }

    @DynamicPropertySource
    static void backendProperties(DynamicPropertyRegistry registry) {
        registry.add("app.openai-embedding-baseUrl", () -> mockWebServer.url("/").toString());
    }

    @Test
    void getEmbeddingVectorForTicket_whenApiReturnsEmptyBody_throwEmbeddingFailedException() {
        //GIVEN
        TicketRequestDTO ticketRequestDTO = new TicketRequestDTO("test-title", "test-description");

        mockWebServer.enqueue(new MockResponse()
                .setBody("")
                .addHeader("Content-Type", "application/json"));

        //WHEN
        EmbeddingFailedException actual = assertThrows(EmbeddingFailedException.class, () -> embeddingService.getEmbeddingVectorForTicket(ticketRequestDTO));

        //THEN
        assertEquals("Failed to retrieve embedding vector for ticket", actual.getMessage());
    }

    @Test
    void getEmbeddingVectorForSearchText_whenApiReturnsValidResponse_returnsCorrectVector() {
        // GIVEN
        String searchText = "example search text";
        mockWebServer.enqueue(new MockResponse()
                .setBody("{\"data\":[{\"object\":\"embedding\",\"embedding\":[0.1,0.2,0.3]}]}")
                .addHeader("Content-Type", "application/json"));

        // WHEN
        List<Double> actualVector = embeddingService.getEmbeddingVectorForSearchText(searchText);

        // THEN
        assertEquals(List.of(0.1, 0.2, 0.3), actualVector);
    }
}