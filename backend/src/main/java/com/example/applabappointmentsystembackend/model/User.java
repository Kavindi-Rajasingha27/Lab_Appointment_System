package com.example.applabappointmentsystembackend.model;

import com.example.applabappointmentsystembackend.dto.UserDto;
import com.example.applabappointmentsystembackend.service.IdGeneratorService.IdGeneratorService;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@ToString
@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "users")
public class User {
    @Id
    private int id;
    private String firstName;
    private String lastName;
    private int age;
    private String gender;
    @Indexed(unique = true)
    private String email;
    private String password;
    private String mobile;
    private String address;
    private String role;

    public User(String firstName, String lastName, int age, String gender, String email, String password, String mobile, String address, String role, IdGeneratorService idGeneratorService) {
        this.id = idGeneratorService.generateNextId("users");
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

    public User(int id, String firstName, String lastName, int age, String gender, String email, String password, String mobile, String address, String role, IdGeneratorService idGeneratorService) {
        this.id = idGeneratorService.generateNextId("users");
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

    public User(UserDto userDto, IdGeneratorService idGeneratorService) {
        this.id = idGeneratorService.generateNextId("users");
        this.firstName = userDto.getFirstName();
        this.lastName = userDto.getLastName();
        this.age = userDto.getAge();
        this.gender = userDto.getGender();
        this.password = userDto.getPassword();
        this.email = userDto.getEmail();
        this.mobile = userDto.getMobile();
        this.address = userDto.getAddress();
        this.role = userDto.getRole();
    }

    public User(UserDto userDto) {
        this.firstName = userDto.getFirstName();
        this.lastName = userDto.getLastName();
        this.age = userDto.getAge();
        this.gender = userDto.getGender();
        this.email = userDto.getEmail();
        this.password = userDto.getPassword();
        this.mobile = userDto.getMobile();
        this.address = userDto.getAddress();
        this.role = userDto.getRole();
    }
}
