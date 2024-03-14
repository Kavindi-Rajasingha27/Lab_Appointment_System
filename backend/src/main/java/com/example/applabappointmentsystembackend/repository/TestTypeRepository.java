package com.example.applabappointmentsystembackend.repository;

import com.example.applabappointmentsystembackend.model.TestType;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TestTypeRepository extends MongoRepository<TestType, Integer> {
}
