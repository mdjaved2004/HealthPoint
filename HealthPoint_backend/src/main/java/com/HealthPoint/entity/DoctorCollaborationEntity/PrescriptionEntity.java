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
@Table(name = "prescriptions")
public class PrescriptionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int prescriptionId;

    @Column(nullable = false)
    private int appointmentId;

    @Column(nullable = false)
    private int doctorId;

    @Column(nullable = false)
    private int patientId;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String medicineDetails;

    @Column(columnDefinition = "TEXT")
    private String instructions;

    @Column(nullable = false)
    private LocalDate prescriptionDate;
}