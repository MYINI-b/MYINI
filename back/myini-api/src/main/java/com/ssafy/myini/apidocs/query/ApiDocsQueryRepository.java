package com.ssafy.myini.apidocs.query;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.myini.apidocs.domain.*;
import com.ssafy.myini.project.domain.Project;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;


import java.util.List;

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
                .selectFrom(apiController).distinct()
                .leftJoin(apiController.apis, api)
                .where(apiController.eq(findApiController))
                .fetchOne();
    }

    public Api findByApiId(Api findApi){
        return queryFactory
                .selectFrom(api).distinct()
                .leftJoin(api.pathVariables, pathVariable)
                .leftJoin(api.queryStrings, queryString)
                .leftJoin(api.dtos, dto)
                .where(api.eq(findApi))
                .fetchOne();
    }

    public Dto findByDtoId(Dto findDto){
        return queryFactory
                .selectFrom(dto).distinct()
                .leftJoin(dto.dtoItems, dtoItem)
                .where(dto.eq(findDto))
                .fetchOne();
    }

    public List<ApiController> findByProjectId(Project project){
        return queryFactory
                .selectFrom(apiController)
                .join(apiController, api.apiController).fetchJoin()
                .where(apiController.project.eq(project))
                .fetch();
    }
}
