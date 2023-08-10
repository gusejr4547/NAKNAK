package com.net.fisher.fishinghole.repository;

import com.net.fisher.fishinghole.entity.FishingHole;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FishingHoleRepository extends JpaRepository<FishingHole,Long> {
    long countBy();
}
