package com.HealthPoint.Dto.DoctorCollaborationDao;

import java.time.LocalTime;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.Data;

@Data
public class DoctorProfileDTO {

    @NotBlank(message = "Specialization is required")
    @Size(min = 2, max = 100)
    private String specialization;

    @NotBlank(message = "License number is required")
    @Size(min = 5, max = 50)
    private String licenseNumber;

    @Min(value = 0, message = "Experience cannot be negative")
    private Integer experience;

    @Size(max = 500)
    private String description;

    @NotBlank(message = "Hospital name is required")
    private String hospitalName;

    @NotNull(message = "Fees is required")
    @Min(value = 0)
    private Integer fees;

    @NotBlank(message = "Languages are required")
    private String languages; // comma separated

    @NotNull(message = "Start time required")
    private LocalTime availableStartTime;

    @NotNull(message = "End time required")
    private LocalTime availableEndTime;

    @NotNull(message = "Slot duration required")
    @Min(value = 10)
    private Integer slotDuration;
}
