package com.example.demo.entity;


import com.example.demo.dto.MemberDto;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

@Entity(name="t_member")

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Setter
@ToString
public class Member {
    @Id
    private String id;
    private String pwd;
    private String name;
    private String email;

    public String getName(){
        return name;
    }

    public String getEmail(){
        return email;
    }

    public MemberDto toDto(){
        MemberDto mem = new MemberDto(this.id, this.pwd, this.name, this.email);
        System.out.println(mem.toString());
        return mem;
    }

}
