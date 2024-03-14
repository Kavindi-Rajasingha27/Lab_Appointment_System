package com.example.applabappointmentsystembackend.repository;

import com.example.applabappointmentsystembackend.model.Appointment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppointmentRepository extends MongoRepository<Appointment, Integer> {
    List<Appointment> findAllByDoctorId(int doctorId);
}
