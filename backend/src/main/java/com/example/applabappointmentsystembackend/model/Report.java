package com.example.applabappointmentsystembackend.model;

import com.example.applabappointmentsystembackend.dto.ReportDto;
import com.example.applabappointmentsystembackend.service.IdGeneratorService.IdGeneratorService;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Map;

@Getter
@Setter
@ToString
@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "reports")
public class Report {
    @Id
    private int id;
    private String testType;
    private Map<String, Object> paramArray;
    private String description;
    private String paymentStatus;
    private int doctorId;
    private int patientId;
    private int technicianId;
    private int appointmentId;

    public Report(int id, String testType, Map<String, Object> paramArray, String description, String paymentStatus,
                  int doctorId, int patientId, int technicianId, int appointmentId, IdGeneratorService idGeneratorService) {
        this.id = idGeneratorService.generateNextId("reports");
        this.testType = testType;
        this.paramArray = paramArray;
        this.description = description;
        this.paymentStatus = paymentStatus;
        this.doctorId = doctorId;
        this.patientId = patientId;
        this.technicianId = technicianId;
        this.appointmentId = appointmentId;
    }

    public Report(String testType, Map<String, Object> paramArray, String description, String paymentStatus,
                  int doctorId, int patientId, int technicianId, int appointmentId, IdGeneratorService idGeneratorService) {
        this.id = idGeneratorService.generateNextId("reports");
        this.testType = testType;
        this.paramArray = paramArray;
        this.description = description;
        this.paymentStatus = paymentStatus;
        this.doctorId = doctorId;
        this.patientId = patientId;
        this.technicianId = technicianId;
        this.appointmentId = appointmentId;
    }

    public Report(ReportDto reportDto, IdGeneratorService idGeneratorService) {
        this.id = idGeneratorService.generateNextId("reports");
        this.testType = reportDto.getTestType();
        this.paramArray = reportDto.getParamArray();
        this.description = reportDto.getDescription();
        this.paymentStatus = reportDto.getPaymentStatus();
        this.doctorId = reportDto.getDoctorId();
        this.patientId = reportDto.getPatientId();
        this.technicianId = reportDto.getTechnicianId();
        this.appointmentId = reportDto.getAppointmentId();
    }

    public Report(ReportDto reportDto) {
        this.testType = reportDto.getTestType();
        this.paramArray = reportDto.getParamArray();
        this.description = reportDto.getDescription();
        this.paymentStatus = reportDto.getPaymentStatus();
        this.doctorId = reportDto.getDoctorId();
        this.patientId = reportDto.getPatientId();
        this.technicianId = reportDto.getTechnicianId();
        this.appointmentId = reportDto.getAppointmentId();
    }
}
