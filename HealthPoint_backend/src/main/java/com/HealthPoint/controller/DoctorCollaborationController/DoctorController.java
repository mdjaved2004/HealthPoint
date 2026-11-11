package com.HealthPoint.controller.DoctorCollaborationController;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.HealthPoint.Dto.DoctorCollaborationDao.DoctorInfoDto;
import com.HealthPoint.service.DoctorCollaborationService.DoctorService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/doctor")
@RequiredArgsConstructor
public class DoctorController {

    @Autowired
    private final DoctorService doctorService;

    @GetMapping(value = "/all", produces = "application/json")
    public ResponseEntity<?> getAllDoctors(){

        List<DoctorInfoDto> doctors = doctorService.getAllDoctors();

        return ResponseEntity.ok(Map.of("doctors", doctors));
    }
}