package com.HealthPoint.entity.UserManagementEntity;

import java.time.LocalDate;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.HealthPoint.entity.DoctorCollaborationEntity.Gender;

import lombok.Data;

@Data
@Entity
@Table(name = "register")
public class UserRegisterLoginEntity {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userId;

	@Column(name = "name", nullable = false, length = 100)
	private String name;
	
    @Column(name = "email", nullable = false, unique = true, length = 100)
    private String email;

    @Column(name = "userName", nullable = true, length =250)
	private String userName;
    
    @Column(name = "joiningDate", nullable = false)
    private LocalDate joiningDate;
   
    @Column(name = "profileImage", nullable = true, length =250)
	private String profileImage;
    
    @Column(name = "password", nullable = false, length = 100)
    private String password;
    
    @Enumerated(EnumType.STRING)
    private Gender gender;
    
    @OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "userContactId", referencedColumnName = "userContactId")
	private UserContactdetailsEntity userContactId;
}
