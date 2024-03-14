package com.example.applabappointmentsystembackend.service.impl;

import com.example.applabappointmentsystembackend.dto.AppointmentDto;
import com.example.applabappointmentsystembackend.dto.TestTypeDto;
import com.example.applabappointmentsystembackend.model.TestType;
import com.example.applabappointmentsystembackend.repository.TestTypeRepository;
import com.example.applabappointmentsystembackend.service.IdGeneratorService.IdGeneratorService;
import com.example.applabappointmentsystembackend.service.TestTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TestTypeServiceImpl implements TestTypeService {
    private final TestTypeRepository testTypeRepository;

    @Override
    public TestTypeDto addTestType(TestTypeDto testTypeDto){
        TestType newTestType = new TestType(
                testTypeDto,
                IdGeneratorService.getInstance()
        );
        testTypeRepository.save(newTestType);
        return new TestTypeDto(newTestType);
    }

    @Override
    public TestTypeDto updateTestType(TestTypeDto testTypeDto){
        TestType updatedTestType = testTypeRepository.findById(testTypeDto.getId())
                .map(existingTestType ->{
                    existingTestType.setType(testTypeDto.getType());
                    existingTestType.setPrice(testTypeDto.getPrice());
                    existingTestType.setParamArray(testTypeDto.getParamArray());

                    return  testTypeRepository.save(existingTestType);
                })
                .orElse(null);
        return new TestTypeDto(updatedTestType);
    }

    @Override
    public void deleteTestType(int testTypeId){
        if (testTypeRepository.findById(testTypeId).isPresent()) {
            testTypeRepository.deleteById(testTypeId);
        } else {
            throw new IllegalStateException("Id is not found");
        }
    }

    @Override
    public TestTypeDto getTestTypeById(int testTypeId) {
        return  testTypeRepository.findById(testTypeId).map(TestTypeDto::new).orElse(null);
    }

    @Override
    public List<TestTypeDto> getAllTestTypes() {
        return testTypeRepository.findAll().stream().map(TestTypeDto::new).collect(Collectors.toList());
    }
}
