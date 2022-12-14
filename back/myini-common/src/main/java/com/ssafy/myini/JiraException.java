package com.ssafy.myini;

public class JiraException  extends RuntimeException{
    public static final String JIRA_FAIL = "지라 이슈등록에 실패했습니다.";
    public static final String PROJECT_NOT_FOUND = "프로젝트 리스트 조회에 실패했습니다.";
    public static final String STORY_POINT_NOT_FOUND = "스토리 포인트 정보 조회에 실패했습니다.";
    public static final String SCREEN_INFO_NOT_FOUND = "스크린 정보 조회에 실패했습니다.";
    public static final String TAB_INFO_NOT_FOUND = "탭 정보 조회에 실패했습니다.";
    public static final String ISSUE_TYPE_NOT_FOUND = "이슈 타입 조회에 실패했습니다.";
    public static final String PROJECT_KEY_NOT_MATCH = "프로젝트 키가 일치하지 않습니다.";
    public static final String JIRA_MEMBER_FAIL = "지라 멤버를 가져오지 못했습니다.";
    public JiraException(String message) {
        super(message);
    }
}
