package com.ssafy.insta.service;

import com.ssafy.insta.dto.ContentDto;
import com.ssafy.insta.jpa.ContentEntity;

public interface ContentService {
    //사진등록
    ContentEntity save(ContentDto dto);
    //모든 사진 조회
    Iterable<ContentEntity> getContentAll();
    ContentEntity update(long uid, ContentDto dto);
    void delete(long uid, String pwd);

}
