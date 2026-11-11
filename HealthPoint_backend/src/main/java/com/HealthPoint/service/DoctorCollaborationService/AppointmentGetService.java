package com.HealthPoint.service.DoctorCollaborationService;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.HealthPoint.Dto.DoctorCollaborationDao.AppointmentGetDto;
import com.HealthPoint.entity.DoctorCollaborationEntity.AppointmentEntity;
import com.HealthPoint.entity.DoctorCollaborationEntity.Status;
import com.HealthPoint.repo.DoctorCollaborationRepo.AppointmentRepo;

@Service
public class AppointmentGetService {

    @Autowired
    private AppointmentRepo appointmentRepo;

    public List<AppointmentGetDto> getPendingAppointments(Integer doctorId) {

        List<AppointmentEntity> list =
                appointmentRepo.findByDoctorIdAndStatus(doctorId, Status.PENDING);

        return list.stream().map(app -> {
            AppointmentGetDto dto = new AppointmentGetDto();
            dto.setAppointmentId(app.getAppointmentId());
            dto.setPatientId(app.getPatientId());
            dto.setDoctorId(app.getDoctorId());
            dto.setStatus(app.getStatus().name());
            dto.setAppointmentCreatedAt(app.getAppointmentCreatedAt());
            return dto;
        }).collect(Collectors.toList());
    }
}