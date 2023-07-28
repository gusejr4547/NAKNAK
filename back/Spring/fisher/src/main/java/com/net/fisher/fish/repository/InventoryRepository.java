package com.net.fisher.fish.repository;

import com.net.fisher.fish.entity.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InventoryRepository extends JpaRepository<Inventory,Long> {
}
