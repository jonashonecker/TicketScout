package com.github.jonashonecker.backend.ticket;

import com.github.jonashonecker.backend.ticket.domain.ticket.NewTicketDTO;
import com.github.jonashonecker.backend.ticket.domain.ticket.Ticket;
import com.github.jonashonecker.backend.ticket.domain.ticket.TicketDTO;
import com.github.jonashonecker.backend.ticket.domain.ticket.UpdateTicketDTO;
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

    private final Function<Ticket, TicketDTO> ticketToDtoMapper = ticket -> new TicketDTO(
            ticket.id(),
            ticket.projectName(),
            ticket.title(),
            ticket.description(),
            ticket.status(),
            ticket.author()
    );

    @GetMapping
    public List<TicketDTO> getAllTickets(@RequestParam(required = false) String searchText) {
        List<Ticket> tickets = searchText == null ? ticketService.getAllTickets() : ticketService.getTicketsByVectorSearch(searchText);
        return tickets.stream().map(ticketToDtoMapper).toList();
    }

    @PostMapping
    public TicketDTO createTicket(@Valid @RequestBody NewTicketDTO newTicketDTO) {
        Ticket ticket = ticketService.createTicket(newTicketDTO);
        return ticketToDtoMapper.apply(ticket);
    }

    @PutMapping
    public TicketDTO updateTicket(@Valid @RequestBody UpdateTicketDTO updateTicketDTO) {
        Ticket ticket = ticketService.updateTicket(updateTicketDTO);
        return ticketToDtoMapper.apply(ticket);
    }

    @DeleteMapping("/{id}")
    public void deleteTicket(@PathVariable String id) {
        ticketService.deleteTicket(id);
    }
}
