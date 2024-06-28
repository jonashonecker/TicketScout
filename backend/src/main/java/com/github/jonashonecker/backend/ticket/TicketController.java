package com.github.jonashonecker.backend.ticket;

import com.github.jonashonecker.backend.ticket.domain.NewTicket;
import com.github.jonashonecker.backend.ticket.domain.Ticket;
import com.github.jonashonecker.backend.ticket.domain.UpdateTicket;
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
    public List<Ticket> getAllTickets() {
        return ticketService.getAllTickets();
    }

    @PostMapping
    public Ticket createTicket(@Valid @RequestBody NewTicket newTicket) {
        return ticketService.createTicket(newTicket);
    }

    @PutMapping
    public Ticket updateTicket(@Valid @RequestBody UpdateTicket updateTicket) {
        return ticketService.updateTicket(updateTicket);
    }
}
