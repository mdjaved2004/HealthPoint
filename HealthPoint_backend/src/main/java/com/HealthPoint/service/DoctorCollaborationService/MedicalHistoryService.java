package com.HealthPoint.service.DoctorCollaborationService;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.HealthPoint.Dto.DoctorCollaborationDao.MedicalHistoryDTO;
import com.HealthPoint.entity.DoctorCollaborationEntity.MedicalHistoryEntity;
import com.HealthPoint.repo.DoctorCollaborationRepo.MedicalHistoryRepo;

@Service
public class MedicalHistoryService {

    @Autowired
    private MedicalHistoryRepo repo;

    public String addMedicalHistory(MedicalHistoryDTO dto) {

        MedicalHistoryEntity entity = new MedicalHistoryEntity();

        entity.setPatientId(dto.getPatientId());
        entity.setDoctorId(dto.getDoctorId());
        entity.setDiseaseName(dto.getDiseaseName());
        entity.setDescription(dto.getDescription());

        entity.setRecordDate(LocalDate.now());

        repo.save(entity);

        return null;
    }
}