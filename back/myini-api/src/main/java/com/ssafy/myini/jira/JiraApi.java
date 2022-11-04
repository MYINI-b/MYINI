package com.ssafy.myini.jira;

import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;

public class JiraApi {
    public static void getIssue() {
        try {
        HttpResponse<JsonNode> response = Unirest.get("https://ssafy.atlassian.net/rest/api/3/issue/S07P31B203-500")
                .basicAuth("rladnqls98@gmail.com", "ioMpUuv5sNoZZRzeiyKtD124")
                .header("Accept", "application/json")
                .asJson();
        System.out.println("지라결과 : "+response.getBody());
        }catch (Exception e){
            System.out.println("지라에러 = " + e);
        }
    }


}
