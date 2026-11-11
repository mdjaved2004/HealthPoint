package com.HealthPoint.entity.DoctorCollaborationEntity;

import java.time.LocalTime;

import javax.validation.constraints.Size;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

@Data
@Entity
@Table(name = "doctor_profile")
public class DoctorProfileEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int doctorId;

    @Column(nullable = false)
    private int userId;

    @NotBlank
    @Size(min = 2, max = 100)
    @Column(nullable = false)
    private String specialization;

    @NotBlank
    @Size(min = 5, max = 50)
    @Column(nullable = false, unique = true)
    private String licenseNumber;

    private Integer experience;

    @Size(max = 500)
    private String description;

    @Size(min = 2, max = 150)
    private String hospitalName;

    private Integer fees;

    @Size(max = 100)
    private String languages; // "English,Hindi,Urdu"

    private LocalTime availableStartTime;
    private LocalTime availableEndTime;

    private Integer slotDuration;

    private Double rating = 0.0;

    private Boolean availability = true; // ✅ default true

}
