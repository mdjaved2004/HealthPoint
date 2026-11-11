package com.HealthPoint.repo.DoctorCollaborationRepo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.HealthPoint.entity.DoctorCollaborationEntity.MedicalHistoryEntity;

public interface MedicalHistoryRepo 
        extends JpaRepository<MedicalHistoryEntity, Integer> {
}