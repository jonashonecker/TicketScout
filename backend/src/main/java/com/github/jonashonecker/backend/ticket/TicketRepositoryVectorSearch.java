package com.github.jonashonecker.backend.ticket;

import com.github.jonashonecker.backend.ticket.domain.ticket.Ticket;
import com.mongodb.client.AggregateIterable;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import org.bson.conversions.Bson;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

import static com.mongodb.client.model.Aggregates.vectorSearch;
import static com.mongodb.client.model.search.SearchPath.fieldPath;

@Repository
public class TicketRepositoryVectorSearch {

    private final MongoClient mongoClient;

    @Value("${spring.data.mongodb.database}")
    private String databaseName;

    @Value("${vectorSearch.index.name}")
    private String indexName;

    @Value("${vectorSearch.index.fieldPath}")
    private String fieldPath;

    public TicketRepositoryVectorSearch(MongoClient mongoClient) {
        this.mongoClient = mongoClient;
    }

    private MongoCollection<Ticket> getTicketCollection() {
        return mongoClient.getDatabase(databaseName).getCollection("tickets", Ticket.class);
    }

    public List<Ticket> findTicketsByVector(List<Double> embedding) {
        int numCandidates = 100;
        int limit = 5;
        List<Bson> pipeline = List.of(
                vectorSearch(
                        fieldPath(fieldPath),
                        embedding,
                        indexName,
                        numCandidates,
                        limit));
        AggregateIterable<Ticket> iterable = getTicketCollection().aggregate(pipeline, Ticket.class);
        return iterable.into(new ArrayList<>());
    }
}
