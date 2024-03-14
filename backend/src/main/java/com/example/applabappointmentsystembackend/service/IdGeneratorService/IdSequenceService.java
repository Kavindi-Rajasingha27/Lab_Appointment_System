package com.example.applabappointmentsystembackend.service.IdGeneratorService;
import com.example.applabappointmentsystembackend.model.IdSequence;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;
import static org.springframework.data.mongodb.core.FindAndModifyOptions.options;

@Service
public class IdSequenceService {
    private final MongoTemplate mongoTemplate;

    public IdSequenceService(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    public int getNextSequence(String collectionName) {
        IdSequence sequence = mongoTemplate.findAndModify(
                query(where("_id").is(collectionName)),
                new Update().inc("seq", 1),
                options().returnNew(true).upsert(true),
                IdSequence.class);

        return sequence.getSeq();
    }
}