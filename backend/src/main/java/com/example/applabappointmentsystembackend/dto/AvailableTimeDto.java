package com.example.applabappointmentsystembackend.dto;

import com.example.applabappointmentsystembackend.model.AvailableTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AvailableTimeDto {
    private int id;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Boolean available;
    private int doctorId;

    public AvailableTimeDto(AvailableTime availableTime) {
        this.id = availableTime.getId();
        this.startTime = availableTime.getStartTime();
        this.endTime = availableTime.getEndTime();
        this.available = availableTime.getAvailable();
        this.doctorId = availableTime.getDoctorId();
    }
}
