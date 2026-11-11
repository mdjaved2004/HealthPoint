package com.HealthPoint.service.DoctorCollaborationService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.HealthPoint.Dto.DoctorCollaborationDao.DoctorInfoDto;
import com.HealthPoint.repo.DoctorCollaborationRepo.DoctorProfileRepo;

@Service
public class DoctorService {

    @Autowired
    private DoctorProfileRepo doctorRepo;

    public List<DoctorInfoDto> getAllDoctors() {
        return doctorRepo.getAllDoctorInfo();
    }
}