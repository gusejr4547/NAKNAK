package com.net.fisher.fish.entity;

import com.net.fisher.fish.entity.Fish;
import com.net.fisher.member.entity.Member;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Fetch;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity(name = "books")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Books { // 누구의 도감에 무슨 물고기가 등록되었는지 관리하는 Junction Table
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "books_id")
    private long booksId;

    @ManyToOne
    @JoinColumn(name = "fish_id")
    private Fish fish;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(name = "max_size")
    private double maxSize;

    @Column(name = "get_date")
    private LocalDateTime getDate;

    @Column(name = "number")
    private int number;


    public LocalDateTime updateDate(){
        return this.getDate = LocalDateTime.now();//
    }

    public double updateMaxSize(double size){
        if(this.maxSize < size){
            this.maxSize = size;
        }
        return this.maxSize;
    }

    public int updateNumber(){
        this.number ++;
        return this.number;

    }
}
