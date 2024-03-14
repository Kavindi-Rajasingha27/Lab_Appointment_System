package com.example.applabappointmentsystembackend.model;

import com.example.applabappointmentsystembackend.dto.ReportDto;
import com.example.applabappointmentsystembackend.service.IdGeneratorService.IdGeneratorService;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

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
    private int testId;
    private String content;

    public Report(int id, int testId, String content, IdGeneratorService idGeneratorService) {
        this.id = idGeneratorService.generateNextId("reports");
        this.testId = testId;
        this.content = content;
    }

    public Report(int testId, String content, IdGeneratorService idGeneratorService) {
        this.id = idGeneratorService.generateNextId("reports");
        this.testId = testId;
        this.content = content;
    }

    public Report(ReportDto reportDto, IdGeneratorService idGeneratorService) {
        this.id = idGeneratorService.generateNextId("reports");
        this.testId = reportDto.getTestId();
        this.content = reportDto.getContent();
    }

    public Report(ReportDto reportDto) {
        this.testId = reportDto.getTestId();
        this.content = reportDto.getContent();
    }
}
