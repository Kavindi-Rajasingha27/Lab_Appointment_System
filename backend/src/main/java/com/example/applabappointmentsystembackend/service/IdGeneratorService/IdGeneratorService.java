package com.example.applabappointmentsystembackend.service.IdGeneratorService;

import org.springframework.stereotype.Service;

@Service
public class IdGeneratorService {

    private static IdSequenceService idSequenceService = null;

    private static IdGeneratorService instance;

    private IdGeneratorService(IdSequenceService idSequenceService) {
        this.idSequenceService = idSequenceService;
    }

    public static IdGeneratorService getInstance() {
        if (instance == null) {
            synchronized (IdGeneratorService.class) {
                if (instance == null) {
                    instance = new IdGeneratorService(idSequenceService);
                }
            }
        }
        return instance;
    }

    public int generateNextId(String collectionName) {
        return idSequenceService.getNextSequence(collectionName);
    }
}