package com.github.jonashonecker.backend.ticket;

import com.github.jonashonecker.backend.ticket.domain.ticket.*;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.function.Function;

@RestController
@RequestMapping("/api/ticket")
public class TicketController {
    private final TicketService ticketService;

    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    private final Function<Ticket, TicketResponseDTO> ticketToDtoMapper = ticket -> new TicketResponseDTO(
            ticket.id(),
            ticket.projectName(),
            ticket.title(),
            ticket.description(),
            ticket.status(),
            ticket.author()
    );

    @GetMapping
    public List<TicketResponseDTO> getAllTickets(@RequestParam(required = false) String searchText) {
        List<Ticket> tickets = searchText == null ? ticketService.getAllTickets() : ticketService.getTicketsByVectorSearch(searchText);
        return tickets.stream().map(ticketToDtoMapper).toList();
    }

    @PostMapping
    public TicketResponseDTO createTicket(@Valid @RequestBody TicketRequestDTO ticketRequestDTO) {
        Ticket ticket = ticketService.createTicket(ticketRequestDTO);
        return ticketToDtoMapper.apply(ticket);
    }

    @PutMapping("/{id}")
    public TicketResponseDTO updateTicket(
            @Valid @RequestBody TicketRequestDTO ticketRequestDTO,
            @PathVariable String id) {
        Ticket ticket = ticketService.updateTicket(ticketRequestDTO, id);
        return ticketToDtoMapper.apply(ticket);
    }

    @DeleteMapping("/{id}")
    public void deleteTicket(@PathVariable String id) {
        ticketService.deleteTicket(id);
    }
}
