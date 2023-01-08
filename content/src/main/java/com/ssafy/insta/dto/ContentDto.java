package com.ssafy.insta.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
public class ContentDto {
    private MultipartFile pic;
    private String title;
    private String password;

    @Builder
    public ContentDto(MultipartFile pic, String title, String password){
        this.pic=pic;
        this.title=title;
        this.password=password;
    }

}
