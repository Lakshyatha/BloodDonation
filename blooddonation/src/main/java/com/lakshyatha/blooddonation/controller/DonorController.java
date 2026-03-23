package com.lakshyatha.blooddonation.controller;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.lakshyatha.blooddonation.entity.Donor;
import com.lakshyatha.blooddonation.service.DonorService;

@RestController
@RequestMapping("/donors")
@CrossOrigin(origins = "*")
public class DonorController {

    private final DonorService donorService;

    public DonorController(DonorService donorService) {
        this.donorService = donorService;
    }

    // POST /donors → Add donor
    @PostMapping
    public ResponseEntity<Donor> addDonor(@RequestBody Donor donor) {
        Donor saved = donorService.addDonor(donor);
        return ResponseEntity.status(201).body(saved);
    }

    // GET /donors → Get all donors
    @GetMapping
    public ResponseEntity<List<Donor>> getAllDonors() {
        return ResponseEntity.ok(donorService.getAllDonors());
    }

    // GET /donors/{id} → Get donor by ID
    @GetMapping("/{id}")
    public ResponseEntity<Donor> getDonorById(@PathVariable Long id) {
        return donorService.getDonorById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // GET /donors/blood/{group} → Filter by blood group
    @GetMapping("/blood/{group}")
    public ResponseEntity<List<Donor>> getDonorsByBloodGroup(@PathVariable String group) {
        return ResponseEntity.ok(donorService.getDonorsByBloodGroup(group));
    }

    // GET /donors/city/{city} → Filter by city
    @GetMapping("/city/{city}")
    public ResponseEntity<List<Donor>> getDonorsByCity(@PathVariable String city) {
        return ResponseEntity.ok(donorService.getDonorsByCity(city));
    }

    // PUT /donors/{id} → Update donor
    @PutMapping("/{id}")
    public ResponseEntity<?> updateDonor(@PathVariable Long id, @RequestBody Donor donor) {
        try {
            Donor updated = donorService.updateDonor(id, donor);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // DELETE /donors/{id} → Delete donor
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDonor(@PathVariable Long id) {
        try {
            donorService.deleteDonor(id);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Donor deleted successfully");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    // GET /donors/user/{userId} → Get donor by User ID
    @GetMapping("/user/{userId}")
    public ResponseEntity<Donor> getDonorByUserId(@PathVariable Long userId) {
        return donorService.getDonorByUserId(userId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
