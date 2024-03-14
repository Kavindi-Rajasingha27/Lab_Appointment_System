package com.example.applabappointmentsystembackend.service;

import com.example.applabappointmentsystembackend.dto.UserDto;
import org.springframework.stereotype.Service;

@Service
public interface UserService {
    UserDto addUser(UserDto userDto);
}
