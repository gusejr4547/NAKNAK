package com.net.fisher.member.entity;

<<<<<<< HEAD
=======
import com.fasterxml.jackson.annotation.JsonFormat;
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
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
<<<<<<< HEAD
=======
    @JsonFormat(pattern = "yyyy-MM-dd kk:mm:ss")
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
    private LocalDateTime modifiedAt;
}
