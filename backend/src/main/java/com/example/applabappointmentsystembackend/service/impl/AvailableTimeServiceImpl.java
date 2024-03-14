package com.example.applabappointmentsystembackend.service.impl;

import com.example.applabappointmentsystembackend.dto.AvailableTimeDto;
import com.example.applabappointmentsystembackend.dto.UserDto;
import com.example.applabappointmentsystembackend.model.AvailableTime;
import com.example.applabappointmentsystembackend.model.User;
import com.example.applabappointmentsystembackend.repository.AvailableTimeRepository;
import com.example.applabappointmentsystembackend.repository.UserRepository;
import com.example.applabappointmentsystembackend.service.AvailableTimeService;
import com.example.applabappointmentsystembackend.service.IdGeneratorService.IdGeneratorService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AvailableTimeServiceImpl implements AvailableTimeService {


    private final AvailableTimeRepository availableTimeRepository;
    @Override
    public AvailableTimeDto addAvailableTime(AvailableTimeDto availableTimeDto) {
        AvailableTime newAvailableTime = new AvailableTime(availableTimeDto, IdGeneratorService.getInstance());
        availableTimeRepository.save(newAvailableTime);
        return new AvailableTimeDto(newAvailableTime);
    }

    @Override
    public AvailableTimeDto updateAvailableTime(AvailableTimeDto updatedAvailableTimeDto) {
        if (availableTimeRepository.findById(updatedAvailableTimeDto.getId()).isPresent()) {
            AvailableTime updatedAvailableTime = availableTimeRepository.findById(updatedAvailableTimeDto.getId())
                    .map(existingAvailableTime -> {
                        existingAvailableTime.setStartTime(updatedAvailableTimeDto.getStartTime());
                        existingAvailableTime.setEndTime(updatedAvailableTimeDto.getEndTime());
                        existingAvailableTime.setAvailable(updatedAvailableTimeDto.getAvailable());
                        existingAvailableTime.setDoctorId(updatedAvailableTimeDto.getDoctorId());

                        return availableTimeRepository.save(existingAvailableTime);
                    })
                    .orElse(null);
            return new AvailableTimeDto(updatedAvailableTime);
        } else {
            throw new IllegalArgumentException("Id is not found");
        }
    }

    @Override
    public void deleteAvailableTime(int availableTimeId) {
        if (availableTimeRepository.findById(availableTimeId).isPresent()) {
            availableTimeRepository.deleteById(availableTimeId);
        } else {
            throw new IllegalStateException("Id is not found");
        }
    }

    @Override
    public List<AvailableTimeDto> getAllAvailableTimesByDoctor(int doctorId) {
        return availableTimeRepository.findAllByDoctorId(doctorId).stream().map(AvailableTimeDto::new).collect(Collectors.toList());
    }
}
