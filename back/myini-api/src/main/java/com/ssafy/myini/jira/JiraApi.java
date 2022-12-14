package com.ssafy.myini.jira;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.ObjectMapper;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import com.ssafy.myini.JiraException;
import com.ssafy.myini.requirementdocs.domain.Requirement;
import com.ssafy.myini.requirementdocs.domain.RequirementCategory;
import com.ssafy.myini.requirementdocs.response.JiraProjectListResponse;
import org.json.JSONArray;
import org.json.JSONObject;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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

    public static class EpicIssue {
        String epicId;
        String epicName;

        public EpicIssue(String epicId, String epicName) {
            this.epicId = epicId;
            this.epicName = epicName;
        }

        public void setEpicId(String epicId) {
            this.epicId = epicId;
        }

        @Override
        public String toString() {
            return "EpicIssue{" +
                    "epicId='" + epicId + '\'' +
                    ", epicName='" + epicName + '\'' +
                    '}';
        }
    }

    private static HttpResponse<JsonNode> get(String url, String jiraId, String jiraApiKey) throws UnirestException {
        return Unirest.get(url)
                .basicAuth(jiraId, jiraApiKey)
                .header("Accept", "application/json")
                .asJson();
    }

    public static List<JiraUser> getJiraUser(String jiraId, String jiraApiKey, String jiraDomain, String jiraProjectKey) throws Exception {
        JSONArray users = get("https://" + jiraDomain + ".atlassian.net/rest/api/2/user/assignable/multiProjectSearch?projectKeys=" + jiraProjectKey, jiraId, jiraApiKey)
                .getBody().getArray();
        List<JiraUser> jiraUsers = new ArrayList<>();

        for (Object obj : users) {
            JSONObject user = (JSONObject) obj;

            jiraUsers.add(new JiraUser(
                    (String) user.get("accountId"),
                    (String) user.get("displayName"),
                    (String) user.get("emailAddress")));
        }

        return jiraUsers;
    }

    public static List<JiraProjectListResponse> getProjectList(String jiraId, String jiraApiKey, String jiraDomain) throws Exception {
        JSONArray projects = (JSONArray) (get("https://" + jiraDomain + ".atlassian.net/rest/api/2/issue/createmeta", jiraId, jiraApiKey)
                .getBody().getObject()).get("projects");
        List<JiraProjectListResponse> jiraProjectListResponses = new ArrayList<>();

        for (Object obj : projects) {
            JSONObject project = (JSONObject) obj;

            jiraProjectListResponses.add(new JiraProjectListResponse(
                    (String) project.get("id"),
                    (String) project.get("key"),
                    (String) project.get("name")
            ));
        }

        return jiraProjectListResponses;
    }

    public static void createIssue(String jiraId, String jiraApiKey, List<Requirement> requirements, List<RequirementCategory> requirementCategories, String jiraDomain, String jiraProjectKey, String jiraProjectId) throws Exception {
        //???????????? ??????
        List<JiraUser> jiraUsers = getJiraUser(jiraId, jiraApiKey, jiraDomain, jiraProjectKey);
        //???????????? ???

        //?????????????????? ?????? ??????
        String storyPointField = "";

        JSONArray fieldArray = get("https://" + jiraDomain + ".atlassian.net/rest/api/2/field", jiraId, jiraApiKey)
                .getBody().getArray();
        for (Object obj : fieldArray) {
            JSONObject field = (JSONObject) obj;
            if ((field.get("name")).equals("Story Points")) {
                storyPointField = (String) (field.get("key"));
            }
        }
        if (storyPointField.isEmpty()) throw new JiraException(JiraException.STORY_POINT_NOT_FOUND);
        //?????????????????? ?????? ???

        //??????????????? ????????? ?????? ??????
        //????????? ?????? ????????????
        JSONArray values = (JSONArray) get("https://" + jiraDomain + ".atlassian.net/rest/api/2/screens", jiraId, jiraApiKey)
                .getBody().getObject().get("values");

        Integer kanbanDefaultId = -1;

        for (Object obj : values) {
            JSONObject value = (JSONObject) obj;
            String name = (String) value.get("name");

            if (name.contains("Kanban") && name.contains("Default")) {
                kanbanDefaultId = (Integer) value.get("id");
            }
        }

        if (kanbanDefaultId == -1) throw new JiraException(JiraException.SCREEN_INFO_NOT_FOUND);

        //??? ?????? ????????????
        JSONArray tabs = get("https://" + jiraDomain + ".atlassian.net/rest/api/2/screens/" + kanbanDefaultId + "/tabs", jiraId, jiraApiKey)
                .getBody().getArray();
        Integer fieldTabId = -1;

        for (Object obj : tabs) {
            JSONObject tab = (JSONObject) obj;

            if (tab.get("name").equals("Field Tab")) {
                fieldTabId = (Integer) (tab.get("id"));
                break;
            }
        }
        if (fieldTabId == -1) throw new JiraException(JiraException.TAB_INFO_NOT_FOUND);

        //????????? ?????? ?????????????????? ????????????
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
        //??????????????? ????????? ?????? ???
        //???????????? ?????? ??????
        String storyId = "";
        String epicId = "";

        JSONObject projectInfo = (JSONObject) ((JSONArray) get("https://" + jiraDomain + ".atlassian.net/rest/api/2/issue/createmeta", jiraId, jiraApiKey)
                .getBody().getObject().get("projects")).get(0);

        if (!projectInfo.get("key").equals(jiraProjectKey)) {
            throw new JiraException(JiraException.PROJECT_KEY_NOT_MATCH);
        }
        JSONArray issueTypes = (JSONArray) ((projectInfo.get("issuetypes")));

        for (Object obj : issueTypes) {
            JSONObject issueType = (JSONObject) obj;
            String name = (String) issueType.get("name");
            if (name.equals("?????????")) {
                storyId = (String) issueType.get("id");
            } else if (name.equals("??????")) {
                epicId = (String) issueType.get("id");
            }
        }
        if (storyId.isEmpty()) throw new JiraException(JiraException.ISSUE_TYPE_NOT_FOUND);
        //???????????? ?????? ???
        //???????????? ??????
        //????????? ????????? ?????? ????????????
//        List<EpicIssue> epicIssues = new ArrayList<>();
//        JSONArray issues = (JSONArray) get("https://" + jiraDomain + ".atlassian.net/rest/api/2/search?jql=project=" + jiraProjectKey + "%20AND%20type%20=%20Epic", jiraId, jiraApiKey)
//                .getBody().getObject().get("issues");
//
//        la:
//        for (int i = 0; i < issues.length(); i++) {
//            String id = (String) ((JSONObject) (issues.get(i))).get("id");
//            JSONObject fields = (JSONObject) ((JSONObject) (issues.get(i))).get("fields");
//            String name = (String) fields.get("summary");
//            for (EpicIssue epicIssue : epicIssues) {
//                if (epicIssue.epicName.equals(name)) continue la;
//            }
//            epicIssues.add(new EpicIssue(id, name));
//        }
//
//        //?????? ?????????
//        List<String> categoryList = requirements.stream().map(r -> r.getRequirementCategory().getCategoryName()).collect(Collectors.toList());
//        categoryList = categoryList.stream().distinct().collect(Collectors.toList());

        for (RequirementCategory requirementCategory : requirementCategories) {
            if(isExist(requirementCategory,jiraDomain, jiraApiKey, jiraId)){
                JsonNodeFactory jnf = JsonNodeFactory.instance;
                ObjectNode payload = jnf.objectNode();
                {
                    ObjectNode update = payload.putObject("update");
                    {
                        //????????????
                        ArrayNode summaryArray = update.putArray("summary");
                        ObjectNode summary = summaryArray.addObject();
                        {
                            summary.put("set", requirementCategory.getCategoryName());
                        }

                        //????????????(?????????)
                        ArrayNode issuetypeArray = update.putArray("issuetype");
                        ObjectNode issuetype = issuetypeArray.addObject();
                        {
                            issuetype.put("id", epicId);
                        }

                        //????????????
                        ArrayNode descriptionArray = update.putArray("description");
                        ObjectNode description = descriptionArray.addObject();
                        {
                            description.put("set", requirementCategory.getCategoryName());
                        }

                        //???????????????
                        ArrayNode reporterArray = update.putArray("reporter");
                        ObjectNode reporter = reporterArray.addObject();
                        ObjectNode reporterSet = reporter.putObject("set");
                        {
                            reporterSet.put("id", jiraUsers.get(1).userAccountId);
                        }

                        //????????????????????????
                        ArrayNode epicNameArray = update.putArray("customfield_10011");
                        ObjectNode epicName = epicNameArray.addObject();
                        {
                            epicName.put("set", requirementCategory.getCategoryName());
                        }

                    }
                }

                HttpResponse<JsonNode> updateIssueResponse = Unirest.put("https://"+jiraDomain+".atlassian.net/rest/api/2/issue/"+requirementCategory.getJiraEpicId())
                        .basicAuth(jiraId, jiraApiKey)
                        .header("Accept", "application/json")
                        .header("Content-Type", "application/json")
                        .body(payload)
                        .asJson();
            }else{
                //??????
                JsonNodeFactory jnf = JsonNodeFactory.instance;
                ObjectNode payload = jnf.objectNode();
                {
                    ObjectNode fields = payload.putObject("fields");
                    {
                        //????????????
                        fields.put("summary", requirementCategory.getCategoryName());
                        //????????????(??????)
                        ObjectNode issuetype = fields.putObject("issuetype");
                        {
                            issuetype.put("id", epicId);
                        }
                        //??????????????????
                        ObjectNode project = fields.putObject("project");
                        {
                            project.put("id", jiraProjectId);
                        }
                        //????????????
                        fields.put("description", requirementCategory.getCategoryName());
                        //???????????????
                        ObjectNode reporter = fields.putObject("reporter");
                        {
                            reporter.put("id", jiraUsers.get(1).userAccountId);
                        }
                        //????????????
                        fields.put("customfield_10011", requirementCategory.getCategoryName());
                    }
                }

                HttpResponse<JsonNode> createIssueResponse = Unirest.post("https://" + jiraDomain + ".atlassian.net/rest/api/2/issue")
                        .basicAuth(jiraId, jiraApiKey)
                        .header("Accept", "application/json")
                        .header("Content-Type", "application/json")
                        .body(payload)
                        .asJson();

                JSONObject response2 = createIssueResponse.getBody().getObject();
                String responseId2 = (String) response2.get("id");
                requirementCategory.updateJiraEpicId(responseId2);
            }

        }

//        la:
//        for (re : requirementCategories) {
//            for (EpicIssue epicIssue : epicIssues) {
//                if (epicIssue.epicName.equals(category)) continue la;
//            }
//            EpicIssue epicIssue = new EpicIssue(null, category);
//
//            //??????
//            JsonNodeFactory jnf = JsonNodeFactory.instance;
//            ObjectNode payload = jnf.objectNode();
//            {
//                ObjectNode fields = payload.putObject("fields");
//                {
//                    //????????????
//                    fields.put("summary", category);
//                    //????????????(??????)
//                    ObjectNode issuetype = fields.putObject("issuetype");
//                    {
//                        issuetype.put("id", epicId);
//                    }
//                    //??????????????????
//                    ObjectNode project = fields.putObject("project");
//                    {
//                        project.put("id", jiraProjectId);
//                    }
//                    //????????????
//                    fields.put("description", category);
//                    //???????????????
//                    ObjectNode reporter = fields.putObject("reporter");
//                    {
//                        reporter.put("id", jiraUsers.get(1).userAccountId);
//                    }
//                    //????????????
//                    fields.put("customfield_10011", category);
//                }
//            }
//
//            HttpResponse<JsonNode> createIssueResponse = Unirest.post("https://" + jiraDomain + ".atlassian.net/rest/api/2/issue")
//                    .basicAuth(jiraId, jiraApiKey)
//                    .header("Accept", "application/json")
//                    .header("Content-Type", "application/json")
//                    .body(payload)
//                    .asJson();
//
//
//            JSONObject response1 = createIssueResponse.getBody().getObject();
//            String responseId1 = (String) response1.get("id");
//
//            epicIssue.setEpicId(responseId1);
//            epicIssues.add(epicIssue);

//        }

        //???????????? ???
        //???????????? - ????????? ?????? ??????
        for (Requirement requirement : requirements) {
            String reportUser = "";
            for (JiraUser jiraUser : jiraUsers) {
                if (jiraUser.userEmailAddress.equals(requirement.getMember().getMemberJiraEmail())) {
                    reportUser = jiraUser.userAccountId;
                    break;
                }
            }

            //??????
            if (isExist(requirement, jiraDomain, jiraApiKey, jiraId)){
                JsonNodeFactory jnf = JsonNodeFactory.instance;
                ObjectNode payload = jnf.objectNode();
                {
                    ObjectNode update = payload.putObject("update");
                    {
                        //????????????
                        ArrayNode summaryArray = update.putArray("summary");
                        ObjectNode summary = summaryArray.addObject();
                        {
                            summary.put("set", requirement.getRequirementPart() + "_" + requirement.getRequirementName());
                        }

                        //????????????(?????????)
                        ArrayNode issuetypeArray = update.putArray("issuetype");
                        ObjectNode issuetype = issuetypeArray.addObject();
                        {
                            issuetype.put("id", storyId);
                        }

                        //?????? ??????
                        ArrayNode parentArray = update.putArray("parent");
                        ObjectNode parent = parentArray.addObject();
                        {
                            parent.put("id",requirement.getRequirementCategory().getJiraEpicId());
                        }

                        //????????????
                        ArrayNode descriptionArray = update.putArray("description");
                        ObjectNode description = descriptionArray.addObject();
                        {
                            description.put("set", requirement.getRequirementContent());
                        }

                        //???????????????
                        ArrayNode reporterArray = update.putArray("reporter");
                        ObjectNode reporter = reporterArray.addObject();
                        ObjectNode reporterSet = reporter.putObject("set");
                        {
                            reporterSet.put("id", reportUser);
                        }

                        //??????????????????
                        ArrayNode priorityArray = update.putArray("priority");
                        ObjectNode priority = priorityArray.addObject();
                        ObjectNode prioritySet = priority.putObject("set");
                        {
                            prioritySet.put("id", String.valueOf(requirement.getRequirementPriority()));
                        }

                        //???????????????
                        ArrayNode assigneeArray = update.putArray("assignee");
                        ObjectNode assignee = assigneeArray.addObject();
                        ObjectNode assigneeSet = assignee.putObject("set");
                        {
                            assigneeSet.put("id", reportUser);
                        }

                        //????????????????????????
                        ArrayNode storyPointArray = update.putArray(storyPointField);
                        ObjectNode storyPoint = storyPointArray.addObject();{
                            storyPoint.put("set", requirement.getRequirementStoryPoint());
                        }

                    }
                }

                HttpResponse<JsonNode> updateIssueResponse = Unirest.put("https://"+jiraDomain+".atlassian.net/rest/api/2/issue/"+requirement.getJiraIssueId())
                        .basicAuth(jiraId, jiraApiKey)
                        .header("Accept", "application/json")
                        .header("Content-Type", "application/json")
                        .body(payload)
                        .asJson();
            }
            //??????
            else{
                //??????
                JsonNodeFactory jnf = JsonNodeFactory.instance;
                ObjectNode payload = jnf.objectNode();
                {
                    ObjectNode fields = payload.putObject("fields");
                    {
                        //????????????
                        fields.put("summary", requirement.getRequirementPart() + "_" + requirement.getRequirementName());
                        //????????????(?????????)
                        ObjectNode issuetype = fields.putObject("issuetype");
                        {
                            issuetype.put("id", storyId);
                        }
                        //??????????????????
                        ObjectNode project = fields.putObject("project");
                        {
                            project.put("id", jiraProjectId);
                        }
                        //?????? ??????
                        ObjectNode parent = fields.putObject("parent");
                        {
                            parent.put("id",requirement.getRequirementCategory().getJiraEpicId());
                        }
                        //????????????
                        fields.put("description", requirement.getRequirementContent());
                        //???????????????
                        ObjectNode reporter = fields.putObject("reporter");
                        {
                            reporter.put("id", reportUser);
                        }
                        //??????????????????
                        ObjectNode priority = fields.putObject("priority");
                        {
                            priority.put("id", String.valueOf(requirement.getRequirementPriority()));
                        }
                        //???????????????
                        ObjectNode assignee = fields.putObject("assignee");
                        {
                            assignee.put("id", reportUser);
                        }
                        //????????????????????????
                        fields.put(storyPointField, requirement.getRequirementStoryPoint());
                    }
                }

                HttpResponse<JsonNode> createIssueResponse = Unirest.post("https://" + jiraDomain + ".atlassian.net/rest/api/2/issue")
                        .basicAuth(jiraId, jiraApiKey)
                        .header("Accept", "application/json")
                        .header("Content-Type", "application/json")
                        .body(payload)
                        .asJson();

                JSONObject response2 = createIssueResponse.getBody().getObject();
                String responseId2 = (String) response2.get("id");
                requirement.updateJiraIssueId(responseId2);
            }
        }
    }

    private static boolean isExist(Requirement requirement, String jiraDomain, String jiraApiKey, String jiraId) throws
            UnirestException {
        HttpResponse<JsonNode> issueResponse = Unirest.get("https://" + jiraDomain + ".atlassian.net/rest/api/2/issue/" + requirement.getJiraIssueId())
                .basicAuth(jiraId, jiraApiKey)
                .header("Accept", "application/json")
                .asJson();

        if (issueResponse.getStatus() == 404) return false;
        else if (issueResponse.getStatus() == 200) return true;

        return false;
    }

    private static boolean isExist(RequirementCategory requirementCategory, String jiraDomain, String jiraApiKey, String jiraId) throws
            UnirestException {
        HttpResponse<JsonNode> issueResponse = Unirest.get("https://" + jiraDomain + ".atlassian.net/rest/api/2/issue/" + requirementCategory.getJiraEpicId())
                .basicAuth(jiraId, jiraApiKey)
                .header("Accept", "application/json")
                .asJson();

        if (issueResponse.getStatus() == 404) return false;
        else if (issueResponse.getStatus() == 200) return true;

        return false;
    }



}
