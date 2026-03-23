package com.lakshyatha.blooddonation.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.lakshyatha.blooddonation.entity.BloodRequest;
import com.lakshyatha.blooddonation.repository.BloodRequestRepository;

@RestController
@RequestMapping("/requests")
@CrossOrigin(origins = "*")
public class BloodRequestController {

    private final BloodRequestRepository bloodRequestRepository;

    public BloodRequestController(BloodRequestRepository bloodRequestRepository) {
        this.bloodRequestRepository = bloodRequestRepository;
    }

    // POST /requests — Create a new blood request
    @PostMapping
    public ResponseEntity<Map<String, Object>> createRequest(@RequestBody BloodRequest request) {
        Map<String, Object> response = new HashMap<>();

        // Validation
        if (request.getRequesterName() == null || request.getRequesterName().trim().isEmpty()) {
            response.put("success", false);
            response.put("message", "Requester name is required");
            return ResponseEntity.badRequest().body(response);
        }
        if (request.getBloodGroup() == null || request.getBloodGroup().trim().isEmpty()) {
            response.put("success", false);
            response.put("message", "Blood group is required");
            return ResponseEntity.badRequest().body(response);
        }
        if (request.getCity() == null || request.getCity().trim().isEmpty()) {
            response.put("success", false);
            response.put("message", "City is required");
            return ResponseEntity.badRequest().body(response);
        }
        if (request.getDonorPhone() == null || request.getDonorPhone().trim().isEmpty()) {
            response.put("success", false);
            response.put("message", "Donor phone number is required");
            return ResponseEntity.badRequest().body(response);
        }

        BloodRequest saved = bloodRequestRepository.save(request);

        response.put("success", true);
        response.put("message", "Blood request submitted successfully! The donor will be notified.");
        response.put("request", saved);
        return ResponseEntity.status(201).body(response);
    }

    // GET /requests — Get all requests
    @GetMapping
    public ResponseEntity<List<BloodRequest>> getAllRequests() {
        return ResponseEntity.ok(bloodRequestRepository.findAll());
    }

    // GET /requests/donor/{phone} — Get requests for a specific donor
    @GetMapping("/donor/{phone}")
    public ResponseEntity<List<BloodRequest>> getRequestsByDonor(@PathVariable String phone) {
        return ResponseEntity.ok(bloodRequestRepository.findByDonorPhone(phone));
    }

    // PUT /requests/{id}/status — Update request status
    @PutMapping("/{id}/status")
    public ResponseEntity<Map<String, Object>> updateStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> body) {
        Map<String, Object> response = new HashMap<>();

        return bloodRequestRepository.findById(id).map(req -> {
            String newStatus = body.get("status");
            if (newStatus == null || (!newStatus.equals("ACCEPTED") && !newStatus.equals("DECLINED") && !newStatus.equals("PENDING"))) {
                response.put("success", false);
                response.put("message", "Status must be PENDING, ACCEPTED, or DECLINED");
                return ResponseEntity.badRequest().body(response);
            }
            req.setStatus(newStatus);
            bloodRequestRepository.save(req);
            response.put("success", true);
            response.put("message", "Request status updated to " + newStatus);
            return ResponseEntity.ok(response);
        }).orElseGet(() -> {
            response.put("success", false);
            response.put("message", "Request not found");
            return ResponseEntity.status(404).body(response);
        });
    }
}
