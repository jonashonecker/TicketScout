package com.github.jonashonecker.backend.ticket.domain.ticket;

import com.github.jonashonecker.backend.user.domain.TicketScoutUser;
import org.bson.codecs.pojo.annotations.BsonProperty;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document("tickets")
public record Ticket(
        @Id
        @BsonProperty("_id")
        String id,
        String projectName,
        String title,
        String description,
        Status status,
        TicketScoutUser author,
        List<Double> titleAndDescriptionEmbedding
) {
}
