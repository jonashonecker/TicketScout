package com.github.jonashonecker.backend.ticket;

import com.github.jonashonecker.backend.ticket.domain.NewTicket;
import com.github.jonashonecker.backend.ticket.domain.Status;
import com.github.jonashonecker.backend.ticket.domain.Ticket;
import com.github.jonashonecker.backend.ticket.domain.UpdateTicket;
import com.github.jonashonecker.backend.ticket.exception.NoSuchTicketException;
import com.github.jonashonecker.backend.user.UserService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TicketService {
    private final TicketRepository ticketRepository;
    private final IdService idService;
    private final UserService userService;

    public TicketService(TicketRepository ticketRepository, IdService idService, UserService userService) {
        this.ticketRepository = ticketRepository;
        this.idService = idService;
        this.userService = userService;
    }

    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }

    public Ticket getTicketById(String id) {
        return ticketRepository.findById(id).orElseThrow(() -> new NoSuchTicketException("Could not find ticket with id: " + id));
    }

    public Ticket createTicket(NewTicket newTicket) {
        String defaultProjectName = "Default Project";
        Status defaultStatus = Status.OPEN;
        return ticketRepository.insert(new Ticket(
                idService.getUUID(),
                defaultProjectName,
                newTicket.title(),
                newTicket.description(),
                defaultStatus,
                userService.getCurrentUser()
        ));
    }

    public Ticket updateTicket(UpdateTicket updateTicket) {
        Ticket existingTicket = getTicketById(updateTicket.id());
        return ticketRepository.save(new Ticket(
                existingTicket.id(),
                existingTicket.projectName(),
                updateTicket.title(),
                updateTicket.description(),
                existingTicket.status(),
                existingTicket.author()
        ));
    }
}