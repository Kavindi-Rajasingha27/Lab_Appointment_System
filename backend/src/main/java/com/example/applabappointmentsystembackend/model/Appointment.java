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
    private int patientId;
    private int doctorId;
    private Date dateTime;
    private String payStatus;

    public Appointment(AppointmentDto appointmentDto, IdGeneratorService idGeneratorService){
        this.id = idGeneratorService.generateNextId("appointments");
        this.patientId = appointmentDto.getPatientId();
        this.doctorId = appointmentDto.getDoctorId();
        this.dateTime = appointmentDto.getDateTime();
        this.payStatus = appointmentDto.getPayStatus();
    }
}
