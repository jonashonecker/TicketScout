package com.github.jonashonecker.backend.ticket;

import com.github.jonashonecker.backend.ticket.domain.ticket.Status;
import com.github.jonashonecker.backend.ticket.domain.ticket.Ticket;
import com.github.jonashonecker.backend.user.domain.TicketScoutUser;
import okhttp3.mockwebserver.MockResponse;
import okhttp3.mockwebserver.MockWebServer;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.web.servlet.MockMvc;

import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.stream.IntStream;

import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.anyOf;
import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.oidcLogin;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class TicketControllerTest {

    @Autowired
    private TicketRepository ticketRepository;

    private static MockWebServer mockWebServer;

    @Autowired
    private MockMvc mockMvc;

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
    void getAllTickets_whenUnauthenticated_returnUnauthorized() throws Exception {
        //GIVEN
        //WHEN
        mockMvc.perform(get("/api/ticket"))
                //THEN
                .andExpect(status().isUnauthorized())
                .andExpect(content().string("")
                );
    }

    @Test
    @WithMockUser
    @DirtiesContext
    void getAllTickets_whenRepositoryEmpty_returnEmptyBody() throws Exception {
        //GIVEN
        TicketScoutUser ticketScoutUser = new TicketScoutUser("test-name", "test-avatarUrl");
        //WHEN
        mockMvc.perform(get("/api/ticket").with(oidcLogin().userInfoToken(token -> token
                        .claim("login", ticketScoutUser.name())
                        .claim("avatar_url", ticketScoutUser.avatarUrl())
                )))
                //THEN
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        []
                        """)
                );
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void getAllTickets_whenRepositoryContainsTickets_returnTickets() throws Exception {
        //GIVEN
        TicketScoutUser ticketScoutUser = new TicketScoutUser("test-name", "test-avatarUrl");
        Ticket ticket = new Ticket(
                "1",
                "test-projectName",
                "test-title",
                "test-description",
                Status.IN_PROGRESS,
                ticketScoutUser,
                List.of(1.2D)
        );

        ticketRepository.insert(ticket);

        //WHEN
        mockMvc.perform(get("/api/ticket").with(oidcLogin().userInfoToken(token -> token
                        .claim("login", ticketScoutUser.name())
                        .claim("avatar_url", ticketScoutUser.avatarUrl())
                )))
                //THEN
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        [
                          {
                            "id": "1",
                            "projectName": "test-projectName",
                            "title": "test-title",
                            "description": "test-description",
                            "status": "IN_PROGRESS",
                            "author": {
                              "name": "test-name",
                              "avatarUrl": "test-avatarUrl"
                            }
                          }
                        ]
                        """)
                );
    }

    @Test
    void createTicket_whenUnauthenticated_returnUnauthorized() throws Exception {
        //GIVEN
        //WHEN
        mockMvc.perform(post("/api/ticket"))
                //THEN
                .andExpect(status().isUnauthorized())
                .andExpect(content().string("")
                );
    }

    @Test
    @WithMockUser
    @DirtiesContext
    void createTicket_whenValidNewTicket_thenReturnsTicketWithDefaultProjectNameAndStatus() throws Exception {
        //GIVEN
        TicketScoutUser ticketScoutUser = new TicketScoutUser("testUser", "testAvatarUrl");
        String defaultProjectName = "Default Project";
        String defaultStatus = Status.OPEN.toString();

        mockWebServer.enqueue(new MockResponse()
                .setBody("""
                        {
                          "data": [{
                            "object": "embedding",
                            "embedding": [0.1]
                            }
                          ]
                        }
                        """)
                .addHeader("Content-Type", "application/json"));

        //WHEN
        mockMvc.perform(post("/api/ticket").with(oidcLogin().userInfoToken(token -> token
                                .claim("login", ticketScoutUser.name())
                                .claim("avatar_url", ticketScoutUser.avatarUrl())
                        ))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "title": "test-title",
                                  "description": "test-description"
                                }
                                """))
                //THEN
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").exists())
                .andExpect(jsonPath("$.title").value("test-title"))
                .andExpect(jsonPath("$.description").value("test-description"))
                .andExpect(jsonPath("$.projectName").value(defaultProjectName))
                .andExpect(jsonPath("$.status").value(defaultStatus))
                .andExpect(jsonPath("$.author.name").value(ticketScoutUser.name()))
                .andExpect(jsonPath("$.author.avatarUrl").value(ticketScoutUser.avatarUrl()))
                .andExpect(jsonPath("$.titleAndDescriptionEmbedding").doesNotExist());
    }

    @Test
    @WithMockUser
    @DirtiesContext
    void createTicket_whenEmptyTitle_thenReturnApiErrorMessage() throws Exception {
        //GIVEN
        TicketScoutUser ticketScoutUser = new TicketScoutUser("testUser", "testAvatarUrl");

        //WHEN
        mockMvc.perform(post("/api/ticket").with(oidcLogin().userInfoToken(token -> token
                                .claim("login", ticketScoutUser.name())
                                .claim("avatar_url", ticketScoutUser.avatarUrl())
                        ))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "title": "",
                                  "description": "test-description"
                                }
                                """))
                //THEN
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.error").value("Input validation failed for title (Title must not be empty)"));
    }

    @Test
    @WithMockUser
    @DirtiesContext
    void createTicket_whenTooLongTitle_thenReturnApiErrorMessage() throws Exception {
        //GIVEN
        TicketScoutUser ticketScoutUser = new TicketScoutUser("testUser", "testAvatarUrl");
        String tooLongTitle = "a".repeat(257);

        //WHEN
        mockMvc.perform(post("/api/ticket").with(oidcLogin().userInfoToken(token -> token
                                .claim("login", ticketScoutUser.name())
                                .claim("avatar_url", ticketScoutUser.avatarUrl())
                        ))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(String.format("""
                                {
                                  "title": "%s",
                                  "description": "test-description"
                                }
                                """, tooLongTitle)))
                //THEN
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.error").value("Input validation failed for title (Title must not exceed 256 characters)"));
    }

    @Test
    @WithMockUser
    @DirtiesContext
    void createTicket_whenEmptyDescription_thenReturnApiErrorMessage() throws Exception {
        //GIVEN
        TicketScoutUser ticketScoutUser = new TicketScoutUser("testUser", "testAvatarUrl");

        //WHEN
        mockMvc.perform(post("/api/ticket").with(oidcLogin().userInfoToken(token -> token
                                .claim("login", ticketScoutUser.name())
                                .claim("avatar_url", ticketScoutUser.avatarUrl())
                        ))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "title": "test-title",
                                  "description": ""
                                }
                                """))
                //THEN
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.error").value("Input validation failed for description (Description must not be empty)"));
    }

    @Test
    @WithMockUser
    @DirtiesContext
    void createTicket_whenTooLongDescription_thenReturnApiErrorMessage() throws Exception {
        //GIVEN
        TicketScoutUser ticketScoutUser = new TicketScoutUser("testUser", "testAvatarUrl");
        String tooLongDescription = "a".repeat(20001);

        //WHEN
        mockMvc.perform(post("/api/ticket").with(oidcLogin().userInfoToken(token -> token
                                .claim("login", ticketScoutUser.name())
                                .claim("avatar_url", ticketScoutUser.avatarUrl())
                        ))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(String.format("""
                                {
                                  "title": "test-title",
                                  "description": "%s"
                                }
                                """, tooLongDescription)))
                //THEN
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.error").value("Input validation failed for description (Description must not exceed 20000 characters)"));
    }

    @Test
    @WithMockUser
    @DirtiesContext
    void createTicket_whenEmptyTitleAndDescription_thenReturnApiErrorMessage() throws Exception {
        //GIVEN
        TicketScoutUser ticketScoutUser = new TicketScoutUser("testUser", "testAvatarUrl");

        //WHEN
        mockMvc.perform(post("/api/ticket").with(oidcLogin().userInfoToken(token -> token
                                .claim("login", ticketScoutUser.name())
                                .claim("avatar_url", ticketScoutUser.avatarUrl())
                        ))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "title": "",
                                  "description": ""
                                }
                                """))
                //THEN
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.error", anyOf(
                        containsString("Input validation failed for title (Title must not be empty) and description (Description must not be empty)"),
                        containsString("Input validation failed for description (Description must not be empty) and title (Title must not be empty)")
                )));
    }

    @Test
    @WithMockUser
    @DirtiesContext
    void createTicket_whenTooLongTitleAndDescription_thenReturnApiErrorMessage() throws Exception {
        //GIVEN
        TicketScoutUser ticketScoutUser = new TicketScoutUser("testUser", "testAvatarUrl");
        String tooLongTitle = "a".repeat(257);
        String tooLongDescription = "a".repeat(20001);

        //WHEN
        mockMvc.perform(post("/api/ticket").with(oidcLogin().userInfoToken(token -> token
                                .claim("login", ticketScoutUser.name())
                                .claim("avatar_url", ticketScoutUser.avatarUrl())
                        ))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(String.format("""
                                {
                                  "title": "%s",
                                  "description": "%s"
                                }
                                """, tooLongTitle, tooLongDescription)))
                //THEN
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.error", anyOf(
                        containsString("Input validation failed for title (Title must not exceed 256 characters) and description (Description must not exceed 20000 characters)"),
                        containsString("Input validation failed for description (Description must not exceed 20000 characters) and title (Title must not exceed 256 characters)")
                )));
    }

    @Test
    void updateTicket_whenUnauthenticated_returnUnauthorized() throws Exception {
        //GIVEN
        //WHEN
        mockMvc.perform(put("/api/ticket"))
                //THEN
                .andExpect(status().isUnauthorized())
                .andExpect(content().string("")
                );
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void updateTicket_whenUpdateTitleAndDescription_returnTicketWithUpdatedTitleAndDescription() throws Exception {
        //GIVEN
        TicketScoutUser ticketScoutUser = new TicketScoutUser("test-name", "test-avatarUrl");
        ticketRepository.insert(new Ticket(
                "test-id",
                "test-projectName",
                "test-title",
                "test-description",
                Status.IN_PROGRESS,
                ticketScoutUser,
                List.of(1.2D)
        ));

        mockWebServer.enqueue(new MockResponse()
                .setBody("""
                        {
                          "data": [{
                            "object": "embedding",
                            "embedding": [0.1]
                            }
                          ]
                        }
                        """)
                .addHeader("Content-Type", "application/json"));

        //WHEN
        mockMvc.perform(put("/api/ticket/test-id").with(oidcLogin().userInfoToken(token -> token
                                .claim("login", ticketScoutUser.name())
                                .claim("avatar_url", ticketScoutUser.avatarUrl())
                        ))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                "title": "updated-title",
                                "description": "updated-description"
                                }
                                """))
                //THEN
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                        "id": "test-id",
                        "projectName": "test-projectName",
                        "title": "updated-title",
                        "description": "updated-description",
                        "status": "IN_PROGRESS",
                        "author": {"name": "test-name", "avatarUrl": "test-avatarUrl"}
                        }
                        """));
    }

    @Test
    @WithMockUser
    void updateTicket_whenTicketNotInRepository_returnApiErrorMessage() throws Exception {
        //GIVEN
        TicketScoutUser ticketScoutUser = new TicketScoutUser("test-name", "test-avatarUrl");
        //WHEN
        mockMvc.perform(put("/api/ticket/test-id").with(oidcLogin().userInfoToken(token -> token
                                .claim("login", ticketScoutUser.name())
                                .claim("avatar_url", ticketScoutUser.avatarUrl())
                        ))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                "title": "test-title",
                                "description": "test-description"
                                }
                                """))
                //THEN
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.error").value("Could not find ticket with id: test-id"));
    }

    @Test
    @WithMockUser
    @DirtiesContext
    void updateTicket_whenInvalidIdAndTitleAndDescription_thenReturnApiErrorMessage() throws Exception {
        //GIVEN
        TicketScoutUser ticketScoutUser = new TicketScoutUser("test-name", "test-avatarUrl");
        //WHEN
        mockMvc.perform(put("/api/ticket/test-id").with(oidcLogin().userInfoToken(token -> token
                                .claim("login", ticketScoutUser.name())
                                .claim("avatar_url", ticketScoutUser.avatarUrl())
                        ))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "title": "",
                                  "description": ""
                                }
                                """))
                //THEN
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.error", containsString("Input validation failed for")))
                .andExpect(jsonPath("$.error", containsString("and")))
                .andExpect(jsonPath("$.error", containsString("description (Description must not be empty)")))
                .andExpect(jsonPath("$.error", containsString("title (Title must not be empty)")));
    }

    @Test
    @WithMockUser
    @DirtiesContext
    void deleteTicket_whenDeletingTicketFromRepository_thenOnlyTheSpecifiedTicketIsDeleted() throws Exception {
        //GIVEN
        TicketScoutUser ticketScoutUser = new TicketScoutUser("test-name", "test-avatarUrl");
        Ticket ticketToDelete = new Ticket(
                "1",
                "projectName",
                "titleToDelete",
                "description",
                Status.OPEN, ticketScoutUser
                , List.of(1.2D)
        );
        Ticket ticketToKeep = new Ticket(
                "2",
                "projectName",
                "titleToKeep",
                "description",
                Status.OPEN, ticketScoutUser,
                List.of(1.2D)
        );
        ticketRepository.insert(ticketToDelete);
        ticketRepository.insert(ticketToKeep);

        //WHEN
        mockMvc.perform(delete("/api/ticket/{id}", ticketToDelete.id()).with(oidcLogin().userInfoToken(token -> token
                        .claim("login", ticketScoutUser.name())
                        .claim("avatar_url", ticketScoutUser.avatarUrl())
                )))
                //THEN
                .andExpect(status().isOk());

        assertFalse(ticketRepository.findById(ticketToDelete.id()).isPresent());
        assertTrue(ticketRepository.findById(ticketToKeep.id()).isPresent());
    }

    @Test
    @WithMockUser
    @DirtiesContext
    void getAllTickets_when101thRequestMade_thenReturnApiErrorMessage() throws Exception {
        //GIVEN
        TicketScoutUser ticketScoutUser = new TicketScoutUser("test-name", "test-avatarUrl");
        IntStream.rangeClosed(1, 100)
                .boxed()
                .sorted(Collections.reverseOrder())
                .forEach(counter -> {
                    try {
                        mockMvc.perform(get("/api/ticket").with(oidcLogin().userInfoToken(token -> token
                                        .claim("login", ticketScoutUser.name())
                                        .claim("avatar_url", ticketScoutUser.avatarUrl())
                                )))
                                .andExpect(status().isOk())
                                .andExpect(header().longValue("X-Rate-Limit-Remaining", counter - 1));
                    } catch (Exception e) {
                        fail(e.getMessage());
                    }
                });

        //WHEN
        mockMvc.perform(get("/api/ticket").with(oidcLogin().userInfoToken(token -> token
                        .claim("login", ticketScoutUser.name())
                        .claim("avatar_url", ticketScoutUser.avatarUrl())
                )))
                //THEN
                .andExpect(status().is(HttpStatus.TOO_MANY_REQUESTS.value()))
                .andExpect(content().json("""
                        {
                          "error": "Too Many Requests, you have exhausted your API Request Quota"
                        }
                        """)
                );
    }

    @Test
    @WithMockUser
    @DirtiesContext
    void createTicket_when101thRequestMade_thenReturnApiErrorMessage() throws Exception {
        //GIVEN
        TicketScoutUser ticketScoutUser = new TicketScoutUser("test-name", "test-avatarUrl");
        IntStream.rangeClosed(1, 100)
                .boxed()
                .sorted(Collections.reverseOrder())
                .forEach(counter -> {
                    try {
                        mockMvc.perform(get("/api/ticket").with(oidcLogin().userInfoToken(token -> token
                                        .claim("login", ticketScoutUser.name())
                                        .claim("avatar_url", ticketScoutUser.avatarUrl())
                                )))
                                .andExpect(status().isOk())
                                .andExpect(header().longValue("X-Rate-Limit-Remaining", counter - 1));
                    } catch (Exception e) {
                        fail(e.getMessage());
                    }
                });

        mockWebServer.enqueue(new MockResponse()
                .setBody("""
                        {
                          "data": [{
                            "object": "embedding",
                            "embedding": [0.1]
                            }
                          ]
                        }
                        """)
                .addHeader("Content-Type", "application/json"));

        //WHEN
        mockMvc.perform(post("/api/ticket").with(oidcLogin().userInfoToken(token -> token
                                .claim("login", ticketScoutUser.name())
                                .claim("avatar_url", ticketScoutUser.avatarUrl())
                        ))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "title": "",
                                  "description": ""
                                }
                                """))
                //THEN
                .andExpect(status().is(HttpStatus.TOO_MANY_REQUESTS.value()))
                .andExpect(content().json("""
                        {
                          "error": "Too Many Requests, you have exhausted your API Request Quota"
                        }
                        """)
                );
    }

    @Test
    @WithMockUser
    @DirtiesContext
    void updateTicket_when101thRequestMade_thenReturnApiErrorMessage() throws Exception {
        //GIVEN
        TicketScoutUser ticketScoutUser = new TicketScoutUser("test-name", "test-avatarUrl");
        IntStream.rangeClosed(1, 100)
                .boxed()
                .sorted(Collections.reverseOrder())
                .forEach(counter -> {
                    try {
                        mockMvc.perform(get("/api/ticket").with(oidcLogin().userInfoToken(token -> token
                                        .claim("login", ticketScoutUser.name())
                                        .claim("avatar_url", ticketScoutUser.avatarUrl())
                                )))
                                .andExpect(status().isOk())
                                .andExpect(header().longValue("X-Rate-Limit-Remaining", counter - 1));
                    } catch (Exception e) {
                        fail(e.getMessage());
                    }
                });
        ticketRepository.insert(new Ticket(
                "test-id",
                "test-projectName",
                "test-title",
                "test-description",
                Status.OPEN,
                new TicketScoutUser("test-name", "test-avatarUrl"),
                List.of(1.2D, 3.4D)
        ));

        mockWebServer.enqueue(new MockResponse()
                .setBody("""
                        {
                          "data": [{
                            "object": "embedding",
                            "embedding": [0.1]
                            }
                          ]
                        }
                        """)
                .addHeader("Content-Type", "application/json"));

        //WHEN
        mockMvc.perform(put("/api/ticket/test-id").with(oidcLogin().userInfoToken(token -> token
                                .claim("login", ticketScoutUser.name())
                                .claim("avatar_url", ticketScoutUser.avatarUrl())
                        ))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "title": "updated-title",
                                  "description": "updated-description"
                                }
                                """))
                //THEN
                .andExpect(status().is(HttpStatus.TOO_MANY_REQUESTS.value()))
                .andExpect(content().json("""
                        {
                          "error": "Too Many Requests, you have exhausted your API Request Quota"
                        }
                        """)
                );
    }

    @Test
    @WithMockUser
    @DirtiesContext
    void deleteTicket_when101thRequestMade_thenReturnApiErrorMessage() throws Exception {
        //GIVEN
        TicketScoutUser ticketScoutUser = new TicketScoutUser("test-name", "test-avatarUrl");
        IntStream.rangeClosed(1, 100)
                .boxed()
                .sorted(Collections.reverseOrder())
                .forEach(counter -> {
                    try {
                        mockMvc.perform(get("/api/ticket").with(oidcLogin().userInfoToken(token -> token
                                        .claim("login", ticketScoutUser.name())
                                        .claim("avatar_url", ticketScoutUser.avatarUrl())
                                )))
                                .andExpect(status().isOk())
                                .andExpect(header().longValue("X-Rate-Limit-Remaining", counter - 1));
                    } catch (Exception e) {
                        fail(e.getMessage());
                    }
                });
        ticketRepository.insert(new Ticket(
                "test-id",
                "test-projectName",
                "test-title",
                "test-description",
                Status.OPEN,
                new TicketScoutUser("test-name", "test-avatarUrl"),
                List.of(1.2D, 3.4D)
        ));

        mockWebServer.enqueue(new MockResponse()
                .setBody("""
                        {
                          "data": [{
                            "object": "embedding",
                            "embedding": [0.1]
                            }
                          ]
                        }
                        """)
                .addHeader("Content-Type", "application/json"));

        //WHEN
        mockMvc.perform(delete("/api/ticket/test-id").with(oidcLogin().userInfoToken(token -> token
                        .claim("login", ticketScoutUser.name())
                        .claim("avatar_url", ticketScoutUser.avatarUrl())
                )))
                //THEN
                .andExpect(status().is(HttpStatus.TOO_MANY_REQUESTS.value()))
                .andExpect(content().json("""
                        {
                          "error": "Too Many Requests, you have exhausted your API Request Quota"
                        }
                        """)
                );
    }
}