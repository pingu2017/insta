package com.ssafy.insta.jpa;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@Table(name = "Content")
public class ContentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //기본 키 생성을 DB에 위임하는 전략
    private long uid;
    private String path;
    @Column(nullable = false, length =50)
    private String title;
    private String save_title;
    @Column(nullable = false, length = 50)
    private String password;

    @Builder
    public ContentEntity(int uid, String path, String title, String save_title, String password){
        this.uid=uid;
        this.path=path;
        this.title=title;
        this.save_title=save_title;
        this.password=password;
    }
}
