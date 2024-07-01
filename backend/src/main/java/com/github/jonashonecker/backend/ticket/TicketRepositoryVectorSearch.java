package com.github.jonashonecker.backend.ticket;

import com.github.jonashonecker.backend.ticket.domain.ticket.Ticket;
import com.mongodb.client.AggregateIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.conversions.Bson;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

import static com.mongodb.client.model.Aggregates.vectorSearch;
import static com.mongodb.client.model.search.SearchPath.fieldPath;

@Repository
public class TicketRepositoryVectorSearch {

    private final MongoDatabase mongoDatabase;

    public TicketRepositoryVectorSearch(MongoDatabase mongoDatabase) {
        this.mongoDatabase = mongoDatabase;
    }

    private MongoCollection<Ticket> getTicketCollection() {
        return mongoDatabase.getCollection("tickets", Ticket.class);
    }

    public List<Ticket> findTicketsByVector(List<Double> embedding) {
        String indexName = "vector_index_titleAndDescription";
        int numCandidates = 100;
        int limit = 5;
        List<Bson> pipeline = List.of(
                vectorSearch(
                        fieldPath("titleAndDescriptionEmbedding"),
                        embedding,
                        indexName,
                        numCandidates,
                        limit));
        AggregateIterable<Ticket> iterable = getTicketCollection().aggregate(pipeline, Ticket.class);

        List<Ticket> tickets = new ArrayList<>();
        iterable.into(tickets);
        return tickets;
    }
}
