package com.example.applabappointmentsystembackend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
    private long id;
    private String fullName;

    public UserDto(String fullName) {
        this.fullName = fullName;
    }
}
