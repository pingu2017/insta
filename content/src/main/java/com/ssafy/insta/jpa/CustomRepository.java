package com.ssafy.insta.jpa;

import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Repository
public class CustomRepository {
    @PersistenceContext //영속성 컨텍스트
    private EntityManager em;

    public ContentEntity findByUid(long uid){
        return em.find(ContentEntity.class, uid);
    }
}
