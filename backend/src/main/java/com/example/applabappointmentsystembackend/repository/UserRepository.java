package com.example.applabappointmentsystembackend.repository;
import com.example.applabappointmentsystembackend.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, Integer>{
    @Query("{ 'email' : ?0 }")
    User findByEmail(String email);
    Optional<User> findOneByEmailAndPassword(String email, String password);
}
