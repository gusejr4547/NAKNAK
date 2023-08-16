package com.example.demo.dto;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class MemberDto {
    private String id;
    private String pwd;
    private String name;
    private String email;

    public MemberDto(String id, String pwd, String name, String email){
        this.id = id;
        this.pwd = pwd;
        this.name = name;
        this.email = email;
    }
}
