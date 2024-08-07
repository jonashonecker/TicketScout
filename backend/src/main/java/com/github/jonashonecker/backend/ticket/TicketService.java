package com.github.jonashonecker.backend.ticket;

import com.github.jonashonecker.backend.ticket.domain.ticket.*;
import com.github.jonashonecker.backend.ticket.exception.NoSuchTicketException;
import com.github.jonashonecker.backend.user.UserService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TicketService {
    private final TicketRepository ticketRepository;
    private final TicketRepositoryVectorSearch ticketRepositoryVectorSearch;
    private final IdService idService;
    private final UserService userService;
    private final EmbeddingService embeddingService;

    public TicketService(TicketRepository ticketRepository, IdService idService, UserService userService, EmbeddingService embeddingService, TicketRepositoryVectorSearch ticketRepositoryVectorSearch) {
        this.ticketRepository = ticketRepository;
        this.idService = idService;
        this.userService = userService;
        this.embeddingService = embeddingService;
        this.ticketRepositoryVectorSearch = ticketRepositoryVectorSearch;
    }

    public List<Ticket> getTicketsByVectorSearch(String searchText) {
        List<Double> embedding = embeddingService.getEmbeddingVectorForSearchText(searchText);
        return ticketRepositoryVectorSearch.findTicketsByVector(embedding);
    }

    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }

    public Ticket getTicketById(String id) {
        return ticketRepository.findById(id).orElseThrow(() -> new NoSuchTicketException("Could not find ticket with id: " + id));
    }

    public Ticket createTicket(TicketRequestDTO ticketRequestDTO) {
        String defaultProjectName = "Default Project";
        Status defaultStatus = Status.OPEN;
        return ticketRepository.insert(new Ticket(
                idService.getUUID(),
                defaultProjectName,
                ticketRequestDTO.title(),
                ticketRequestDTO.description(),
                defaultStatus,
                userService.getCurrentUser(),
                embeddingService.getEmbeddingVectorForTicket(ticketRequestDTO))
        );
    }

    public Ticket updateTicket(TicketRequestDTO ticketRequestDTO, String id) {
        Ticket existingTicket = getTicketById(id);
        return ticketRepository.save(new Ticket(
                existingTicket.id(),
                existingTicket.projectName(),
                ticketRequestDTO.title(),
                ticketRequestDTO.description(),
                existingTicket.status(),
                existingTicket.author(),
                embeddingService.getEmbeddingVectorForTicket(ticketRequestDTO))
        );
    }

    public void deleteTicket(String id) {
        Ticket ticket = getTicketById(id);
        ticketRepository.delete(ticket);
    }
}