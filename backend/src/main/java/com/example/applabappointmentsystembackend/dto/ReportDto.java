package com.example.applabappointmentsystembackend.dto;

import com.example.applabappointmentsystembackend.model.Report;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ReportDto {
    private int id;
    private String testType;
    private Map<String, Object> paramArray;
    private String description;
    private String paymentStatus;
    private int doctorId;
    private int patientId;
    private int technicianId;
    private int appointmentId;

    public ReportDto(String testType, Map<String, Object> paramArray, String description, String paymentStatus,
                     int doctorId, int patientId, int technicianId, int appointmentId) {
        this.testType = testType;
        this.paramArray = paramArray;
        this.description = description;
        this.paymentStatus = paymentStatus;
        this.doctorId = doctorId;
        this.patientId = patientId;
        this.technicianId = technicianId;
        this.appointmentId = appointmentId;
    }

    public ReportDto(Report report) {
        this.id = report.getId();
        this.testType = report.getTestType();
        this.paramArray = report.getParamArray();
        this.description = report.getDescription();
        this.paymentStatus = report.getPaymentStatus();
        this.doctorId = report.getDoctorId();
        this.patientId = report.getPatientId();
        this.technicianId = report.getTechnicianId();
        this.appointmentId = report.getAppointmentId();
    }
}
