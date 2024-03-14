package com.example.applabappointmentsystembackend.controller;

import com.example.applabappointmentsystembackend.dto.CommonResponse;
import com.example.applabappointmentsystembackend.dto.LoginDTO;
import com.example.applabappointmentsystembackend.dto.UserDto;
import com.example.applabappointmentsystembackend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/user")
@CrossOrigin
public class UserController {

    private final UserService userService;

    private final PasswordEncoder passwordEncoder;
    @PostMapping("/add")
    public ResponseEntity saveUser(@RequestBody UserDto userDto) {
        try {
            userDto.setPassword(this.passwordEncoder.encode(userDto.getPassword()));
            UserDto user = userService.addUser(userDto);
            return ResponseEntity.ok(new CommonResponse<>(true, "User added successfully!", user));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.ok(new CommonResponse<>(false, e.getMessage()));
        }
    }

    @PostMapping("/update")
    public ResponseEntity updateUser(@RequestBody UserDto userDto) {
        try {
            UserDto user = userService.updateUser(userDto);
            return ResponseEntity.ok(new CommonResponse<>(true, "User updated successfully!", user));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.ok(new CommonResponse<>(false, e.getMessage()));
        }
    }

    @DeleteMapping(value = "/delete/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity deleteUser(@PathVariable(value = "id") int id) {
        try {
            userService.deleteUser(id);
            return ResponseEntity.ok(new CommonResponse<>(true, "User deleted successfully!"));
        } catch (Exception e) {
            return ResponseEntity.ok(new CommonResponse<>(false, e.getMessage()));
        }
    }

    @GetMapping(value = "/all")
    public ResponseEntity allUser() {
        try {
            List<UserDto> userDtoList = userService.getAllUsers();
            return ResponseEntity.ok(new CommonResponse<>(true,"All users", userDtoList));
        } catch (Exception e) {
            return ResponseEntity.ok(new CommonResponse<>(false, e.getMessage()));
        }
    }

    @GetMapping(value = "/id/{id}")
    public ResponseEntity getUserById(@PathVariable(value = "id") int id) {
        try {
            UserDto user = userService.getUserById(id);
            String msg = user == null ? null: "User " + id;
            return ResponseEntity.ok(new CommonResponse<>(true, msg, user));
        } catch (Exception e) {
            return ResponseEntity.ok(new CommonResponse<>(false, e.getMessage()));
        }
    }

    @GetMapping(value = "/email/{email}")
    public ResponseEntity getUserByEmail(@PathVariable(value = "email") String email) {
        try {
            UserDto user = userService.getUserByEmail(email);
            String msg = user == null ? null: "User " + email;
            return ResponseEntity.ok(new CommonResponse<>(true, msg, user));
        } catch (Exception e) {
            return ResponseEntity.ok(new CommonResponse<>(false, e.getMessage()));
        }
    }
    @PostMapping("/login")
    public ResponseEntity authenticateUser(@RequestBody LoginDTO loginDTO) {
        try {
            Optional loginResponse = userService.loginEmployee(loginDTO);
            if (loginResponse.isPresent()) {
                return ResponseEntity.ok(new CommonResponse<>(true, loginResponse));
            }
            return ResponseEntity.ok(new CommonResponse<>(false, "Email or password incorrect"));
        } catch (Exception e) {
            return ResponseEntity.ok(new CommonResponse<>(false, e.getMessage()));
        }
    }

}
