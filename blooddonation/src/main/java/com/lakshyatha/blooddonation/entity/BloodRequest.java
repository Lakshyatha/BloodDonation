package com.lakshyatha.blooddonation.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "blood_requests")
public class BloodRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String requesterName;

    @Column(nullable = false)
    private String bloodGroup;

    @Column(nullable = false)
    private String city;

    private String message;

    @Column(nullable = false)
    private String donorPhone;

    @Column(nullable = false)
    private String status; // PENDING, ACCEPTED, DECLINED

    @Column(nullable = false)
    private LocalDateTime createdAt;

    public BloodRequest() {
        this.status = "PENDING";
        this.createdAt = LocalDateTime.now();
    }

    public BloodRequest(String requesterName, String bloodGroup, String city, String message, String donorPhone) {
        this();
        this.requesterName = requesterName;
        this.bloodGroup = bloodGroup;
        this.city = city;
        this.message = message;
        this.donorPhone = donorPhone;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getRequesterName() { return requesterName; }
    public void setRequesterName(String requesterName) { this.requesterName = requesterName; }

    public String getBloodGroup() { return bloodGroup; }
    public void setBloodGroup(String bloodGroup) { this.bloodGroup = bloodGroup; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getDonorPhone() { return donorPhone; }
    public void setDonorPhone(String donorPhone) { this.donorPhone = donorPhone; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
