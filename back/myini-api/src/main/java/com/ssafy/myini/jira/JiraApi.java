package com.ssafy.myini.jira;

import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import com.ssafy.myini.jira.request.CreateJiraIssueRequest;
import com.ssafy.myini.requirementdocs.domain.Requirement;
import com.ssafy.myini.requirementdocs.response.JiraProjectListResponse;
import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

public class JiraApi {
    static class JiraUser {
        String userAccountId;
        String userName;

        public JiraUser(String userAccountId, String userName) {
            super();
            this.userAccountId = userAccountId;
            this.userName = userName;
        }
    }

    public static void getIssue() throws Exception{
        HttpResponse<JsonNode> response = Unirest.get("https://ssafy.atlassian.net/rest/api/2/issue/S07P31B203-500")
                .basicAuth("rladnqls98@gmail.com", "ioMpUuv5sNoZZRzeiyKtD124")
                .header("Accept", "application/json")
                .asJson();
        System.out.println("지라결과 : "+response.getBody());
    }

    public static List<JiraProjectListResponse> getProjectList(String jiraId, String jiraApiKey) throws Exception{
        HttpResponse<JsonNode> response = Unirest.get("https://ssafy.atlassian.net/rest/api/2/issue/createmeta")
                .basicAuth(jiraId, jiraApiKey)
                .header("Accept", "application/json")
                .asJson();

        JSONObject meta = response.getBody().getObject();
        JSONArray projects = (JSONArray) meta.get("projects");
        List<JiraProjectListResponse> jiraProjectListResponses = new ArrayList<>();

        for (int i = 0; i < projects.length(); i++) {
            String jiraProjectId = (String) ((JSONObject) projects.get(i)).get("id");
            String jiraProjectKey = (String) ((JSONObject) projects.get(i)).get("key");
            String jiraProjectName = (String) ((JSONObject) projects.get(i)).get("name");

            JiraProjectListResponse jiraProjectListResponse = new JiraProjectListResponse(jiraProjectId,jiraProjectKey,jiraProjectName);
            jiraProjectListResponses.add(jiraProjectListResponse);
        }

        return jiraProjectListResponses;
    }

    public static void createIssue(String jiraId, String jiraApiKey, List<Requirement> requirements, CreateJiraIssueRequest createJiraIssueRequest) throws Exception{
        //유저정보
        HttpResponse<JsonNode> userResponse = Unirest.get("https://ssafy.atlassian.net/rest/api/2/user/assignable/multiProjectSearch?projectKeys="+createJiraIssueRequest.getJiraProjectKey())
                .basicAuth(jiraId, jiraApiKey)
                .header("Accept", "application/json")
                .asJson();

        JSONArray users = userResponse.getBody().getArray();
        List<JiraUser> jiraUsers = new ArrayList<>();

        for (int i = 0; i < users.length(); i++) {
            String userAccountId = (String) ((JSONObject) users.get(i)).get("accountId");
            String userName = (String) ((JSONObject) users.get(i)).get("displayName");

            JiraUser jiraUser = new JiraUser(userAccountId, userName);
            jiraUsers.add(jiraUser);
        }

        //스토리포인트 정보
        HttpResponse<JsonNode> fieldResponse = Unirest.get("https://ssafy.atlassian.net/rest/api/2/field")
                .basicAuth(jiraId, jiraApiKey)
                .header("Accept", "application/json")
                .asJson();

        String storyPointField = "";

        JSONArray field = fieldResponse.getBody().getArray();
        for (int i = 0; i < field.length(); i++) {
            String fieldName = (String) ((JSONObject) field.get(i)).get("name");
            if(fieldName.equals("Story Points")){
                storyPointField = (String) ((JSONObject) field.get(i)).get("key");
                break;
            }
        }

        //이슈타입 정보
        HttpResponse<JsonNode> metaResponse = Unirest.get("https://ssafy.atlassian.net/rest/api/2/issue/createmeta")
                .basicAuth(jiraId, jiraApiKey)
                .header("Accept", "application/json")
                .asJson();

        String storyKey = "";

        JSONObject meta = metaResponse.getBody().getObject();
        JSONArray projects = (JSONArray) meta.get("projects");

        la:for (int i = 0; i < projects.length(); i++) {
            String projectKey = (String) ((JSONObject)projects.get(i)).get("key");
            JSONArray issueTypes = (JSONArray) (((JSONObject) projects.get(i)).get("issuetypes"));
            if(projectKey.equals(createJiraIssueRequest.getJiraProjectKey())) {
                for (int j = 0; j < issueTypes.length(); j++) {
                    String issueName = (String) ((JSONObject) issueTypes.get(j)).get("name");
                    if (issueName.equals("스토리")) {
                        storyKey = issueName;
                        break la;
                    }
                }
            }
        }

        for (Requirement requirement : requirements) {
            //등록
            JsonNodeFactory jnf = JsonNodeFactory.instance;
            ObjectNode payload = jnf.objectNode();

            {
                ObjectNode fields = payload.putObject("fields");
                {
                    //이슈제목
                    fields.put("summary", requirement.getRequirementName());
                    //이슈종류(스토리)
                    ObjectNode issuetype = fields.putObject("issuetype");
                    {
                        issuetype.put("id", storyKey);
                    }
                    //이슈프로젝트
                    ObjectNode project = fields.putObject("project");
                    {
                        project.put("id", createJiraIssueRequest.getJiraProjectKey());
                    }
                    //이슈설명
                    fields.put("description", requirement.getRequirementContent());
                    //이슈보고자
                    ObjectNode reporter = fields.putObject("reporter");
                    {
                        reporter.put("id", "5b10a2844c20165700ede21g");
                    }
                    //이슈우선순위
                    ObjectNode priority = fields.putObject("priority");
                    {
                        priority.put("id", "20000");
                    }
                    //이슈담당자
                    ObjectNode assignee = fields.putObject("assignee");
                    {
                        assignee.put("id", "5b109f2e9729b51b54dc274d");
                    }
                    //이슈스토리포인트
                    fields.put(storyPointField, requirement.getRequirementStoryPoint());
                }
            }
        }

//        System.out.println("지라결과 : "+s);
    }


}
