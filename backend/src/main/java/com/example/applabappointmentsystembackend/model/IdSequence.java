package com.example.applabappointmentsystembackend.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@ToString
@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "id_sequence")
public class IdSequence {
    @Id
    private String collectionName;
    private int seq;
}
