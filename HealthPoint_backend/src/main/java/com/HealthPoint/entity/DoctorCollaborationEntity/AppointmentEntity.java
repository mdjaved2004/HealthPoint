package com.HealthPoint.entity.DoctorCollaborationEntity;

import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name = "appointments")
public class AppointmentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "appointment_id")
    private int appointmentId;

    @Column(name = "patient_id", nullable = false)
    private int patientId;

    @Column(name = "doctor_id", nullable = false)
    private int doctorId;

    // Appointment Status (PENDING, CONFIRMED, COMPLETED, CANCELLED)
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status = Status.PENDING;

    // When appointment was created (booking time)
    @Column(name = "appointment_created_at", nullable = false)
    private LocalDateTime appointmentCreatedAt;

    // When doctor confirmed
    @Column(name = "appointment_confirmed_at")
    private LocalDateTime appointmentConfirmedAt;

    // When appointment completed
    @Column(name = "appointment_completed_at")
    private LocalDateTime appointmentCompletedAt;

    // When appointment cancelled
    @Column(name = "appointment_cancelled_at")
    private LocalDateTime appointmentCancelledAt;  
    
}