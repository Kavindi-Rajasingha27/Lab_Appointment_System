package com.example.applabappointmentsystembackend.dto;

import com.example.applabappointmentsystembackend.model.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.jetbrains.annotations.NotNull;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
    private int id;
    private String firstName;
    private String lastName;
    private int age;
    private String gender;
    private String email;
    private String password;
    private String mobile;
    private String address;
    private String role;

    public UserDto(String firstName, String lastName, int age, String gender, String email, String password, String mobile, String address, String role) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.gender = gender;
        this.email = email;
        this.password = password;
        this.mobile = mobile;
        this.address = address;
        this.role = role;
    }

    public UserDto(User user) {
        this.id = user.getId();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.age = user.getAge();
        this.gender = user.getGender();
        this.email = user.getEmail();
        this.password = user.getPassword();
        this.mobile = user.getMobile();
        this.address = user.getAddress();
        this.role = user.getRole();
    }
}
