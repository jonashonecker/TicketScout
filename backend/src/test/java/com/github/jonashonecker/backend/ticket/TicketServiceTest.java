package com.github.jonashonecker.backend.ticket;

import com.github.jonashonecker.backend.ticket.domain.NewTicket;
import com.github.jonashonecker.backend.ticket.domain.Status;
import com.github.jonashonecker.backend.ticket.domain.Ticket;
import com.github.jonashonecker.backend.user.UserService;
import com.github.jonashonecker.backend.user.domain.TicketScoutUser;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class TicketServiceTest {

    private final TicketRepository ticketRepository = mock();
    private final IdService idService = mock();
    private final UserService userService = mock();

    private final TicketService ticketService = new TicketService(ticketRepository, idService, userService);

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

    @Test
    void createTicket_whenNewTicket_thenReturnsTicketWithDefaultProjectAndStatus() {
        //GIVEN
        String defaultProject = "Default Project";
        Status defaultStatus = Status.OPEN;
        TicketScoutUser ticketScoutUser = new TicketScoutUser("test-name", "test-avatarUrl");
        NewTicket newTicket = new NewTicket(
                "test-title",
                "test-description"
        );

        Ticket expected = new Ticket(
                "1",
                defaultProject,
                "test-title",
                "test-description",
                defaultStatus,
                ticketScoutUser
        );

        when(idService.getUUID()).thenReturn("1");
        when(userService.getCurrentUser()).thenReturn(ticketScoutUser);
        when(ticketRepository.insert(any(Ticket.class))).thenReturn(expected);

        //WHEN
        Ticket actual = ticketService.createTicket(newTicket);

        //THEN
        verify(ticketRepository, times(1)).insert(expected);
        verify(idService, times(1)).getUUID();
        verify(userService, times(1)).getCurrentUser();
        assertEquals(expected, actual);
    }
}