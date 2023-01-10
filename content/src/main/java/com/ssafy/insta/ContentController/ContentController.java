package com.ssafy.insta.ContentController;


import com.ssafy.insta.Api.ResponseContent;
import com.ssafy.insta.Api.ResponsePath;
import com.ssafy.insta.dto.ContentDto;
import com.ssafy.insta.jpa.ContentEntity;
import com.ssafy.insta.service.ContentService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/content")
public class ContentController {
    ContentService contentService;
    @Autowired
    public ContentController(ContentService contentService) {
        this.contentService = contentService;
    }

    @ResponseBody
    @GetMapping("/check")
    public String check(){
        return "Hi";
    }

    //사진 등록
    @ResponseBody
    @PostMapping(value = "/" , consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity postContent(@RequestPart MultipartFile pic,  String title, String password) throws IOException {
        //dto에 담기
        ContentDto dto= ContentDto.builder()
                .pic(pic)
                .title(title)
                .password(password)
                .build();
        ContentEntity contentEntity =contentService.save(dto);
        ResponsePath respath= new ModelMapper().map(contentEntity, ResponsePath.class);

        return ResponseEntity.status(HttpStatus.OK).body(respath);
    }

    //전체 이미지 조회
//    @ResponseBody
    @GetMapping("/")
    public ResponseEntity getAllContents(){
        Iterable<ContentEntity> contentlist = contentService.getContentAll();
        List<ResponseContent> allContents= new ArrayList<>();
        contentlist.forEach(v -> allContents.add(new ModelMapper().map(v,ResponseContent.class)));
        return ResponseEntity.status(HttpStatus.OK).body(allContents);
    }

    //사진 수정
//    @ResponseBody
    @PutMapping(value = "/{uid}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity updateContent(@PathVariable long uid, @RequestPart MultipartFile pic, String title, String password ){
        ContentDto dto= ContentDto.builder()
                .pic(pic)
                .title(title)
                .password(password)
                .build();
        ContentEntity contentEntity =contentService.update(uid,dto);
        ResponsePath responsePath =new ModelMapper().map(contentEntity, ResponsePath.class);
        return ResponseEntity.status(HttpStatus.OK).body(responsePath);
    }

    //사진 삭제
//    @ResponseBody
    @DeleteMapping("/{uid}")
    public ResponseEntity deleteContent(@PathVariable long uid, String pwd){
        contentService.delete(uid, pwd);
        return ResponseEntity.status(HttpStatus.OK).body("삭제완료");
    }
}
