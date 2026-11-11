package com.HealthPoint.repo.DoctorCollaborationRepo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.HealthPoint.entity.DoctorCollaborationEntity.AppointmentEntity;
import com.HealthPoint.entity.DoctorCollaborationEntity.Status;

public interface AppointmentRepo extends JpaRepository<AppointmentEntity, Integer> {
	Optional<AppointmentEntity> 
	findByAppointmentIdAndDoctorId(int appointmentId, int doctorId);
	
	// Get all pending appointments for a doctor
    List<AppointmentEntity> findByDoctorIdAndStatus(Integer doctorId, Status status);
}