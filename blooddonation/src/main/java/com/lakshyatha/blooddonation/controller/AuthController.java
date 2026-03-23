package com.lakshyatha.blooddonation.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.lakshyatha.blooddonation.entity.User;
import com.lakshyatha.blooddonation.repository.UserRepository;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // POST /auth/signup
    @PostMapping("/signup")
    public ResponseEntity<Map<String, Object>> signup(@RequestBody User user) {
        Map<String, Object> response = new HashMap<>();

        if (user.getEmail() == null || user.getPassword() == null || user.getName() == null) {
            response.put("success", false);
            response.put("message", "All fields are required");
            return ResponseEntity.badRequest().body(response);
        }

        if (!user.getEmail().matches("^[a-zA-Z0-9._%+-]+@gmail\\.com$")) {
            response.put("success", false);
            response.put("message", "Only @gmail.com addresses are allowed");
            return ResponseEntity.badRequest().body(response);
        }

        if (userRepository.existsByEmail(user.getEmail())) {
            response.put("success", false);
            response.put("message", "Email already registered");
            return ResponseEntity.badRequest().body(response);
        }

        if ("admin@bloodlink.com".equals(user.getEmail())) {
            user.setRole("ADMIN");
        }
        User saved = userRepository.save(user);
        response.put("success", true);
        response.put("message", "Account created successfully");
        response.put("user", Map.of("id", saved.getId(), "name", saved.getName(), "email", saved.getEmail(), "role", saved.getRole()));
        return ResponseEntity.status(201).body(response);
    }

    // POST /auth/login
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> body) {
        Map<String, Object> response = new HashMap<>();
        String email = body.get("email");
        String password = body.get("password");

        if (email == null || password == null) {
            response.put("success", false);
            response.put("message", "Email and password are required");
            return ResponseEntity.badRequest().body(response);
        }

        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            response.put("success", false);
            response.put("message", "No account found with this email");
            return ResponseEntity.status(401).body(response);
        }

        User user = userOpt.get();
        if (!user.getPassword().equals(password)) {
            response.put("success", false);
            response.put("message", "Incorrect password");
            return ResponseEntity.status(401).body(response);
        }

        response.put("success", true);
        response.put("message", "Login successful");
        response.put("user", Map.of("id", user.getId(), "name", user.getName(), "email", user.getEmail(), "role", user.getRole()));
        return ResponseEntity.ok(response);
    }

    // POST /auth/reset-password
    @PostMapping("/reset-password")
    public ResponseEntity<Map<String, Object>> resetPassword(@RequestBody Map<String, String> body) {
        Map<String, Object> response = new HashMap<>();
        String email = body.get("email");
        String newPassword = body.get("newPassword");

        if (email == null || newPassword == null) {
            response.put("success", false);
            response.put("message", "Email and new password are required");
            return ResponseEntity.badRequest().body(response);
        }

        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            response.put("success", false);
            response.put("message", "No account found with this email");
            return ResponseEntity.status(404).body(response);
        }

        User user = userOpt.get();
        user.setPassword(newPassword);
        userRepository.save(user);

        response.put("success", true);
        response.put("message", "Password reset successfully");
        return ResponseEntity.ok(response);
    }
}
