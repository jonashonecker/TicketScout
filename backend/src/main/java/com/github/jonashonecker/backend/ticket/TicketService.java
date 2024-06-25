package com.github.jonashonecker.backend.ticket;

import com.github.jonashonecker.backend.ticket.domain.Status;
import com.github.jonashonecker.backend.ticket.domain.Ticket;
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

    public Ticket createTicket(Ticket ticket) {
        String defaultProjectName = "Default Project";
        Status defaultStatus = Status.OPEN;
        Ticket newTicket = new Ticket(idService.getUUID(),
                defaultProjectName,
                ticket.title(),
                ticket.description(),
                defaultStatus,
                userService.getCurrentUser()
        );
        return ticketRepository.insert(newTicket);
    }
}