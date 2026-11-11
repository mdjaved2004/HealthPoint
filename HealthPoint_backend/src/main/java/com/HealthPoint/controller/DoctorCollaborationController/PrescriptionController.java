package com.HealthPoint.controller.DoctorCollaborationController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.*;

import com.HealthPoint.Dto.DoctorCollaborationDao.PrescriptionDTO;
import com.HealthPoint.service.DoctorCollaborationService.PrescriptionService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/prescription")
@RequiredArgsConstructor
public class PrescriptionController {

    private final PrescriptionService service;

    @PostMapping("/create")
    public ResponseEntity<?> create(@Valid @RequestBody PrescriptionDTO dto,
                                    BindingResult bindingResult) {

        List<String> errorList = new ArrayList<>();

        if (bindingResult.hasErrors()) {
            for (ObjectError error : bindingResult.getAllErrors()) {
                errorList.add(error.getDefaultMessage());
            }
            return ResponseEntity.badRequest().body(Map.of("errors", errorList));
        }

        String message = service.createPrescription(dto);

        if (message != null) {
            errorList.add(message);
            return ResponseEntity.badRequest().body(Map.of("errors", errorList));
        }

        return ResponseEntity.ok(
                Map.of("message", "Prescription created & appointment completed"));
    }
}