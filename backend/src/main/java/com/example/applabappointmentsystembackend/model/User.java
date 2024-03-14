package com.example.applabappointmentsystembackend.model;

import com.example.applabappointmentsystembackend.service.IdGeneratorService.IdGeneratorService;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Getter
@Setter
@ToString
@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "users")
public class User {
    @Id
    @Field(name = "_id")
    private int id;
    private String fullName;

    public User(String fullName, IdGeneratorService idGeneratorService) {
        this.id = idGeneratorService.generateNextId("users");
        this.fullName = fullName;
    }
}
