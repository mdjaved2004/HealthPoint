package com.HealthPoint.Dto.DoctorCollaborationDao;

import lombok.Data;

@Data
public class DoctorInfoDto {

    private int doctorId;
    private String name;
    private String email;
    private String mobileNumber;
    private String specialization;
    private Integer experience;
    private Integer fees;
    private String hospitalName;
    private String languages;
    private Double rating;

    public DoctorInfoDto(int doctorId, String name, String email, String mobileNumber,
                         String specialization, Integer experience, Integer fees,
                         String hospitalName, String languages, Double rating) {

        this.doctorId = doctorId;
        this.name = name;
        this.email = email;
        this.mobileNumber = mobileNumber;
        this.specialization = specialization;
        this.experience = experience;
        this.fees = fees;
        this.hospitalName = hospitalName;
        this.languages = languages;
        this.rating = rating;
    }
}