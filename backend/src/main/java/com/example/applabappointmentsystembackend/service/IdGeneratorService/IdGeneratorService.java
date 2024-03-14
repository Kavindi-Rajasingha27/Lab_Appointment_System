package com.example.applabappointmentsystembackend.service.IdGeneratorService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class IdGeneratorService {

    private final IdSequenceService idSequenceService;

    @Autowired
    public IdGeneratorService(IdSequenceService idSequenceService) {
        this.idSequenceService = idSequenceService;
    }

    public int generateNextId(String collectionName) {
        return idSequenceService.getNextSequence(collectionName);
    }
}
