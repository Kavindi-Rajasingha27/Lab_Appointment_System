package com.example.applabappointmentsystembackend.model;

import com.example.applabappointmentsystembackend.dto.TestTypeDto;
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
@Document(collection = "testTypes")
public class TestType {
    @Id
    @Field(name = "_id")
    private int id;
    private String type;
    private Double price;
    private String[] paramArray;

    public TestType(TestTypeDto testTypeDto, IdGeneratorService idGeneratorService) {
        this.id = idGeneratorService.generateNextId("testTypes");
        this.type = testTypeDto.getType();
        this.price = testTypeDto.getPrice();
        this.paramArray = testTypeDto.getParamArray();
    }
}
