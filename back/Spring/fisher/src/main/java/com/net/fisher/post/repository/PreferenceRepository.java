package com.net.fisher.post.repository;

import com.net.fisher.post.entity.Post;
import com.net.fisher.post.entity.UserPreference;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.stream.Stream;

public interface PreferenceRepository extends JpaRepository<UserPreference, Long> {

    @Modifying
    @Query(value = "truncate table preferences", nativeQuery = true)
    void truncatePreference();

    @Query(value = "select p from preferences p")
    Stream<UserPreference> streamAll();
}
