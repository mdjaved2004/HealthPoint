package com.HealthPoint.Dto.DoctorCollaborationDao;

import java.time.LocalDateTime;
import lombok.Data;

@Data
public class AppointmentGetDto {

    private Integer appointmentId;
    private Integer patientId;
    private Integer doctorId;
    private String status;
    private LocalDateTime appointmentCreatedAt;
}