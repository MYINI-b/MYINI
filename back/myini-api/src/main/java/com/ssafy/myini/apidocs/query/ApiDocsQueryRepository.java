package com.ssafy.myini.apidocs.query;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.myini.apidocs.domain.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;


import static com.ssafy.myini.apidocs.domain.QApi.api;
import static com.ssafy.myini.apidocs.domain.QApiController.apiController;
import static com.ssafy.myini.apidocs.domain.QDto.dto;
import static com.ssafy.myini.apidocs.domain.QDtoItem.dtoItem;
import static com.ssafy.myini.apidocs.domain.QPathVariable.pathVariable;
import static com.ssafy.myini.apidocs.domain.QQueryString.queryString;

@Repository
@RequiredArgsConstructor
public class ApiDocsQueryRepository {
    private final JPAQueryFactory queryFactory;

    public ApiController findByApiControllerId(ApiController findApiController){
        return queryFactory
                .selectFrom(apiController)
                .join(apiController, api.apiController).fetchJoin()
                .where(apiController.eq(findApiController))
                .fetchOne();
    }

    public Api findByApiId(Api findApi){
        return queryFactory
                .selectFrom(api)
                .leftJoin(api, pathVariable.api)
                .leftJoin(api, queryString.api)
                .leftJoin(api, dto.api)
                .where(api.eq(findApi))
                .fetchOne();
    }

    public Dto findByDtoId(Dto findDto){
        return queryFactory
                .selectFrom(dto)
                .join(dto, dtoItem.dto).fetchJoin()
                .where(dto.eq(findDto))
                .fetchOne();
    }

    public Dto findByProjectId(){
        return null;
    }
}
