package com.ssafy.myini.member;

import com.ssafy.myini.member.request.UpdateMemberJiraEmailRequest;
import com.ssafy.myini.member.response.CrewResponse;
import com.ssafy.myini.member.response.MemberInfoResponse;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

public class MemberFixture {

    public static final long ID = 1;
    public static final String EMAIL = "test@test.com";
    public static final String NICKNAME = "김싸피";
    public static final String PROFILE_IMG = "프로필이미지url";
    public static final Integer COUNT = 1;

    public static final MemberInfoResponse TEST_MEMBER_INFO_RESPONSE
            = new MemberInfoResponse(ID, NICKNAME, EMAIL, PROFILE_IMG, COUNT);

    public static final CrewResponse TEST_CREW_RESPONSE
            = new CrewResponse(2L, "이싸피", "profile");
    
    public static final CrewResponse TEST_CREW_RESPONSE2
            = new CrewResponse(3L, "박싸피", "profile");

    public static final MockMultipartFile TEST_FILE_REQUEST =
            new MockMultipartFile("img", "img.jpeg", "image/jpeg", "<<jpeg data>>".getBytes());

    public static final UpdateMemberJiraEmailRequest TEST_UPDATE_MEMBER_JIRA_EMAIL_REQUEST
            = new UpdateMemberJiraEmailRequest(EMAIL);
}
