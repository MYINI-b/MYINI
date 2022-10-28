package com.ssafy.myini.initializer.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InitializerPossibleResponse {
    private Boolean isPossible;
    private String contents;
}
