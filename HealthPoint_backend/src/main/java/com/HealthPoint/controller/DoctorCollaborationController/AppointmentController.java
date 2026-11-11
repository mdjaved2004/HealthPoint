package com.HealthPoint.controller.DoctorCollaborationController;

import java.util.*;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.*;

import com.HealthPoint.Dto.DoctorCollaborationDao.AppointmentDTO;
import com.HealthPoint.service.DoctorCollaborationService.AppointmentService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/appointment")
@RequiredArgsConstructor
public class AppointmentController {

    private final AppointmentService service;

    @PostMapping("/book")
    public ResponseEntity<?> book(@Valid @RequestBody AppointmentDTO dto, BindingResult bindingResult) {

        List<String> errorList = new ArrayList<>();

        if (bindingResult.hasErrors()) {
            for (ObjectError error : bindingResult.getAllErrors()) {
                errorList.add(error.getDefaultMessage());
            }
            return ResponseEntity.badRequest().body(Map.of("errors", errorList));
        }
        
        service.bookAppointment(dto);

        return ResponseEntity.ok(Map.of("message", "Appointment booked successfully"));
    }
}