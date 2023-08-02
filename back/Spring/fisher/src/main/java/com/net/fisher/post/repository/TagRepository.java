package com.net.fisher.post.repository;

import com.net.fisher.post.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TagRepository extends JpaRepository<Tag, Long> {

    Optional<Tag> findByTagName(String tagName);
    boolean existsTagByTagName(String tagName);
}
