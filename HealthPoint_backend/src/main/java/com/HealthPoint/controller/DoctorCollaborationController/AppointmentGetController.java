package com.HealthPoint.controller.DoctorCollaborationController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.HealthPoint.Dto.DoctorCollaborationDao.AppointmentGetDto;
import com.HealthPoint.service.DoctorCollaborationService.AppointmentGetService;

@RestController
@RequestMapping("/doctor/appointments")
public class AppointmentGetController {

    @Autowired
    private AppointmentGetService appointmentGetService;

    @PostMapping("/pending")
    public List<AppointmentGetDto> getPendingAppointments(@RequestBody AppointmentGetDto request) {

        return appointmentGetService.getPendingAppointments(request.getDoctorId());
    }
}