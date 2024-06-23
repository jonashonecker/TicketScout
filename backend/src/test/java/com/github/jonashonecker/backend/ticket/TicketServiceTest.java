package com.github.jonashonecker.backend.ticket;

import com.github.jonashonecker.backend.ticket.domain.Status;
import com.github.jonashonecker.backend.ticket.domain.Ticket;
import com.github.jonashonecker.backend.user.domain.TicketScoutUser;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class TicketServiceTest {

    private final TicketRepository ticketRepository = mock();

    private final TicketService ticketService = new TicketService(ticketRepository);

    @Test
    void getAllTickets_whenRepositoryEmpty_returnEmptyList() {
        //GIVEN
        when(ticketRepository.findAll()).thenReturn(List.of());

        //WHEN
        List<Ticket> actual = ticketService.getAllTickets();

        //THEN
        assertEquals(List.of(), actual);
    }

    @Test
    void getAllTickets_whenRepositoryContainsTickets_returnTickets() {
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

        when(ticketRepository.findAll()).thenReturn(List.of(ticket));

        //WHEN
        List<Ticket> actual = ticketService.getAllTickets();

        //THEN
        assertEquals(List.of(ticket), actual);
    }
}