package com.HealthPoint.service.DoctorCollaborationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.HealthPoint.Dto.DoctorCollaborationDao.AppointmentConformDto;
import com.HealthPoint.entity.DoctorCollaborationEntity.AppointmentEntity;
import com.HealthPoint.entity.DoctorCollaborationEntity.Status;
import com.HealthPoint.repo.DoctorCollaborationRepo.AppointmentRepo;

@Service
public class AppointmentConformService {

    @Autowired
    private AppointmentRepo appointmentRepo;

    public String confirmAppointment(AppointmentConformDto dto) {

        AppointmentEntity appointment = appointmentRepo.findById(dto.getAppointmentId())
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        if (appointment.getStatus() != Status.PENDING) {
            return "Only PENDING appointments can be confirmed.";
        }

        appointment.setStatus(Status.CONFIRMED);

        appointment.setAppointmentConfirmedAt(dto.getConfirmedDateTime());

        appointmentRepo.save(appointment);

        return "Appointment confirmed successfully.";
    }
}