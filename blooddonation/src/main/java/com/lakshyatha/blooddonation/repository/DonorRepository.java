package com.lakshyatha.blooddonation.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.lakshyatha.blooddonation.entity.Donor;

@Repository
public interface DonorRepository extends JpaRepository<Donor, Long> {

    List<Donor> findByBloodGroup(String bloodGroup);

    List<Donor> findByCityContainingIgnoreCase(String city);

    List<Donor> findByBloodGroupAndCityContainingIgnoreCase(String bloodGroup, String city);

    java.util.Optional<Donor> findByUserId(Long userId);
}
