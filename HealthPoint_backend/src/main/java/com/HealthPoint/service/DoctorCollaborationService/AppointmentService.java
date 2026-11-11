package com.HealthPoint.service.DoctorCollaborationService;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.HealthPoint.Dto.DoctorCollaborationDao.AppointmentDTO;
import com.HealthPoint.entity.DoctorCollaborationEntity.AppointmentEntity;
import com.HealthPoint.entity.DoctorCollaborationEntity.Status;
import com.HealthPoint.repo.DoctorCollaborationRepo.AppointmentRepo;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepo appointmentRepo;

    public String bookAppointment(AppointmentDTO dto) {

        AppointmentEntity entity = new AppointmentEntity();

        entity.setPatientId(dto.getPatientId());
        entity.setDoctorId(dto.getDoctorId());

        // Set booking time automatically
        entity.setAppointmentCreatedAt(LocalDateTime.now());

        entity.setStatus(Status.PENDING);

        appointmentRepo.save(entity);

        return "Appointment booked successfully and waiting for confirmation.";
    }
}