package com.HealthPoint.controller.DoctorCollaborationController;

import java.util.*;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.*;

import com.HealthPoint.Dto.DoctorCollaborationDao.MedicalHistoryDTO;
import com.HealthPoint.service.DoctorCollaborationService.MedicalHistoryService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/history")
@RequiredArgsConstructor
public class MedicalHistoryController {

    private final MedicalHistoryService service;

    @PostMapping("/add")
    public ResponseEntity<?> addHistory(@Valid @RequestBody MedicalHistoryDTO dto, BindingResult bindingResult) {

        List<String> errorList = new ArrayList<>();

        if (bindingResult.hasErrors()) {
            for (ObjectError error : bindingResult.getAllErrors()) {
                errorList.add(error.getDefaultMessage());
            }
            return ResponseEntity.badRequest().body(Map.of("errors", errorList));
        }

        service.addMedicalHistory(dto);

        return ResponseEntity.ok(Map.of("message", "Medical history added successfully"));
    }
}