package com.example.applabappointmentsystembackend.service;

import com.example.applabappointmentsystembackend.dto.TestTypeDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface TestTypeService {
    TestTypeDto addTestType(TestTypeDto testTypeDto);
    TestTypeDto updateTestType(TestTypeDto testTypeDto);
    void deleteTestType(int testTypeId);
    TestTypeDto getTestTypeById(int testTypeId);
    List<TestTypeDto> getAllTestTypes();
}
