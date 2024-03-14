package com.example.applabappointmentsystembackend.repository;
import com.example.applabappointmentsystembackend.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
public interface UserRepository extends MongoRepository<User, Integer>{
}
