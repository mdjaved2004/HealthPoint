package com.HealthPoint.repo.DoctorCollaborationRepo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.HealthPoint.Dto.DoctorCollaborationDao.DoctorInfoDto;
import com.HealthPoint.entity.DoctorCollaborationEntity.DoctorProfileEntity;

public interface DoctorProfileRepo extends JpaRepository<DoctorProfileEntity, Integer> {

    boolean existsByLicenseNumber(String licenseNumber);

    // All available doctors
    List<DoctorProfileEntity> findByAvailabilityTrue();

    // By specialization
    List<DoctorProfileEntity> findBySpecializationContainingIgnoreCaseAndAvailabilityTrue(String specialization);

    // By hospital
    List<DoctorProfileEntity> findByHospitalNameContainingIgnoreCaseAndAvailabilityTrue(String hospitalName);

    // Fees filters
    List<DoctorProfileEntity> findByFeesLessThanEqualAndAvailabilityTrue(Integer fees);

    List<DoctorProfileEntity> findByFeesGreaterThanEqualAndAvailabilityTrue(Integer fees);

    // Advanced filter
    @Query("SELECT d FROM DoctorProfileEntity d WHERE " +
           "d.availability = true AND " +
           "(:specialization IS NULL OR LOWER(d.specialization) LIKE LOWER(CONCAT('%', :specialization, '%'))) AND " +
           "(:location IS NULL OR LOWER(d.hospitalName) LIKE LOWER(CONCAT('%', :location, '%'))) AND " +
           "(:language IS NULL OR LOWER(d.languages) LIKE LOWER(CONCAT('%', :language, '%'))) AND " +
           "(:minFees IS NULL OR d.fees >= :minFees) AND " +
           "(:maxFees IS NULL OR d.fees <= :maxFees)")
    List<DoctorProfileEntity> findDoctorsByFilters(
            @Param("specialization") String specialization,
            @Param("location") String location,
            @Param("language") String language,
            @Param("minFees") Integer minFees,
            @Param("maxFees") Integer maxFees
    );

    // JOIN query to get doctor + user + contact info
    @Query("SELECT new com.HealthPoint.Dto.DoctorCollaborationDao.DoctorInfoDto(" +
           "d.doctorId, r.name, r.email, c.mobileNumber, " +
           "d.specialization, d.experience, d.fees, d.hospitalName, d.languages, d.rating) " +
           "FROM com.HealthPoint.entity.DoctorCollaborationEntity.DoctorProfileEntity d, " +
           "com.HealthPoint.entity.UserManagementEntity.UserRegisterLoginEntity r, " +
           "com.HealthPoint.entity.UserManagementEntity.UserContactdetailsEntity c " +
           "WHERE d.userId = r.userId AND r.userId = c.userRegisterLoginEntity.userId")
    List<DoctorInfoDto> getAllDoctorInfo();
}