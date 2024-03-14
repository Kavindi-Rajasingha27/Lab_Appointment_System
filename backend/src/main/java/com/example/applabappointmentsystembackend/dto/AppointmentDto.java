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
    private String patientId;
    private String testId;
    private Date dateTime;
    private String appointmentNumber;
    private Double payAmount;
    private String payStatus;

    public AppointmentDto(Appointment newAppointment) {
        this.id = newAppointment.getId();
        this.patientId = newAppointment.getPatientId();
        this.testId = newAppointment.getTestId();
        this.dateTime = newAppointment.getDateTime();
        this.appointmentNumber = newAppointment.getAppointmentNumber();
        this.payAmount = newAppointment.getPayAmount();
        this.payStatus = newAppointment.getPayStatus();
    }

}
