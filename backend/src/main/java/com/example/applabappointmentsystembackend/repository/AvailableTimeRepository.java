package com.example.applabappointmentsystembackend.repository;

import com.example.applabappointmentsystembackend.model.AvailableTime;
import com.example.applabappointmentsystembackend.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AvailableTimeRepository extends MongoRepository<AvailableTime, Integer> {
    List<AvailableTime> findAllByDoctorId(int doctorId);
}
