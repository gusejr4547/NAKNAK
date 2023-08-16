package com.net.fisher.fish.repository;

import com.net.fisher.fish.entity.Fish;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface FishRepository extends JpaRepository<Fish,Long> {
<<<<<<< HEAD
    Optional<Fish> findByCode(String fishCode);

=======
    long countBy();

    Optional<Fish> findByCode(String fishCode);

    Optional<Fish> findByName(String name);

>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
    //SELECT * FROM BOOKS b RIGHT OUTER JOIN FISHES f ON b.FISH_ID = f.FISH_ID WHERE BOOKS_ID IS NOT NULL
    @Query("SELECT f,b.booksId FROM books b RIGHT OUTER JOIN fishes f ON f.fishId = b.fish.fishId WHERE b.booksId IS NOT NULL AND b.member.memberId = :memberId")
    List<Fish> booksCheck(long memberId);
}
