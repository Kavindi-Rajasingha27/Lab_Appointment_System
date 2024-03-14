package com.example.applabappointmentsystembackend.repository;

import com.example.applabappointmentsystembackend.model.Appointment;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AppointmentRepository extends MongoRepository<Appointment, Integer> {
}
