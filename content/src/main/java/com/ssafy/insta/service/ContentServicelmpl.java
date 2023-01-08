package com.ssafy.insta.service;

import com.ssafy.insta.dto.ContentDto;
import com.ssafy.insta.jpa.ContentEntity;
import com.ssafy.insta.jpa.ContentRepository;
import com.ssafy.insta.jpa.CustomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@Service
public class ContentServicelmpl implements ContentService {

//    @Value("${file.dir}")
    private String fileDir;
    private ContentRepository contentRepository;
    private CustomRepository customRepository;

    @Autowired
    public ContentServicelmpl(ContentRepository contentRepository, CustomRepository customRepository) {
        this.contentRepository = contentRepository;
        this.customRepository = customRepository;
    }

    @Override
    public ContentEntity save(ContentDto dto) {
        MultipartFile file = dto.getPic();
        if (file.isEmpty()) {
            System.out.println("사진이 없습니다");
            return null;
        }
        System.out.println("사진이 있습니다");
        System.out.println("경로" + fileDir);
        //저장 디렉토리가 없을 경우 생성
        File folder = new File(fileDir);
        if (!folder.exists()) {
            try {
                folder.mkdir();
                System.out.println("폴더를 생성했습니다.");
            } catch (Exception e) {
                e.getStackTrace();
            }
        } else {
            System.out.println("기존 폴더 사용했습니다.");
        }

        String ori_name = file.getOriginalFilename();
        String uuid = UUID.randomUUID().toString();
        //확장자 추출
        String extension = ori_name.substring(ori_name.lastIndexOf("."));
        //title과 확장자 결합
        String saved_name = dto.getTitle() + extension;
        //파일을 불러올 때 사용할 경로(저장경로+파일명)
        String saved_path = fileDir + saved_name;
        ContentEntity contentEntity = ContentEntity.builder()
                .title(ori_name)
                .save_title(saved_name)
                .path(saved_path)
                .password(dto.getPassword())
                .build();
        //DB에 저장
        contentRepository.save(contentEntity);
        //실제 경로에 파일 복사
        try {
            file.transferTo(new File(saved_path));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        System.out.println("파일 저장 완료");
        return contentEntity;
    }

    @Override
    public Iterable<ContentEntity> getContentAll() {
        return contentRepository.findAll();
    }

    @Override
    public void delete(long uid, String pwd) {
        ContentEntity contentEntity = customRepository.findByUid(uid);
        if (contentEntity.getPassword().equals(pwd)) {
            File file = new File(fileDir + contentEntity.getSave_title());
            file.delete();
        }
        contentRepository.deleteById(uid);
    }

    @Override
    @Transactional
    public ContentEntity update(long uid, ContentDto dto) {
        boolean check = contentRepository.existsById(uid);
        if (check) {
            ContentEntity ori = customRepository.findByUid(uid);
            if (ori.getPassword().equals(dto.getPassword())) {
                delete(uid, dto.getPassword());
                ContentEntity new_contentEntitiy = save(dto);
                return new_contentEntitiy;
            } else return null;
        } else {
            System.out.println("존재하지 않습니다");
            return null;
        }
    }
}
