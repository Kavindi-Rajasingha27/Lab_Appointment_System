package com.example.applabappointmentsystembackend.controller;

import com.example.applabappointmentsystembackend.dto.AppointmentDto;
import com.example.applabappointmentsystembackend.dto.CommonResponse;
import com.example.applabappointmentsystembackend.dto.TestTypeDto;
import com.example.applabappointmentsystembackend.service.TestTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/testType")
@CrossOrigin
public class TestTypeController {
    private final TestTypeService testTypeService;

    @PostMapping("/add")
    public ResponseEntity saveTestType(@RequestBody TestTypeDto testTypeDto) {
        try{
            TestTypeDto savedTestType = testTypeService.addTestType(testTypeDto);
            return ResponseEntity.ok(new CommonResponse<>(true, "TestType added successfully!", savedTestType));
        } catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.ok(new CommonResponse<>(false, e.getMessage()));
        }
    }

    @PostMapping("/update")
    public ResponseEntity updateAppointment(@RequestBody TestTypeDto testTypeDto) {
        try {
            TestTypeDto testType = testTypeService.updateTestType(testTypeDto);
            return ResponseEntity.ok(new CommonResponse<>(true, "TestType updated successfully!", testType));
        } catch(Exception e) {
            return ResponseEntity.ok(new CommonResponse<>(false, e.getMessage()));
        }
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity deleteTestType(@PathVariable(value = "id") int id) {
        try {
            testTypeService.deleteTestType(id);
            return ResponseEntity.ok(new CommonResponse<>(true, "TestType deleted successfully!"));
        } catch (Exception e){
            return ResponseEntity.ok(new CommonResponse<>(false, e.getMessage()));
        }
    }

    @GetMapping(value = "/all")
    public ResponseEntity getAllTestTypes() {
        try {
            List<TestTypeDto> testTypeDtoList = testTypeService.getAllTestTypes();
            return ResponseEntity.ok(new CommonResponse<>(true,"All TestTypes", testTypeDtoList));
        } catch (Exception e) {
            return ResponseEntity.ok(new CommonResponse<>(false, e.getMessage()));

        }
    }

    @GetMapping(value = "/id/{id}")
    public ResponseEntity getTestTypeById(@PathVariable(value = "id") int id) {
        try {
            TestTypeDto testType = testTypeService.getTestTypeById(id);
            String msg = (testType == null) ? null : "TestType" + id;
            return ResponseEntity.ok(new CommonResponse<>(true, msg, testType));
        } catch (Exception e) {
            return ResponseEntity.ok(new CommonResponse<>(false, e.getMessage()));
        }
    }
}
