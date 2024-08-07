package com.github.jonashonecker.backend.ticket;

import com.github.jonashonecker.backend.ticket.domain.ticket.*;
import com.github.jonashonecker.backend.ticket.exception.NoSuchTicketException;
import com.github.jonashonecker.backend.user.UserService;
import com.github.jonashonecker.backend.user.domain.TicketScoutUser;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class TicketServiceTest {

    private final TicketRepository ticketRepository = mock();
    private final TicketRepositoryVectorSearch ticketRepositoryVectorSearch = mock();
    private final IdService idService = mock();
    private final UserService userService = mock();
    private final EmbeddingService embeddingService = mock();

    private final TicketService ticketService = new TicketService(ticketRepository, idService, userService, embeddingService, ticketRepositoryVectorSearch);

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
    void getTicketById_whenTicketNotInRepository_throwNoSuchTicketException() {
        //GIVEN
        String id = "test-id";
        when(ticketRepository.findById(id)).thenReturn(Optional.empty());

        //WHEN
        NoSuchTicketException actual = assertThrows(NoSuchTicketException.class, () -> ticketService.getTicketById(id));

        //THEN
        assertEquals("Could not find ticket with id: " + id, actual.getMessage());
    }

    @Test
    void getTicketById_whenTicketInRepository_returnTicket() {
        //GIVEN
        String id = "test-id";
        Ticket expected = new Ticket(
                id,
                "test-projectName",
                "test-title",
                "test-description",
                Status.OPEN,
                new TicketScoutUser("test-name", "test-avatarUrl"),
                List.of(1.2D)
        );

        when(ticketRepository.findById(id)).thenReturn(Optional.of(expected));

        //WHEN
        Ticket actual = ticketService.getTicketById(id);

        //THEN
        assertEquals(expected, actual);
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
                ticketScoutUser,
                List.of(1.2D)
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
        List<Double> embedding = List.of(1.5D);
        TicketScoutUser ticketScoutUser = new TicketScoutUser("test-name", "test-avatarUrl");
        TicketRequestDTO ticketRequestDTO = new TicketRequestDTO(
                "test-title",
                "test-description"
        );

        Ticket expected = new Ticket(
                "1",
                defaultProject,
                "test-title",
                "test-description",
                defaultStatus,
                ticketScoutUser,
                embedding
        );

        when(idService.getUUID()).thenReturn("1");
        when(userService.getCurrentUser()).thenReturn(ticketScoutUser);
        when(ticketRepository.insert(any(Ticket.class))).thenReturn(expected);
        when(embeddingService.getEmbeddingVectorForTicket(ticketRequestDTO)).thenReturn(embedding);

        //WHEN
        Ticket actual = ticketService.createTicket(ticketRequestDTO);

        //THEN
        verify(ticketRepository, times(1)).insert(expected);
        verify(idService, times(1)).getUUID();
        verify(userService, times(1)).getCurrentUser();
        verify(embeddingService, times(1)).getEmbeddingVectorForTicket(ticketRequestDTO);
        assertEquals(expected, actual);
    }

    @Test
    void updateTicket_whenUpdateTicketTitle_returnTicketWithUpdatedTitle() {
        //GIVEN
        String id = "test-id";
        String description = "test-description";
        List<Double> embedding = List.of(1.5D);
        TicketRequestDTO ticketRequestDTO = new TicketRequestDTO( "new-updated-title", description);
        Ticket ticketInDb = new Ticket(
                id,
                "test-projectName",
                "test-title",
                description,
                Status.OPEN,
                new TicketScoutUser("test-name", "test-avatarUrl"),
                embedding
        );
        Ticket expected = new Ticket(
                id,
                ticketInDb.projectName(),
                "new-updated-title",
                ticketInDb.description(),
                ticketInDb.status(),
                ticketInDb.author(),
                embedding
        );
        when(ticketRepository.findById(id)).thenReturn(Optional.of(ticketInDb));
        when(ticketRepository.save(expected)).thenReturn(expected);
        when(embeddingService.getEmbeddingVectorForTicket(ticketRequestDTO)).thenReturn(embedding);

        //WHEN
        Ticket actual = ticketService.updateTicket(ticketRequestDTO, id);

        //THEN
        verify(ticketRepository, times(1)).save(expected);
        verify(ticketRepository, times(1)).findById(id);
        verify(embeddingService, times(1)).getEmbeddingVectorForTicket(ticketRequestDTO);
        assertEquals(expected, actual);
    }

    @Test
    void deleteTicket_whenIdDoesNotExist_throwNoSuchTicketException() {
        //GIVEN
        String id = "test-id";
        when(ticketRepository.findById(id)).thenReturn(Optional.empty());

        //WHEN
        NoSuchTicketException actual = assertThrows(NoSuchTicketException.class, () -> ticketService.deleteTicket(id));

        //THEN
        assertEquals("Could not find ticket with id: " + id, actual.getMessage());
    }

    @Test
    void deleteTicket_whenIdExist_thenGetTicketByIdAndDeleteTicketByIdIsCalled() {
        //GIVEN
        String id = "test-id";
        Ticket ticket = new Ticket(
                id,
                "test-projectName",
                "test-title",
                "test-description",
                Status.OPEN,
                new TicketScoutUser("test-name", "test-avatarUrl"),
                List.of(1.2D)
        );
        when(ticketRepository.findById(id)).thenReturn(Optional.of(ticket));

        //WHEN
        ticketService.deleteTicket(id);

        //THEN
        verify(ticketRepository, times(1)).findById(id);
        verify(ticketRepository, times(1)).delete(ticket);
    }

    @Test
    void getTicketsByVectorSearch_withValidSearchText_returnsMatchingTickets() {
        // GIVEN
        String searchText = "test search";
        List<Double> embedding = List.of(1.0, 2.0);
        Ticket expectedTicket = new Ticket("1", "Default Project", "Title", "Description", Status.OPEN, new TicketScoutUser("name", "avatarUrl"), embedding);
        when(embeddingService.getEmbeddingVectorForSearchText(searchText)).thenReturn(embedding);
        when(ticketRepositoryVectorSearch.findTicketsByVector(embedding)).thenReturn(List.of(expectedTicket));

        // WHEN
        List<Ticket> actualTickets = ticketService.getTicketsByVectorSearch(searchText);

        // THEN
        assertEquals(List.of(expectedTicket), actualTickets);
        verify(embeddingService, times(1)).getEmbeddingVectorForSearchText(searchText);
        verify(ticketRepositoryVectorSearch, times(1)).findTicketsByVector(embedding);
    }

}