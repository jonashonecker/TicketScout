package com.github.jonashonecker.backend.ticket;

import com.github.jonashonecker.backend.ticket.domain.Ticket;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TicketRepository extends MongoRepository<Ticket, String> {
}
