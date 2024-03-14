package com.example.applabappointmentsystembackend.service.impl;

import com.example.applabappointmentsystembackend.dto.UserDto;
import com.example.applabappointmentsystembackend.model.User;
import com.example.applabappointmentsystembackend.repository.UserRepository;
import com.example.applabappointmentsystembackend.service.IdGeneratorService.IdGeneratorService;
import com.example.applabappointmentsystembackend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final IdGeneratorService idGeneratorService;

    private final UserRepository userRepository;

    @Override
    public UserDto addUser(UserDto userDto) {
        User newUser = new User(userDto.getFullName(), idGeneratorService);
        userRepository.save(newUser);
        return new UserDto(newUser.getId(), newUser.getFullName());
    }
}
