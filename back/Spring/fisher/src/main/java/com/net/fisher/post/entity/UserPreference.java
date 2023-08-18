package com.net.fisher.post.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity(name = "preferences")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
@ToString
public class UserPreference {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "preference_id")
    private long preferenceId;

    @Column(name = "member_id")
    private long memberId;

    @Column(name ="tag_id")
    private long tagId;

    @Column(name = "rating")
    private double rating;

    @Column(name="registered_at",updatable = false)
    @CreatedDate
    private LocalDateTime registeredAt;
}
