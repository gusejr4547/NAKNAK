package com.net.fisher.fishinghole.repository;

import com.net.fisher.fishinghole.entity.FavoritePoint;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FavoritePointRepository extends JpaRepository<FavoritePoint,Long> {
}
