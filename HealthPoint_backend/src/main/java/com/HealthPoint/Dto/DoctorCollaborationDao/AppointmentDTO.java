package com.HealthPoint.Dto.DoctorCollaborationDao;

import javax.validation.constraints.NotNull;

import lombok.Data;

@Data
public class AppointmentDTO {

    @NotNull(message = "Patient ID required")
    private Integer patientId;

    @NotNull(message = "Doctor ID required")
    private Integer doctorId;
}