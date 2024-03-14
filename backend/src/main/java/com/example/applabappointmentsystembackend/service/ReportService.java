package com.example.applabappointmentsystembackend.service;

import com.example.applabappointmentsystembackend.dto.ReportDto;
import com.example.applabappointmentsystembackend.dto.UserDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ReportService {
    ReportDto generateReport(ReportDto reportDto);
    ReportDto updateReport(ReportDto updatedReport);
    void deleteReport(int reportId);
    ReportDto getReportById(int reportId);
    List<ReportDto> getAllReports();
}
