package com.example.applabappointmentsystembackend.dto;

import com.example.applabappointmentsystembackend.model.Report;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ReportDto {
    private int id;
    private int testId;
    private String content;

    public ReportDto(int testId, String content) {
        this.testId = testId;
        this.content = content;
    }

    public ReportDto(Report report) {
        this.id = report.getId();
        this.testId = report.getTestId();
        this.content = report.getContent();
    }
}
