package com.example.applabappointmentsystembackend.service.impl;

import com.example.applabappointmentsystembackend.dto.ReportDto;
import com.example.applabappointmentsystembackend.dto.UserDto;
import com.example.applabappointmentsystembackend.model.Report;
import com.example.applabappointmentsystembackend.model.User;
import com.example.applabappointmentsystembackend.repository.ReportRepository;
import com.example.applabappointmentsystembackend.repository.UserRepository;
import com.example.applabappointmentsystembackend.service.IdGeneratorService.IdGeneratorService;
import com.example.applabappointmentsystembackend.service.ReportService;
import com.example.applabappointmentsystembackend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {

    private final IdGeneratorService idGeneratorService;

    private final ReportRepository reportRepository;

    @Override
    public ReportDto generateReport(ReportDto reportDto) {
            Report report = new Report(reportDto, idGeneratorService);
            reportRepository.save(report);
            return new ReportDto(report);
    }

    @Override
    public ReportDto updateReport(ReportDto updatedReportDto) {
        Report updatedReport = reportRepository.findById(updatedReportDto.getId()).map(existingReport -> {
            existingReport.setTestType(updatedReportDto.getTestType());
            existingReport.setParamArray(updatedReportDto.getParamArray());
            existingReport.setDescription(updatedReportDto.getDescription());
            existingReport.setDoctorId(updatedReportDto.getDoctorId());
            existingReport.setPatientId(updatedReportDto.getPatientId());
            existingReport.setAppointmentId(updatedReportDto.getAppointmentId());
            existingReport.setTechnitianId(updatedReportDto.getTechnitianId());
            existingReport.setPaymentStatus(updatedReportDto.getPaymentStatus());

            return reportRepository.save(existingReport);
        }).orElse(null);
        return new ReportDto(updatedReport);
    }

    @Override
    public void deleteReport(int reportId) {
        if (reportRepository.findById(reportId).isPresent()) {
            reportRepository.deleteById(reportId);
        }else {
            throw new IllegalStateException("Id is not found");
        }
    }

    @Override
    public ReportDto getReportById(int reportId) {
        return reportRepository.findById(reportId).map(ReportDto::new).orElse(null);
    }

    @Override
    public List<ReportDto> getAllReports() {
        return reportRepository.findAll().stream().map(ReportDto::new).collect(Collectors.toList());
    }
}
