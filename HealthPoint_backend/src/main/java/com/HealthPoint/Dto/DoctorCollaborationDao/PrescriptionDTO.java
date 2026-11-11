package com.HealthPoint.Dto.DoctorCollaborationDao;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import lombok.Data;

@Data
public class PrescriptionDTO {

    @NotNull(message = "Appointment ID required")
    private Integer appointmentId;

    @NotNull(message = "Doctor ID required")
    private Integer doctorId;

    @NotNull(message = "Patient ID required")
    private Integer patientId;

    @NotBlank(message = "Medicine details required")
    private String medicineDetails;

    private String instructions;
}