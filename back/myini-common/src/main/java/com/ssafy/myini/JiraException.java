package com.ssafy.myini;

public class JiraException  extends RuntimeException{
    public static final String JIRA_FAIL = "지라 이슈등록에 실패했습니다.";
    public JiraException(String message) {
        super(message);
    }
}
