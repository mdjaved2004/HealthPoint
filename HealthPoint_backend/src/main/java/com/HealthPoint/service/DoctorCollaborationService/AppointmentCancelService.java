package com.HealthPoint.service.DoctorCollaborationService;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.HealthPoint.Dto.DoctorCollaborationDao.AppointmentCancelDto;
import com.HealthPoint.entity.DoctorCollaborationEntity.AppointmentEntity;
import com.HealthPoint.entity.DoctorCollaborationEntity.Status;
import com.HealthPoint.repo.DoctorCollaborationRepo.AppointmentRepo;

@Service
public class AppointmentCancelService {

    @Autowired
    private AppointmentRepo appointmentRepo;

    public String cancelAppointment(AppointmentCancelDto dto) {

        AppointmentEntity appointment = appointmentRepo.findById(dto.getAppointmentId())
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        if (appointment.getStatus() != Status.PENDING &&
            appointment.getStatus() != Status.CONFIRMED) {
            return "Only PENDING or CONFIRMED appointments can be cancelled.";
        }

        appointment.setStatus(Status.CANCELLED);

        //DateTime set
        appointment.setAppointmentCancelledAt(LocalDateTime.now());

        appointmentRepo.save(appointment);

        return "Appointment cancelled successfully.";
    }
}