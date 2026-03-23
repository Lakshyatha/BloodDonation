package com.lakshyatha.blooddonation.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.lakshyatha.blooddonation.repository.DonorRepository;
import com.lakshyatha.blooddonation.repository.UserRepository;
import com.lakshyatha.blooddonation.repository.BloodRequestRepository;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    private final UserRepository userRepository;
    private final DonorRepository donorRepository;
    private final BloodRequestRepository bloodRequestRepository;

    public AdminController(UserRepository userRepository, DonorRepository donorRepository, BloodRequestRepository bloodRequestRepository) {
        this.userRepository = userRepository;
        this.donorRepository = donorRepository;
        this.bloodRequestRepository = bloodRequestRepository;
    }

    // GET /admin/stats
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Long>> getSystemStats() {
        Map<String, Long> stats = new HashMap<>();
        stats.put("totalUsers", userRepository.count());
        stats.put("totalDonors", donorRepository.count());
        stats.put("totalRequests", bloodRequestRepository.count());
        return ResponseEntity.ok(stats);
    }
}
