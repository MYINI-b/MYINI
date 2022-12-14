package com.ssafy.myini.member.response;

import com.ssafy.myini.member.domain.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CrewResponse {
    private Long memberId;
    private String memberNickname;
    private String memberProfileImg;

    public static CrewResponse from(Member member) {
        CrewResponse crewResponse = new CrewResponse();
        crewResponse.memberId = member.getMemberId();
        crewResponse.memberNickname = member.getMemberNickname();
        crewResponse.memberProfileImg = member.getMemberProfileImg();

        return crewResponse;
    }
}
