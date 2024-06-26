package com.github.jonashonecker.backend.ticket;

import com.github.jonashonecker.backend.ticket.domain.Status;
import com.github.jonashonecker.backend.ticket.domain.Ticket;
import com.github.jonashonecker.backend.user.domain.TicketScoutUser;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.anyOf;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.oidcLogin;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class TicketControllerTest {

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private MockMvc mockMvc;

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
    void getAllTickets_whenRepositoryEmpty_returnEmptyBody() throws Exception {
        //GIVEN
        //WHEN
        mockMvc.perform(get("/api/ticket"))
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
                ticketScoutUser
        );

        ticketRepository.insert(ticket);

        //WHEN
        mockMvc.perform(get("/api/ticket"))
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
                .andExpect(jsonPath("$.author.avatarUrl").value(ticketScoutUser.avatarUrl()));

    }

    @Test
    @WithMockUser
    @DirtiesContext
    void createTicket_whenInvalidTicketTitle_thenReturnApiErrorMessage() throws Exception {
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
    void createTicket_whenInvalidDescription_thenReturnApiErrorMessage() throws Exception {
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
    void createTicket_whenInvalidTitleAndDescription_thenReturnApiErrorMessage() throws Exception {
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
    @DirtiesContext
    @WithMockUser
    void createTicket_whenInvalidUser_thenReturnApiErrorMessage() throws Exception {
        //GIVEN
        //WHEN
        mockMvc.perform(post("/api/ticket")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "title": "test-title",
                                  "description": "test-description"
                                }
                                """))
                //THEN
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.error").value("There is an issue with your user login. Please contact support."));
    }
}