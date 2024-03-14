package com.example.applabappointmentsystembackend.service;

import com.example.applabappointmentsystembackend.dto.AppointmentDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface AppointmentService {
    AppointmentDto addAppointment(AppointmentDto appointmentDto);
    AppointmentDto updateAppointment(AppointmentDto appointmentDto);
    void deleteAppointment(int appointmentId);
    AppointmentDto getAppointmentById(int appointmentId);
    List<AppointmentDto> getAllAppointments();

}
