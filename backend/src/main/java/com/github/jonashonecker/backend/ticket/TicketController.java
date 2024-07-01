package com.github.jonashonecker.backend.ticket;

import com.github.jonashonecker.backend.ticket.domain.embedding.EmbeddingResponseDTO;
import com.github.jonashonecker.backend.ticket.domain.ticket.NewTicketDTO;
import com.github.jonashonecker.backend.ticket.domain.ticket.Ticket;
import com.github.jonashonecker.backend.ticket.domain.ticket.UpdateTicketDTO;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ticket")
public class TicketController {
    private final TicketService ticketService;

    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @GetMapping
    public List<Ticket> getAllTickets(@RequestParam(required = false) String searchText) {
        if (searchText == null) {
            return ticketService.getAllTickets();
        }
        return ticketService.semanticSearch(searchText);
    }

    @PostMapping
    public Ticket createTicket(@Valid @RequestBody NewTicketDTO newTicketDTO) {
        return ticketService.createTicket(newTicketDTO);
    }

    @PutMapping
    public Ticket updateTicket(@Valid @RequestBody UpdateTicketDTO updateTicketDTO) {
        return ticketService.updateTicket(updateTicketDTO);
    }

    @DeleteMapping("/{id}")
    public void deleteTicket(@PathVariable String id) {
        ticketService.deleteTicket(id);
    }
}
