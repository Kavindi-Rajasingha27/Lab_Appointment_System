package com.example.applabappointmentsystembackend.service;

import com.example.applabappointmentsystembackend.dto.LoginDTO;
import com.example.applabappointmentsystembackend.dto.UserDto;
import com.example.applabappointmentsystembackend.model.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface UserService {
    UserDto addUser(UserDto userDto);
    boolean isEmailUnique(String email);
    UserDto updateUser(UserDto updatedUser);
    void deleteUser(int userId);
    UserDto getUserById(int userId);
    UserDto getUserByEmail(String email);
    List<UserDto> getAllUsers();

    Optional<User> loginEmployee(LoginDTO loginDTO);
}
