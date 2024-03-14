package com.example.applabappointmentsystembackend.controller;

import com.example.applabappointmentsystembackend.dto.AvailableTimeDto;
import com.example.applabappointmentsystembackend.dto.CommonResponse;
import com.example.applabappointmentsystembackend.dto.UserDto;
import com.example.applabappointmentsystembackend.service.AvailableTimeService;
import com.example.applabappointmentsystembackend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/available-time")
@CrossOrigin
public class AvailableTimeController {

    private final AvailableTimeService availableTimeService;
    @PostMapping("/add")
    public ResponseEntity saveAvailableTime(@RequestBody AvailableTimeDto availableTimeDto) {
        try {
            AvailableTimeDto availableTime = availableTimeService.addAvailableTime(availableTimeDto);
            return ResponseEntity.ok(new CommonResponse<>(true, "Available time added successfully!", availableTime));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.ok(new CommonResponse<>(false, e.getMessage()));
        }
    }

    @PutMapping("/update")
    public ResponseEntity updateAvailableTime(@RequestBody AvailableTimeDto updatedAvailableTimeDto) {
        try {
            AvailableTimeDto updatedAvailableTime = availableTimeService.updateAvailableTime(updatedAvailableTimeDto);
            return ResponseEntity.ok(new CommonResponse<>(true, "Available time updated successfully!", updatedAvailableTime));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.ok(new CommonResponse<>(false, e.getMessage()));
        }
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity deleteAvailableTime(@PathVariable(value = "id") int id) {
        try {
            availableTimeService.deleteAvailableTime(id);
            return ResponseEntity.ok(new CommonResponse<>(true, "Available Time deleted successfully!"));
        } catch (Exception e){
            return ResponseEntity.ok(new CommonResponse<>(false, e.getMessage()));
        }
    }

    @GetMapping(value = "/doctor/{doctorId}")
    public ResponseEntity getAllAvailableTimesByDoctor(@PathVariable(value = "doctorId") int doctorId) {
        try {
            List<AvailableTimeDto> availableTimeList = availableTimeService.getAllAvailableTimesByDoctor(doctorId);
            return ResponseEntity.ok(new CommonResponse<>(true,"All Available Times", availableTimeList));
        } catch (Exception e) {
            return ResponseEntity.ok(new CommonResponse<>(false, e.getMessage()));
        }
    }
}
