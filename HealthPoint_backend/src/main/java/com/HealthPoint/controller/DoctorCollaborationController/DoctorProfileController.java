package com.HealthPoint.controller.DoctorCollaborationController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.HealthPoint.Dto.DoctorCollaborationDao.DoctorProfileDTO;
import com.HealthPoint.entity.DoctorCollaborationEntity.DoctorProfileEntity;
import com.HealthPoint.service.DoctorCollaborationService.DoctorProfileService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/doctor")
@RequiredArgsConstructor
public class DoctorProfileController {

    private final DoctorProfileService service;

    @PostMapping(value = "/doctorProfile", produces = "application/json")
    public ResponseEntity<?> addDoctorProfile(@Valid @RequestBody DoctorProfileDTO doctorDto, BindingResult bindingResult,
            HttpSession session) {
    	String email =null, message_error=null;
    	
    	List<String> errorList = new ArrayList<>();
        // Validation errors
        if (bindingResult.hasErrors()) {
            for (ObjectError error : bindingResult.getAllErrors()) {
                errorList.add(error.getDefaultMessage());
            }
            return ResponseEntity.badRequest().body(Map.of("errors", errorList));
        }
    	
    	email= (String)session.getAttribute("email");
    	
    	if(email ==null) {
    		errorList.add("You are not Login, Login First");
    		return ResponseEntity.badRequest().body(Map.of("errors", errorList)); 		
    	}
    	
    	message_error = service.addDoctorProfile(email, doctorDto);
    	
    	if(message_error==null) {
    		return ResponseEntity.ok(Map.of("message", "Successful to create account"));	 
    	}else {
    		errorList.add(message_error);
            return ResponseEntity.badRequest().body(Map.of("errors", errorList));
    	}
    }

    @GetMapping(value = "/getAllDoctors", produces = "application/json")
    public ResponseEntity<?> getAllDoctors() {
        try {
            List<DoctorProfileEntity> doctors = service.getAllDoctors();
            return ResponseEntity.ok(doctors);
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(Map.of("error", "Failed to fetch doctors: " + e.getMessage()));
        }
    }

    @GetMapping(value = "/searchDoctors", produces = "application/json")
    public ResponseEntity<?> searchDoctors(
            @RequestParam(required = false) String specialization,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String language,
            @RequestParam(required = false) Integer minFees,
            @RequestParam(required = false) Integer maxFees) {
        try {
            List<DoctorProfileEntity> doctors = service.searchDoctors(
                    specialization, location, language, minFees, maxFees);
            return ResponseEntity.ok(doctors);
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(Map.of("error", "Failed to search doctors: " + e.getMessage()));
        }
    }
}
