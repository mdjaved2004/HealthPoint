package com.HealthPoint.Dto.DoctorCollaborationDao;

import javax.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AppointmentCancelDto {
    @NotNull(message = "Appointment ID required")
    private Integer appointmentId;
}