package com.net.fisher.fish.repository;

import com.net.fisher.fish.dto.InventoryDto;
import com.net.fisher.fish.entity.Inventory;
import com.net.fisher.member.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface InventoryRepository extends JpaRepository<Inventory,Long> {
    Page<Inventory> getInventoriesByMember(Member member, Pageable pageable);
    @Query("SELECT COUNT(c) as count, CASE WHEN COUNT(c) > 0 THEN MAX(c.size) ELSE 0 END AS maxSize FROM inventories c WHERE c.member.memberId = :memberId")
    InventoryDto.Info getInventoryInfo(long memberId);
}
