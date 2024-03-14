package com.example.applabappointmentsystembackend.repository;
import com.example.applabappointmentsystembackend.model.Report;
import com.example.applabappointmentsystembackend.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ReportRepository extends MongoRepository<Report, Integer>{
}
