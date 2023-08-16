package com.net.fisher.member.entity;


import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity(name = "members")
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
@Setter
@ToString
public class Member {
    @Id
    @Column(name = "member_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long memberId;

    @Column(nullable = false, name="email")
    private String email;

    @Setter
    private String password;

    @Column(nullable = false)
    private String nickname;

    private String name;

    @Column
    private String address1;

    @Column
    private String address2;

    @Column
    private String phone;
/*
    @Column
    private String extImgUrl;*/

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    @Column(nullable = false,updatable = false)
    @CreatedDate
    private LocalDateTime registeredAt;

    @OneToOne(cascade = CascadeType.REMOVE/*,fetch = FetchType.EAGER*/)
    private MemberImage memberImage;


    public Member update(String name, String email){
        this.email = email;
        this.nickname = name;/*
        this.memberImage = new MemberImage();
        this.memberImage.setFileUrl(picture);*/
        return this;
    }
}
