package com.lakshyatha.blooddonation.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import com.lakshyatha.blooddonation.entity.Donor;
import com.lakshyatha.blooddonation.repository.DonorRepository;

@Service
public class DonorService {

    private final DonorRepository donorRepository;

    public DonorService(DonorRepository donorRepository) {
        this.donorRepository = donorRepository;
    }

    public Donor addDonor(Donor donor) {
        // If user already registered as donor, update their record instead of creating duplicate
        if (donor.getUserId() != null) {
            Optional<Donor> existing = donorRepository.findByUserId(donor.getUserId());
            if (existing.isPresent()) {
                Donor existingDonor = existing.get();
                existingDonor.setName(donor.getName());
                existingDonor.setBloodGroup(donor.getBloodGroup());
                existingDonor.setPhone(donor.getPhone());
                existingDonor.setCity(donor.getCity());
                return donorRepository.save(existingDonor);
            }
        }
        return donorRepository.save(donor);
    }

    public List<Donor> getAllDonors() {
        return donorRepository.findAll();
    }

    public Optional<Donor> getDonorById(Long id) {
        return donorRepository.findById(id);
    }

    public Optional<Donor> getDonorByUserId(Long userId) {
        return donorRepository.findByUserId(userId);
    }

    public List<Donor> getDonorsByBloodGroup(String bloodGroup) {
        return donorRepository.findByBloodGroup(bloodGroup);
    }

    public List<Donor> getDonorsByCity(String city) {
        return donorRepository.findByCityContainingIgnoreCase(city);
    }

    public Donor updateDonor(Long id, Donor updatedDonor) {
        return donorRepository.findById(id).map(donor -> {
            if (updatedDonor.getName() != null) donor.setName(updatedDonor.getName());
            if (updatedDonor.getBloodGroup() != null) donor.setBloodGroup(updatedDonor.getBloodGroup());
            if (updatedDonor.getPhone() != null) donor.setPhone(updatedDonor.getPhone());
            if (updatedDonor.getCity() != null) donor.setCity(updatedDonor.getCity());
            return donorRepository.save(donor);
        }).orElseThrow(() -> new RuntimeException("Donor not found with id: " + id));
    }

    public void deleteDonor(Long id) {
        if (!donorRepository.existsById(id)) {
            throw new RuntimeException("Donor not found with id: " + id);
        }
        donorRepository.deleteById(id);
    }

    // AI: Natural language search
    public List<Donor> searchByNaturalLanguage(String query) {
        String[] bloodGroups = {"A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"};
        String targetGroup = null;
        String targetCity = null;

        for (String bg : bloodGroups) {
            if (query.contains(bg)) {
                targetGroup = bg;
                break;
            }
        }

        String lower = query.toLowerCase();
        if (lower.contains(" in ")) {
            String[] parts = lower.split(" in ");
            if (parts.length > 1) {
                targetCity = parts[1].trim().split("\\s+")[0]; // first word after "in"
            }
        }

        if (targetGroup != null && targetCity != null) {
            return donorRepository.findByBloodGroupAndCityContainingIgnoreCase(targetGroup, targetCity);
        } else if (targetGroup != null) {
            return donorRepository.findByBloodGroup(targetGroup);
        } else if (targetCity != null) {
            return donorRepository.findByCityContainingIgnoreCase(targetCity);
        }
        return donorRepository.findAll();
    }
}
