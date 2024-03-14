package com.example.applabappointmentsystembackend.model;

import com.example.applabappointmentsystembackend.dto.AppointmentDto;
import com.example.applabappointmentsystembackend.service.IdGeneratorService.IdGeneratorService;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.Date;

@Getter
@Setter
@ToString
@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "appointments")
public class Appointment {
    @Id
    @Field(name = "_id")
    private int id;
    private String patientId;
    private String testId;
    private Date dateTime;
    private String appointmentNumber;
    private Double payAmount;
    private String payStatus;

    public Appointment(String patientId, String testId, Date dateTime, String appointmentNumber, IdGeneratorService idGeneratorService) {
        this.id = idGeneratorService.generateNextId("appointments");
        this.patientId = patientId;
        this.testId = testId;
        this.dateTime = dateTime;
        this.appointmentNumber = appointmentNumber;
    }

    public Appointment(AppointmentDto appointmentDto, IdGeneratorService idGeneratorService){
        this.id = idGeneratorService.generateNextId("appointments");
        this.patientId = appointmentDto.getPatientId();
        this.testId = appointmentDto.getTestId();
        this.dateTime = appointmentDto.getDateTime();
        this.payAmount = appointmentDto.getPayAmount();
        this.payStatus = appointmentDto.getPayStatus();
        this.appointmentNumber = appointmentDto.getAppointmentNumber();
    }
}
