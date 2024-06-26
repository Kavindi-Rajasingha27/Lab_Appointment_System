package com.example.applabappointmentsystembackend.service.impl;

import com.example.applabappointmentsystembackend.dto.LoginDTO;
import com.example.applabappointmentsystembackend.dto.UserDto;
import com.example.applabappointmentsystembackend.model.User;
import com.example.applabappointmentsystembackend.repository.UserRepository;
import com.example.applabappointmentsystembackend.service.IdGeneratorService.IdGeneratorService;
import com.example.applabappointmentsystembackend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.index.Index;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {



    private final UserRepository userRepository;

    @Override
    public UserDto addUser(UserDto userDto) {
        if (isEmailUnique(userDto.getEmail())) {
            User newUser = new User(userDto, IdGeneratorService.getInstance());
            userRepository.save(newUser);
            return new UserDto(newUser);
        } else {
            throw new IllegalArgumentException("Email is not unique");
        }
    }

    @Override
    public UserDto updateUser(UserDto updatedUserDto) {
        User existingUser = userRepository.findById(updatedUserDto.getId()).orElse(null);

        if (existingUser != null) {
            if (!existingUser.getEmail().equals(updatedUserDto.getEmail()) && !isEmailUniqueForUpdate(updatedUserDto.getEmail(), existingUser.getId())) {
                throw new IllegalArgumentException("Email is not unique");
            }

            existingUser.setFirstName(updatedUserDto.getFirstName());
            existingUser.setLastName(updatedUserDto.getLastName());
            existingUser.setAge(updatedUserDto.getAge());
            existingUser.setGender(updatedUserDto.getGender());
            existingUser.setEmail(updatedUserDto.getEmail());
            existingUser.setMobile(updatedUserDto.getMobile());
            existingUser.setAddress(updatedUserDto.getAddress());

            User updatedUser = userRepository.save(existingUser);
            return new UserDto(updatedUser);
        } else {
            throw new IllegalArgumentException("User not found");
        }
    }

    @Override
    public void deleteUser(int userId) {
        if(userRepository.findById(userId).isPresent()){
            userRepository.deleteById(userId);
        } else {
            throw new IllegalArgumentException("Id is not found");
        }
    }

    @Override
    public UserDto getUserById(int userId) {
        return userRepository.findById(userId).map(UserDto::new).orElse(null);
    }

    @Override
    public UserDto getUserByEmail(String email) {
        User user = userRepository.findByEmail(email);
        return user != null ? new UserDto(user) : null;
    }

    @Override
    public List<UserDto> getAllUsers() {
        return userRepository.findAll().stream().map(UserDto::new).collect(Collectors.toList());
    }

    private final PasswordEncoder passwordEncoder;
    @Override
    public Optional<User> loginEmployee(LoginDTO loginDTO) {
        String msg = "";
        User user = userRepository.findByEmail(loginDTO.getEmail());
        if (user != null) {
            String password = loginDTO.getPassword();
            String encodedPassword = user.getPassword();
            Boolean isPwdRight = passwordEncoder.matches(password, encodedPassword);
            if(isPwdRight){
                Optional<User> optionalUser = userRepository.findOneByEmailAndPassword(loginDTO.getEmail(), encodedPassword);
                if (optionalUser.isPresent()) {
                    User loggedInUser = optionalUser.get();
                    loggedInUser.setPassword(null);
                    return Optional.of(loggedInUser);
                }else {
                    return optionalUser;
                }
            }else {
                return Optional.empty();
            }
        }else {
            return Optional.empty();
        }
    }

    @Override
    public List<UserDto> getUserByRole(String role) {
        return userRepository.findAllByRole(role).stream().map(UserDto::new).collect(Collectors.toList());
    }

    @Override
    public boolean isEmailUnique(String email) {
        User existingUser = userRepository.findByEmail(email);
        return existingUser == null;
    }

    @Override
    public boolean isEmailUniqueForUpdate(String email, int userId) {
        User existingUser = userRepository.findByEmail(email);
        return existingUser == null || existingUser.getId() == userId;
    }

}
