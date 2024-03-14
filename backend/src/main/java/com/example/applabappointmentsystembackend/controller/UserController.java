package com.example.applabappointmentsystembackend.controller;

import com.example.applabappointmentsystembackend.dto.CommonResponse;
import com.example.applabappointmentsystembackend.dto.UserDto;
import com.example.applabappointmentsystembackend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/user")
@CrossOrigin
public class UserController {

    private final UserService userService;
    @PostMapping("/add")
    public ResponseEntity saveBook(@RequestBody UserDto user) {

        try {
            UserDto savedUser = userService.addUser(user);
            return ResponseEntity.ok(new CommonResponse<>(true, savedUser));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.ok(new CommonResponse<>(false, e.getMessage()));
        }
    }

}
