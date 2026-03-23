package com.lakshyatha.blooddonation.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.lakshyatha.blooddonation.entity.BloodRequest;

@Repository
public interface BloodRequestRepository extends JpaRepository<BloodRequest, Long> {
    List<BloodRequest> findByDonorPhone(String donorPhone);
    List<BloodRequest> findByRequesterName(String requesterName);
    List<BloodRequest> findByStatus(String status);
}
