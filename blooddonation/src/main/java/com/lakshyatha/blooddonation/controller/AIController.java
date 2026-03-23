package com.lakshyatha.blooddonation.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.lakshyatha.blooddonation.entity.Donor;
import com.lakshyatha.blooddonation.service.DonorService;

@RestController
@RequestMapping("/ai")
@CrossOrigin(origins = "*")
public class AIController {

    private final DonorService donorService;

    public AIController(DonorService donorService) {
        this.donorService = donorService;
    }

    // POST /ai/search → Natural language search
    @PostMapping("/search")
    public ResponseEntity<Map<String, Object>> naturalLanguageSearch(@RequestBody Map<String, String> body) {
        String query = body.get("query");
        if (query == null || query.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Query is required"));
        }

        List<Donor> donors = donorService.searchByNaturalLanguage(query);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Found " + donors.size() + " donors matching your request.");
        response.put("donors", donors);
        return ResponseEntity.ok(response);
    }

    // POST /ai/chat → Chatbot interactions
    @PostMapping("/chat")
    public ResponseEntity<Map<String, String>> chatbot(@RequestBody Map<String, String> body) {
        String message = body.getOrDefault("message", "").toLowerCase();
        String reply;

        if (message.contains("register") || message.contains("be a donor")) {
            reply = "You can register as a donor by navigating to our 'Register Donor' page from the top menu!";
        } else if (message.contains("find") || message.contains("search")) {
            reply = "You can search for donors by city or blood group via the 'View Donors' page, or use our Natural Language Search on the Home page.";
        } else if (message.contains("hello") || message.contains("hi")) {
            reply = "Hello! How can I assist you with your blood donation needs today?";
        } else if (message.contains("emergency")) {
            reply = "For emergencies, please use our Emergency Alert Generator to inform donors nearby.";
        } else if (message.contains("blood group") || message.contains("types")) {
            reply = "There are 8 main blood types: A+, A-, B+, B-, AB+, AB-, O+, O-. O- is the universal donor and AB+ is the universal receiver.";
        } else if (message.contains("thank")) {
            reply = "You're welcome! Every drop counts. 🩸";
        } else {
            reply = "I'm your BloodLink AI assistant. You can ask me about registering as a donor, finding donors, blood types, or emergency alerts!";
        }

        return ResponseEntity.ok(Map.of("reply", reply));
    }

    // POST /ai/alert → Emergency alert generator
    @PostMapping("/alert")
    public ResponseEntity<Map<String, String>> generateAlert(@RequestBody Map<String, String> body) {
        String patientName = body.getOrDefault("patientName", "Unknown");
        String bloodGroup = body.getOrDefault("bloodGroup", "Unknown");
        String hospitalName = body.getOrDefault("hospitalName", "Unknown");
        String city = body.getOrDefault("city", "Unknown");
        String contact = body.getOrDefault("contact", "Unknown");

        String alert = String.format(
            "🚨 URGENT BLOOD NEEDED 🚨\n\n" +
            "Patient: %s\n" +
            "Blood Group Required: %s\n" +
            "Hospital: %s\n" +
            "City: %s\n" +
            "Contact: %s\n\n" +
            "Please help save a life! Share this message widely.",
            patientName, bloodGroup, hospitalName, city, contact
        );

        return ResponseEntity.ok(Map.of("alert", alert));
    }
}
