package com.example.applabappointmentsystembackend.dto;

import com.example.applabappointmentsystembackend.model.Appointment;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AppointmentDto {
    private int id;
    private int patientId;
    private int doctorId;
    private Date dateTime;
    private String payStatus;

    public AppointmentDto(Appointment newAppointment) {
        this.id = newAppointment.getId();
        this.patientId = newAppointment.getPatientId();
        this.doctorId = newAppointment.getDoctorId();
        this.dateTime = newAppointment.getDateTime();
        this.payStatus = newAppointment.getPayStatus();
    }

}
