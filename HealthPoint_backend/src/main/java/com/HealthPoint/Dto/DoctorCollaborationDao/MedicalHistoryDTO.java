package com.HealthPoint.Dto.DoctorCollaborationDao;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import lombok.Data;

@Data
public class MedicalHistoryDTO {

    @NotNull(message = "Patient ID required")
    private Integer patientId;

    @NotNull(message = "Doctor ID required")
    private Integer doctorId;

    @NotBlank(message = "Disease name required")
    private String diseaseName;

    private String description;
}