package com.HealthPoint.controller.DoctorCollaborationController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.*;

import com.HealthPoint.Dto.DoctorCollaborationDao.AppointmentCancelDto;
import com.HealthPoint.service.DoctorCollaborationService.AppointmentCancelService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/appointment")
@RequiredArgsConstructor
public class AppointmentCancelController {

    private final AppointmentCancelService service;

    @PutMapping("/cancel")
    public ResponseEntity<?> cancel(@Valid @RequestBody AppointmentCancelDto dto,
                                    BindingResult bindingResult) {

        List<String> errorList = new ArrayList<>();

        if (bindingResult.hasErrors()) {
            for (ObjectError error : bindingResult.getAllErrors()) {
                errorList.add(error.getDefaultMessage());
            }
            return ResponseEntity.badRequest().body(Map.of("errors", errorList));
        }

        String message = service.cancelAppointment(dto);

        return ResponseEntity.ok(Map.of("message", message));
    }
}