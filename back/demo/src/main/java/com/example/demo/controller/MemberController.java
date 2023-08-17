package com.example.demo.controller;


import com.example.demo.dto.MemberDto;
import com.example.demo.entity.Member;
import com.example.demo.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/api1")
public class MemberController {
    @Autowired
    private MemberRepository memberRepository;

    @PostMapping("/test")
    public Member createMember(@RequestBody Member member) {
        System.out.println("도착");
        return memberRepository.save(member);
    }

    @GetMapping("/{id}")
    public Member getMember(@PathVariable String id) {

        return memberRepository.findById(id).orElse(null);
    }
    @GetMapping("/try/{id}")
    public ResponseEntity<MemberDto> getMember2(@PathVariable String id) {
        return memberRepository.findById(id)
                .map(member -> {
                    // 레코드 정보 출력
                    System.out.println("Found member with ID: " + id);
                    System.out.println("Name: " + member.getName());
                    System.out.println("Email: " + member.getEmail());

                    return ResponseEntity.ok(member.toDto());
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/t")
    public void test(){
        System.out.println("도착");
    }

}