package com.HealthPoint.repo.DoctorCollaborationRepo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.HealthPoint.entity.DoctorCollaborationEntity.PrescriptionEntity;

public interface PrescriptionRepo extends JpaRepository<PrescriptionEntity, Integer> {
}