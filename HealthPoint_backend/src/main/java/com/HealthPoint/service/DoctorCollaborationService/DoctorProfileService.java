package com.HealthPoint.service.DoctorCollaborationService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.HealthPoint.Dto.DoctorCollaborationDao.DoctorProfileDTO;
import com.HealthPoint.entity.DoctorCollaborationEntity.DoctorProfileEntity;
import com.HealthPoint.entity.UserManagementEntity.UserRegisterLoginEntity;
import com.HealthPoint.repo.DoctorCollaborationRepo.DoctorProfileRepo;
import com.HealthPoint.repo.UserManagementRepo.UserRepo;

@Service
public class DoctorProfileService{
	
	@Autowired
	private DoctorProfileRepo doctorRepo;

	@Autowired
	private UserRepo userRepo;
	
	public String addDoctorProfile(String email, DoctorProfileDTO dto) {

	    // Check email exists
	    if (!userRepo.existsByEmail(email)) {
	        return "User not found with given email";
	    }

	    // Get userId
	    UserRegisterLoginEntity user = userRepo.findByEmail(email).get();

		// Check duplicate license
	    if (doctorRepo.existsByLicenseNumber(dto.getLicenseNumber())) {
	        return "License number already exists";
	    }

	
	    //Map DTO → Entity
	    DoctorProfileEntity entity = new DoctorProfileEntity();   
	    entity.setUserId(user.getUserId());
	    entity.setSpecialization(dto.getSpecialization());
	    entity.setLicenseNumber(dto.getLicenseNumber());
	    entity.setExperience(dto.getExperience());
	    entity.setDescription(dto.getDescription());
	    entity.setHospitalName(dto.getHospitalName());
	    entity.setFees(dto.getFees());
	    entity.setLanguages(dto.getLanguages());
	    entity.setAvailableStartTime(dto.getAvailableStartTime());
	    entity.setAvailableEndTime(dto.getAvailableEndTime());
	    entity.setSlotDuration(dto.getSlotDuration());

	    // Defaults
	    entity.setAvailability(true);
	    entity.setRating(0.0);

	    //Save
	    doctorRepo.save(entity);

	    //Success
	    return null;
	}

	public List<DoctorProfileEntity> searchDoctors(String specialization, String location, String language, Integer minFees, Integer maxFees) {
		return doctorRepo.findDoctorsByFilters(specialization, location, language, minFees, maxFees);
	}

	public List<DoctorProfileEntity> getAllDoctors() {
		return doctorRepo.findByAvailabilityTrue();
	}
}
