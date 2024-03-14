package com.example.applabappointmentsystembackend.dto;

import com.example.applabappointmentsystembackend.model.TestType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TestTypeDto {
    private int id;
    private String type;
    private Double price;
    private String[] paramArray;

    public  TestTypeDto(TestType newTestType) {
        this.id = newTestType.getId();
        this.type = newTestType.getType();
        this.price = newTestType.getPrice();
        this.paramArray = newTestType.getParamArray();
    }
}
