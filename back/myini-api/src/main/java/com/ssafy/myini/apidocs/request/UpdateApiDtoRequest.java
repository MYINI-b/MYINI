package com.ssafy.myini.apidocs.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateApiDtoRequest {
    private Long dtoId;
    private UpdateDtoRequest updateDtoRequest;

    private List<CreateDtoItemRequest> createDtoItemRequests;
    private List<UpdateApiDtoItemRequest> updateApiDtoItemRequests;
    private List<DeleteDtoItemRequest> deleteDtoItemRequests;
}
