package com.net.fisher.member.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity(name = "member_images")
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
@Setter
@ToString
public class MemberImage {

    @Id
    @Column(name = "file_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long fileId;

    private String fileName;

    private long fileSize;

    private String fileContentType;

    private String fileUrl;

    @Column(nullable = false)
    @CreatedDate
    private LocalDateTime modifiedAt;
}
