package com.ssafy.myini.jira;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.ObjectMapper;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import com.ssafy.myini.JiraException;
import com.ssafy.myini.requirementdocs.domain.Requirement;
import com.ssafy.myini.requirementdocs.response.JiraProjectListResponse;
import org.json.JSONArray;
import org.json.JSONObject;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class JiraApi {
    public static class JiraUser {
        String userAccountId;
        String userName;
        String userEmailAddress;

        public JiraUser(String userAccountId, String userName, String userEmailAddress) {
            super();
            this.userAccountId = userAccountId;
            this.userName = userName;
            this.userEmailAddress = userEmailAddress;
        }

        public String getUserEmailAddress() {
            return userEmailAddress;
        }
    }

    public static List<JiraUser> getJiraUser(String jiraId, String jiraApiKey, String jiraDomain, String jiraProjectKey) throws Exception{
        HttpResponse<JsonNode> userResponse = Unirest.get("https://"+jiraDomain+".atlassian.net/rest/api/2/user/assignable/multiProjectSearch?projectKeys="+jiraProjectKey)
                .basicAuth(jiraId, jiraApiKey)
                .header("Accept", "application/json")
                .asJson();

        JSONArray users = userResponse.getBody().getArray();
        List<JiraUser> jiraUsers = new ArrayList<>();

        for (int i = 0; i < users.length(); i++) {
            String userAccountId = (String) ((JSONObject) users.get(i)).get("accountId");
            String userName = (String) ((JSONObject) users.get(i)).get("displayName");
            String userEmailAddress = (String) ((JSONObject) users.get(i)).get("emailAddress");

            JiraUser jiraUser = new JiraUser(userAccountId, userName, userEmailAddress);
            jiraUsers.add(jiraUser);
        }

        return jiraUsers;
    }

    public static List<JiraProjectListResponse> getProjectList(String jiraId, String jiraApiKey, String jiraDomain) throws Exception{
        HttpResponse<JsonNode> response = Unirest.get("https://"+jiraDomain+".atlassian.net/rest/api/2/issue/createmeta")
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

    public static void createIssue(String jiraId, String jiraApiKey, List<Requirement> requirements, String jiraDomain, String jiraProjectKey, String jiraProjectId) throws Exception{
        //유저정보 시작
        HttpResponse<JsonNode> userResponse = Unirest.get("https://"+jiraDomain+".atlassian.net/rest/api/2/user/assignable/multiProjectSearch?projectKeys="+jiraProjectKey)
                .basicAuth(jiraId, jiraApiKey)
                .header("Accept", "application/json")
                .asJson();

        JSONArray users = userResponse.getBody().getArray();
        List<JiraUser> jiraUsers = new ArrayList<>();

        for (int i = 0; i < users.length(); i++) {
            String userAccountId = (String) ((JSONObject) users.get(i)).get("accountId");
            String userName = (String) ((JSONObject) users.get(i)).get("displayName");
            String userEmailAddress = (String) ((JSONObject) users.get(i)).get("emailAddress");

            JiraUser jiraUser = new JiraUser(userAccountId, userName, userEmailAddress);
            jiraUsers.add(jiraUser);
        }
        //유저정보 끝

        //스토리포인트 정보 시작
        HttpResponse<JsonNode> fieldResponse = Unirest.get("https://"+jiraDomain+".atlassian.net/rest/api/2/field")
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
        //스토리포인트 정보 끝

        //이슈타입 정보 시작
        HttpResponse<JsonNode> metaResponse = Unirest.get("https://"+jiraDomain+".atlassian.net/rest/api/2/issue/createmeta")
                .basicAuth(jiraId, jiraApiKey)
                .header("Accept", "application/json")
                .asJson();

        String storyId = "";

        JSONObject meta = metaResponse.getBody().getObject();
        JSONArray projects = (JSONArray) meta.get("projects");

        la:for (int i = 0; i < projects.length(); i++) {
            String projectKey = (String) ((JSONObject)projects.get(i)).get("key");
            JSONArray issueTypes = (JSONArray) (((JSONObject) projects.get(i)).get("issuetypes"));
            if(projectKey.equals(jiraProjectKey)) {
                for (int j = 0; j < issueTypes.length(); j++) {
                    String issueName = (String) ((JSONObject) issueTypes.get(j)).get("name");
                    if (issueName.equals("스토리")) {
                        storyId = (String) ((JSONObject) issueTypes.get(j)).get("id");
                        break la;
                    }
                }
            }
        }

        if(storyId.equals("")) throw new JiraException(JiraException.JIRA_FAIL);
        //이슈타입 정보 끝

        //커스텀필드 스크린 입력 시작
        //스크린 정보 가져오기
        HttpResponse<JsonNode> screenResponse = Unirest.get("https://"+jiraDomain+".atlassian.net/rest/api/2/screens")
                .basicAuth(jiraId, jiraApiKey)
                .header("Accept", "application/json")
                .asJson();

        JSONObject screen = screenResponse.getBody().getObject();
        JSONArray values = (JSONArray) screen.get("values");

        Integer kanbanDefaultId = -1;
        for (int i = 0; i < values.length(); i++) {
            String name = (String) (((JSONObject) values.get(i)).get("name"));
            if(name.contains("Kanban") && name.contains("Default")){
                kanbanDefaultId = (Integer) (((JSONObject) values.get(i)).get("id"));
                break;
            }
        }

        if(kanbanDefaultId == -1) throw new JiraException(JiraException.JIRA_FAIL);

        //탭 정보 가져오기
        HttpResponse<JsonNode> tabsResponse = Unirest.get("https://"+jiraDomain+".atlassian.net/rest/api/2/screens/"+String.valueOf(kanbanDefaultId)+"/tabs")
                .basicAuth(jiraId, jiraApiKey)
                .header("Accept", "application/json")
                .asJson();

        JSONArray tabs = tabsResponse.getBody().getArray();
        Integer fieldTabId = -1;

        for (int i = 0; i < tabs.length(); i++) {
            String name = (String) (((JSONObject) tabs.get(i)).get("name"));
            if(name.equals("Field Tab")){
                fieldTabId = (Integer) (((JSONObject) tabs.get(i)).get("id"));
                break;
            }
        }

        if(fieldTabId == -1) throw new JiraException(JiraException.JIRA_FAIL);

        //스크린 탭에 스토리포인트 입력하기
        JsonNodeFactory spjnf = JsonNodeFactory.instance;
        ObjectNode sppayload = spjnf.objectNode();
        {
            sppayload.put("fieldId", storyPointField);
        }

        Unirest.setObjectMapper(new ObjectMapper() {
            private com.fasterxml.jackson.databind.ObjectMapper jacksonObjectMapper
                    = new com.fasterxml.jackson.databind.ObjectMapper();

            public <T> T readValue(String value, Class<T> valueType) {
                try {
                    return jacksonObjectMapper.readValue(value, valueType);
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }

            public String writeValue(Object value) {
                try {
                    return jacksonObjectMapper.writeValueAsString(value);
                } catch (JsonProcessingException e) {
                    throw new RuntimeException(e);
                }
            }
        });

        HttpResponse<JsonNode> storyPointAddResponse = Unirest.post("https://"+jiraDomain+".atlassian.net/rest/api/2/screens/"+kanbanDefaultId+"/tabs/"+fieldTabId+"/fields")
                .basicAuth(jiraId, jiraApiKey)
                .header("Accept", "application/json")
                .header("Content-Type", "application/json")
                .body(sppayload)
                .asJson();
        //커스텀필드 스크린 입력 끝


        //요구사항 - 스토리 연동 시작
        for (Requirement requirement : requirements) {
            String reportUser = "";
            for (JiraUser jiraUser : jiraUsers) {
                if(jiraUser.userEmailAddress.equals(requirement.getMember().getMemberJiraEmail())){
                    reportUser = jiraUser.userAccountId;
                    break;
                }
            };

            //등록
            JsonNodeFactory jnf = JsonNodeFactory.instance;
            ObjectNode payload = jnf.objectNode();
            {
                ObjectNode fields = payload.putObject("fields");
                {
                    //이슈제목
                    fields.put("summary", requirement.getRequirementPart()+"_"+requirement.getRequirementName());
                    //이슈종류(스토리)
                    ObjectNode issuetype = fields.putObject("issuetype");
                    {
                        issuetype.put("id", storyId);
                    }
                    //이슈프로젝트
                    ObjectNode project = fields.putObject("project");
                    {
                        project.put("id", jiraProjectId);
                    }
                    //이슈설명
                    fields.put("description", requirement.getRequirementContent());
                    //이슈보고자
                    ObjectNode reporter = fields.putObject("reporter");
                    {
                        reporter.put("id", reportUser);
                    }
                    //이슈우선순위
                    ObjectNode priority = fields.putObject("priority");
                    {
                        priority.put("id", String.valueOf(requirement.getRequirementPriority()));
                    }
                    //이슈담당자
                    ObjectNode assignee = fields.putObject("assignee");
                    {
                        assignee.put("id", reportUser);
                    }
                    //이슈스토리포인트
                    fields.put(storyPointField, requirement.getRequirementStoryPoint());
                }
            }

            Unirest.setObjectMapper(new ObjectMapper() {
                private com.fasterxml.jackson.databind.ObjectMapper jacksonObjectMapper
                        = new com.fasterxml.jackson.databind.ObjectMapper();

                public <T> T readValue(String value, Class<T> valueType) {
                    try {
                        return jacksonObjectMapper.readValue(value, valueType);
                    } catch (IOException e) {
                        throw new RuntimeException(e);
                    }
                }

                public String writeValue(Object value) {
                    try {
                        return jacksonObjectMapper.writeValueAsString(value);
                    } catch (JsonProcessingException e) {
                        throw new RuntimeException(e);
                    }
                }
            });

            HttpResponse<JsonNode> createIssueResponse = Unirest.post("https://"+jiraDomain+".atlassian.net/rest/api/2/issue")
                    .basicAuth(jiraId, jiraApiKey)
                    .header("Accept", "application/json")
                    .header("Content-Type", "application/json")
                    .body(payload)
                    .asJson();

        }

//        System.out.println("지라결과 : "+s);
    }


}
