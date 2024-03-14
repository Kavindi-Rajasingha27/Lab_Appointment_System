package com.example.applabappointmentsystembackend.model;

import com.example.applabappointmentsystembackend.dto.AvailableTimeDto;
import com.example.applabappointmentsystembackend.service.IdGeneratorService.IdGeneratorService;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.Date;

@Getter
@Setter
@ToString
@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "available-time")
public class AvailableTime {
    @Id
    private int id;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Boolean available;
    private int doctorId;

    public AvailableTime(AvailableTimeDto availableTimeDto, IdGeneratorService idGeneratorService) {
        this.id = idGeneratorService.generateNextId("available-time");
        this.startTime = availableTimeDto.getStartTime();
        this.endTime = availableTimeDto.getEndTime();
        this.available = availableTimeDto.getAvailable();
        this.doctorId = availableTimeDto.getDoctorId();
    }
}
