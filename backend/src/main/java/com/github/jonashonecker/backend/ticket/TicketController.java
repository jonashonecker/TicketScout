package com.github.jonashonecker.backend.ticket;

import com.github.jonashonecker.backend.ticket.domain.NewTicketDTO;
import com.github.jonashonecker.backend.ticket.domain.Ticket;
import com.github.jonashonecker.backend.ticket.domain.UpdateTicketDTO;
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
    public Ticket createTicket(@Valid @RequestBody NewTicketDTO newTicketDTO) {
        return ticketService.createTicket(newTicketDTO);
    }

    @PutMapping
    public Ticket updateTicket(@Valid @RequestBody UpdateTicketDTO updateTicketDTO) {
        return ticketService.updateTicket(updateTicketDTO);
    }
}
