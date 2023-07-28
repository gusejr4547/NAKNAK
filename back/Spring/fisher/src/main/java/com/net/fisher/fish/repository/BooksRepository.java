package com.net.fisher.fish.repository;

import com.net.fisher.fish.entity.Books;
import com.net.fisher.fish.entity.Fish;
import com.net.fisher.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface BooksRepository extends JpaRepository<Books,Long> {
    Books findByFishAndMember(Fish fish, Member member);

    @Query(value = "SELECT c FROM books c JOIN FETCH c.fish WHERE c.member.memberId = :memberId")
    List<Books> findBooksByMemberId(long memberId);
}

