package com.example.applabappointmentsystembackend.repository;
import com.example.applabappointmentsystembackend.model.Report;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReportRepository extends MongoRepository<Report, Integer>{
    List<Report> findAllByTechnicianId(int technicianId);
    List<Report> findAllByPatientId(int patientId);
}