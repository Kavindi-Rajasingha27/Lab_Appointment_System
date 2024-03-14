package com.example.applabappointmentsystembackend.service;

import com.example.applabappointmentsystembackend.dto.AvailableTimeDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface AvailableTimeService {
    AvailableTimeDto addAvailableTime(AvailableTimeDto availableTimeDto);

    AvailableTimeDto updateAvailableTime(AvailableTimeDto updatedAvailableTimeDto);

    void deleteAvailableTime(int availableTimeId);

    List<AvailableTimeDto> getAllAvailableTimesByDoctor(int doctorId);
}
