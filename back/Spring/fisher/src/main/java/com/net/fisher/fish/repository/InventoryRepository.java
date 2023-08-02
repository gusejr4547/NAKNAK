package com.net.fisher.fish.repository;

import com.net.fisher.fish.entity.Inventory;
import com.net.fisher.member.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InventoryRepository extends JpaRepository<Inventory,Long> {
    Page<Inventory> getInventoriesByMember(Member member, Pageable pageable);
}
