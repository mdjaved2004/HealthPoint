package com.HealthPoint.Dto.DoctorCollaborationDao;

import java.time.LocalDateTime;

import javax.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AppointmentConformDto {

    @NotNull(message = "Appointment ID required")
    private Integer appointmentId;
    
    @NotNull(message = "Confirmed DateTime required")
    private LocalDateTime confirmedDateTime;
}