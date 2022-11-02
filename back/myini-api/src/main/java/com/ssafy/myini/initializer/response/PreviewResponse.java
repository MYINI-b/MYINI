package com.ssafy.myini.initializer.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PreviewResponse {
    String fileCategory;
    String fileName;
    String contents;
}
