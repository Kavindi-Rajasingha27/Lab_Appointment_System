package com.example.applabappointmentsystembackend.repository;
import com.example.applabappointmentsystembackend.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, Integer>{
    @Query("{ 'email' : ?0 }")
    User findByEmail(String email);
    List<User> findAllByRole(String role);
    Optional<User> findOneByEmailAndPassword(String email, String password);

}
