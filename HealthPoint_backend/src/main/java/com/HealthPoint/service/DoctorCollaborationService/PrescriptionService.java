package com.HealthPoint.service.DoctorCollaborationService;

import java.time.LocalDate;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.HealthPoint.Dto.DoctorCollaborationDao.PrescriptionDTO;
import com.HealthPoint.entity.DoctorCollaborationEntity.*;
import com.HealthPoint.repo.DoctorCollaborationRepo.*;

@Service
public class PrescriptionService {

    @Autowired
    private PrescriptionRepo prescriptionRepo;

    @Autowired
    private AppointmentRepo appointmentRepo;

    public String createPrescription(PrescriptionDTO dto) {

        // 1️⃣ Check appointment exists and belongs to doctor
        Optional<AppointmentEntity> optional =
                appointmentRepo.findByAppointmentIdAndDoctorId(
                        dto.getAppointmentId(),
                        dto.getDoctorId());

        if (optional.isEmpty()) {
            return "Invalid appointment or doctor mismatch";
        }

        AppointmentEntity appointment = optional.get();

        // 2️⃣ Check appointment status
        if (appointment.getStatus() != Status.CONFIRMED) {
            return "Prescription allowed only for CONFIRMED appointments";
        }

        // 3️⃣ Create Prescription
        PrescriptionEntity entity = new PrescriptionEntity();

        entity.setAppointmentId(dto.getAppointmentId());
        entity.setDoctorId(dto.getDoctorId());
        entity.setPatientId(dto.getPatientId());
        entity.setMedicineDetails(dto.getMedicineDetails());
        entity.setInstructions(dto.getInstructions());
        entity.setPrescriptionDate(LocalDate.now());

        prescriptionRepo.save(entity);

        // 4️⃣ Update Appointment Status → COMPLETED
        appointment.setStatus(Status.COMPLETED);
        appointmentRepo.save(appointment);

        return null;
    }
}