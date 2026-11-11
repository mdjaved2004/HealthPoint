package com.HealthPoint.entity.DoctorCollaborationEntity;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name = "medical_history")
public class MedicalHistoryEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int historyId;

    @Column(nullable = false)
    private int patientId;

    @Column(nullable = false)
    private int doctorId;

    @Column(nullable = false)
    private String diseaseName;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private LocalDate recordDate;
}