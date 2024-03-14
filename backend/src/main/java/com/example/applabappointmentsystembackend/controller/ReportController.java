package com.example.applabappointmentsystembackend.controller;

import com.example.applabappointmentsystembackend.dto.CommonResponse;
import com.example.applabappointmentsystembackend.dto.ReportDto;
import com.example.applabappointmentsystembackend.dto.UserDto;
import com.example.applabappointmentsystembackend.service.ReportService;
import com.example.applabappointmentsystembackend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/report")
@CrossOrigin
public class ReportController {

    private final ReportService reportService;
    @PostMapping("/generate")
    public ResponseEntity saveReport(@RequestBody ReportDto reportDto) {
        try {
            ReportDto report = reportService.generateReport(reportDto);
            return ResponseEntity.ok(new CommonResponse<>(true, "Report added successfully!", report));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.ok(new CommonResponse<>(false, e.getMessage()));
        }
    }

    @PostMapping("/update")
    public ResponseEntity updateReport(@RequestBody ReportDto reportDto) {
        try {
            ReportDto report = reportService.updateReport(reportDto);
            return ResponseEntity.ok(new CommonResponse<>(true, "Report updated successfully!", report));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.ok(new CommonResponse<>(false, e.getMessage()));
        }
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity deleteReport(@PathVariable(value = "id") int id) {
        try {
            reportService.deleteReport(id);
            return ResponseEntity.ok(new CommonResponse<>(true, "Report deleted successfully!"));
        } catch (Exception e) {
            return ResponseEntity.ok(new CommonResponse<>(false, e.getMessage()));
        }
    }

    @GetMapping(value = "/all")
    public ResponseEntity allReport() {
        try {
            List<ReportDto> reportDtoList = reportService.getAllReports();
            return ResponseEntity.ok(new CommonResponse<>(true,"All report", reportDtoList));
        } catch (Exception e) {
            return ResponseEntity.ok(new CommonResponse<>(false, e.getMessage()));
        }
    }

    @GetMapping(value = "/id/{id}")
    public ResponseEntity getReportById(@PathVariable(value = "id") int id) {
        try {
            ReportDto report = reportService.getReportById(id);
            String msg = report == null ? null: "Report " + id;
            return ResponseEntity.ok(new CommonResponse<>(true, msg, report));
        } catch (Exception e) {
            return ResponseEntity.ok(new CommonResponse<>(false, e.getMessage()));
        }
    }

}
