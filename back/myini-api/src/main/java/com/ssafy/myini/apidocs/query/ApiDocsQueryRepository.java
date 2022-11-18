package com.ssafy.myini.apidocs.query;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.myini.apidocs.domain.*;
import com.ssafy.myini.apidocs.domain.type.DtoType;
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

    public ApiController findByApiControllerId(ApiController findApiController) {
        return queryFactory
                .selectFrom(apiController).distinct()
                .leftJoin(apiController.apis, api).fetchJoin()
                .where(apiController.eq(findApiController))
                .fetchOne();
    }

    public Api findByApiId(Api findApi) {
        return queryFactory
                .selectFrom(api).distinct()
                .leftJoin(api.pathVariables, pathVariable)
                .leftJoin(api.queryStrings, queryString)
                .leftJoin(api.dtos, dto)
                .where(api.eq(findApi))
                .fetchOne();
    }

    public Dto findByDtoId(Dto findDto) {
        return queryFactory
                .selectFrom(dto).distinct()
                .leftJoin(dto.dtoItems, dtoItem).fetchJoin()
                .where(dto.eq(findDto))
                .fetchOne();
    }

    public List<Dto> findByProjectId(Project findProject) {
        // 커스텀도 주기
        return queryFactory
                .selectFrom(dto)
                .leftJoin(dto.api, api)
                .leftJoin(api.apiController, apiController)
                .where((apiController.project.eq(findProject)
                        .and(dto.dtoType.eq(DtoType.RESPONSE)))
                        .or(dto.project.eq(findProject)
                                .and(dto.dtoType.eq(DtoType.DTO)))
                )
                .fetch();
    }

    public List<ApiController> findAll(Project findProject) {
        return queryFactory
                .selectFrom(apiController).distinct()
                .leftJoin(apiController.apis, api).fetchJoin()
                .leftJoin(api.pathVariables, pathVariable)
                .leftJoin(api.queryStrings, queryString)
                .leftJoin(api.dtos, dto)
                .where(apiController.project.eq(findProject))
                .fetch();
    }

    public List<Dto> findDtoClassTypeByProjectId(Project findProject) {
        return queryFactory
                .selectFrom(dto)
                .leftJoin(dto.api, api)
                .leftJoin(api.apiController, apiController)
                .where(dto.project.eq(findProject)
                        .and(dto.dtoType.eq(DtoType.DTO))
                )
                .fetch();
    }
}
