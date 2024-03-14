package com.example.applabappointmentsystembackend.service.impl;

import com.example.applabappointmentsystembackend.dto.AppointmentDto;
import com.example.applabappointmentsystembackend.dto.UserDto;
import com.example.applabappointmentsystembackend.model.Appointment;
import com.example.applabappointmentsystembackend.repository.AppointmentRepository;
import com.example.applabappointmentsystembackend.service.AppointmentService;
import com.example.applabappointmentsystembackend.service.IdGeneratorService.IdGeneratorService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AppointmentServiceImpl implements AppointmentService {
    private final IdGeneratorService idGeneratorService;
    private final AppointmentRepository appointmentRepository;

    @Override
    public AppointmentDto addAppointment(AppointmentDto appointmentDto) {
        Appointment newAppointment = new Appointment(
                appointmentDto,
                idGeneratorService
                );
        appointmentRepository.save(newAppointment);
        return new AppointmentDto(newAppointment);
    }

    @Override
    public AppointmentDto updateAppointment(AppointmentDto appointmentDto){
        Appointment updatedAppointment = appointmentRepository.findById(appointmentDto.getId())
                .map(existingAppointment ->{
                    existingAppointment.setAppointmentNumber(appointmentDto.getAppointmentNumber());
                    existingAppointment.setDateTime(appointmentDto.getDateTime());
                    existingAppointment.setTestId(appointmentDto.getTestId());
                    existingAppointment.setPatientId(appointmentDto.getPatientId());
                    existingAppointment.setPayAmount(appointmentDto.getPayAmount());
                    existingAppointment.setPayStatus(appointmentDto.getPayStatus());

                    return appointmentRepository.save(existingAppointment);
                })
                .orElse(null);
        return new AppointmentDto(updatedAppointment);
    }

    @Override
    public void deleteAppointment(int appointmentId) {
        if (appointmentRepository.findById(appointmentId).isPresent()) {
            appointmentRepository.deleteById(appointmentId);
        } else {
            throw new IllegalStateException("Id is not found");
        }
    }

    @Override
    public AppointmentDto getAppointmentById(int appointmentId) {
        return  appointmentRepository.findById(appointmentId).map(AppointmentDto::new).orElse(null);
    }

    @Override
    public List<AppointmentDto> getAllAppointments() {
        return appointmentRepository.findAll().stream().map(AppointmentDto::new).collect(Collectors.toList());
    }
}
