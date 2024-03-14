package com.example.applabappointmentsystembackend.controller;

import com.example.applabappointmentsystembackend.dto.AppointmentDto;
import com.example.applabappointmentsystembackend.dto.CommonResponse;
import com.example.applabappointmentsystembackend.service.AppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/appointment")
@CrossOrigin
public class AppointmentController {
    private final AppointmentService appointmentService;

    @PostMapping("/add")
    public ResponseEntity saveAppointment(@RequestBody AppointmentDto appointmentDto) {
        try{
           AppointmentDto savedAppointment = appointmentService.addAppointment(appointmentDto);
            return ResponseEntity.ok(new CommonResponse<>(true, "Appointment added successfully!", savedAppointment));
        } catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.ok(new CommonResponse<>(false, e.getMessage()));
        }
    }

    @PostMapping("/update")
    public ResponseEntity updateAppointment(@RequestBody AppointmentDto appointmentDto) {
        try {
            AppointmentDto appointment = appointmentService.updateAppointment(appointmentDto);
            return ResponseEntity.ok(new CommonResponse<>(true, "Appointment updated successfully!", appointment));
        } catch(Exception e) {
            return ResponseEntity.ok(new CommonResponse<>(false, e.getMessage()));
        }
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity deleteAppointment(@PathVariable(value = "id") int id) {
        try {
            appointmentService.deleteAppointment(id);
            return ResponseEntity.ok(new CommonResponse<>(true, "Appointment deleted successfully!"));
        } catch (Exception e){
            return ResponseEntity.ok(new CommonResponse<>(false, e.getMessage()));
        }
    }

    @GetMapping(value = "/all")
    public ResponseEntity allAppointments() {
        try {
            List<AppointmentDto> appointmentDtoList = appointmentService.getAllAppointments();
            return ResponseEntity.ok(new CommonResponse<>(true,"All Appointments", appointmentDtoList));
        } catch (Exception e) {
            return ResponseEntity.ok(new CommonResponse<>(false, e.getMessage()));

        }
    }

    @GetMapping(value = "/id/{id}")
    public ResponseEntity getAppointmentById(@PathVariable(value = "id") int id) {
        try {
            AppointmentDto appointment = appointmentService.getAppointmentById(id);
            String msg = (appointment == null) ? null : "Appointment" + id;
            return ResponseEntity.ok(new CommonResponse<>(true, msg, appointment));
        } catch (Exception e) {
            return ResponseEntity.ok(new CommonResponse<>(false, e.getMessage()));
        }
    }

    @GetMapping(value = "doctor/{doctorId}")
    public  ResponseEntity getAllAppointmentsByDoctor(@PathVariable(value = "doctorId") int doctorId) {
        try {
            List<AppointmentDto> appointmentList = appointmentService.getAllAppointmentsByDoctor(doctorId);
            return ResponseEntity.ok(new CommonResponse<>(true, "All Appointments By Doctor", appointmentList));
        } catch (Exception e) {
            return ResponseEntity.ok(new CommonResponse<>(false, e.getMessage()));
        }
    }
}
