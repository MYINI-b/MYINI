package com.ssafy.myini.initializer.service;

import com.ssafy.myini.InitializerException;
import com.ssafy.myini.apidocs.query.ApiDocsQueryRepository;
import com.ssafy.myini.apidocs.response.ProjectInfoListResponse;
import com.ssafy.myini.config.S3Uploader;
import com.ssafy.myini.fileio.*;
import com.ssafy.myini.NotFoundException;
import com.ssafy.myini.initializer.request.InitializerRequest;
import com.ssafy.myini.initializer.response.InitializerPossibleResponse;
import com.ssafy.myini.initializer.response.PreviewResponse;
import com.ssafy.myini.project.domain.Project;
import com.ssafy.myini.project.domain.ProjectRepository;
import lombok.RequiredArgsConstructor;
import net.lingala.zip4j.ZipFile;
import org.apache.commons.io.FileUtils;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static com.ssafy.myini.NotFoundException.*;

@Service
@RequiredArgsConstructor
@Transactional
public class InitializerServiceImpl implements InitializerService {
    private final ProjectRepository projectRepository;
    private final S3Uploader s3Uploader;
    private final ApiDocsQueryRepository apiDocsQueryRepository;

    @Override
    public InitializerPossibleResponse initializerIsPossible(Long projectId) {
        Project project = projectRepository.findById(projectId).orElseThrow(() -> new NotFoundException(PROJECT_NOT_FOUND));
        //API명세서 체크
        return new InitializerPossibleResponse(true, "빌드가능");
    }

    @Override
    @Transactional
    public ZipFile initializerStart(Long projectId, InitializerRequest initializerRequest) {
        //프로젝트 init
        InitProjectDownload.initProject(initializerRequest);

        Project project = projectRepository.findById(projectId).orElseThrow(() -> new NotFoundException(PROJECT_NOT_FOUND));
        List<ProjectInfoListResponse> projectInfoListResponses = apiDocsQueryRepository.findAll(project).stream()
                .map(ProjectInfoListResponse::from)
                .collect(Collectors.toList());
        //ERD json 받아오기
        try {
            JSONParser jsonParser = new JSONParser();
            File file = new File("erd");
            FileUtils.copyURLToFile(new URL("https://myini.s3.ap-northeast-2.amazonaws.com/ERD/" + projectId + ".vuerd.json"), file);


            Reader reader = new FileReader(file);
            JSONObject erd = (JSONObject) jsonParser.parse(reader);
            JSONObject table = (JSONObject) erd.get("table");
            JSONArray tables = (JSONArray) table.get("tables");
            JSONObject relationship = (JSONObject) erd.get("relationship");

            //entity 작성
            EntityWrite.setTableAndColumn(erd);
            tables.forEach(t -> EntityWrite.entityWrite((JSONObject) t, relationship, initializerRequest));

            //repository 작성
            tables.forEach(t -> RepositoryWrite.repositoryWrite((JSONObject) t, initializerRequest));

            // controller 생성
            projectInfoListResponses.forEach(projectInfoListResponse -> ControllerWrite.controllerWrite(projectInfoListResponse, initializerRequest));

            // service 생성
            projectInfoListResponses.forEach(projectInfoListResponse -> ServiceWrite.serviceWrite(projectInfoListResponse, initializerRequest));

            // serviceImpl 생성
            projectInfoListResponses.forEach(projectInfoListResponse -> ServiceImplWrite.serviceImplWrite(projectInfoListResponse, initializerRequest));

            // dto 생성
            projectInfoListResponses.forEach(projectInfoListResponse -> DtoWrite.dtoWrite(projectInfoListResponse, initializerRequest));

            ZipFile zipFile = new ZipFile("project.zip");
            zipFile.addFolder(new File(initializerRequest.getSpringPackageName() + initializerRequest.getSpringName()));

            deletefolder(initializerRequest);
            return zipFile;
        } catch (Exception e) {
            throw new InitializerException(InitializerException.INITIALIZER_FAIL);
        }
    }

    private static void deletefolder(InitializerRequest initializerRequest) throws Exception {
        String path = initializerRequest.getSpringPackageName() + initializerRequest.getSpringName();

        File deleteZip = new File(path + ".zip");
        if (deleteZip.exists()) {
            deleteZip.delete();
        }

        File deleteFolder = new File(path);
        if (deleteFolder.exists()) {
            File[] deleteFolderList = deleteFolder.listFiles();

            for (int j = 0; j < deleteFolderList.length; j++) {
                deleteFolderList[j].delete();
            }

            if (deleteFolderList.length == 0 && deleteFolder.isDirectory()) {
                deleteFolder.delete();
            }
        }
    }

    @Override
    @Transactional
    public List<PreviewResponse> initializerPreview(Long projectId, InitializerRequest initializerRequest) {
        List<PreviewResponse> previewResponses = new ArrayList<>();
        Project project = projectRepository.findById(projectId).orElseThrow(() -> new NotFoundException(PROJECT_NOT_FOUND));
        List<ProjectInfoListResponse> projectInfoListResponses = apiDocsQueryRepository.findAll(project).stream()
                .map(ProjectInfoListResponse::from)
                .collect(Collectors.toList());
        //ERD json 받아오기
        try {
            JSONParser jsonParser = new JSONParser();
            File file = new File("erd");
            FileUtils.copyURLToFile(new URL("https://myini.s3.ap-northeast-2.amazonaws.com/ERD/" + projectId + ".vuerd.json"), file);


            Reader reader = new FileReader(file);
            JSONObject erd = (JSONObject) jsonParser.parse(reader);
            JSONObject table = (JSONObject) erd.get("table");
            JSONArray tables = (JSONArray) table.get("tables");
            JSONObject relationship = (JSONObject) erd.get("relationship");

            //entity 작성
            EntityWrite.setTableAndColumn(erd);
            for (int i = 0; i < tables.size(); i++) {
                previewResponses.add(new PreviewResponse("entity",
                        (String) ((JSONObject) tables.get(i)).get("name") + ".java",
                        EntityWrite.entityPreview((JSONObject) tables.get(i), relationship, initializerRequest)));
            }

            //repository 작성
            for (int i = 0; i < tables.size(); i++) {
                previewResponses.add(new PreviewResponse("repository",
                        (String) ((JSONObject) tables.get(i)).get("name") + "Repository.java",
                        RepositoryWrite.repositoryPreview((JSONObject) tables.get(i), initializerRequest)));
            }

            // controller
            projectInfoListResponses.forEach(projectInfoListResponse -> {
                previewResponses.add(
                        new PreviewResponse("controller",
                                projectInfoListResponse.getApiControllerName() + "Controller.java",
                                ControllerWrite.controllerPreview(projectInfoListResponse, initializerRequest)));
            });

            // service
            projectInfoListResponses.forEach(projectInfoListResponse -> {
                previewResponses.add(
                        new PreviewResponse("service",
                                projectInfoListResponse.getApiControllerName() + "Service.java",
                                ServiceWrite.servicePreview(projectInfoListResponse, initializerRequest)));
            });

            // serviceImpl
            projectInfoListResponses.forEach(projectInfoListResponse -> {
                previewResponses.add(
                        new PreviewResponse("serviceImpl",
                                projectInfoListResponse.getApiControllerName() + "ServiceImpl.java",
                                ServiceWrite.servicePreview(projectInfoListResponse, initializerRequest)));
            });

            // dto
            projectInfoListResponses.forEach(projectInfoListResponse -> {
                projectInfoListResponse.getApiInfoResponses().forEach(
                        apiInfoResponse -> {
                            apiInfoResponse.getDtoResponses().forEach(
                                    dtoResponse -> {
                                        previewResponses.add(
                                                new PreviewResponse("dto",
                                                        dtoResponse.getDtoName() + ".java",
                                                        DtoWrite.dtoPreview(dtoResponse, initializerRequest)));
                                    });
                        });
            });

        } catch (Exception e) {
            throw new InitializerException(InitializerException.INITIALIZER_FAIL);
        }

        return previewResponses;
    }

    @Override
    public ByteArrayOutputStream myIniDownload() {
        ByteArrayOutputStream byteArrayOutputStream = s3Uploader.downloadFile("front Setup 0.1.0.exe");

        return byteArrayOutputStream;
    }

    @Override
    public JSONObject initializerSettings() {
        try {
            // start.spring.io에서 얻은 dependendy 기반
            URL url = new URL("https://start.spring.io/metadata/client");

            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            if (conn.getResponseCode() != 200) {
                throw new RuntimeException("spring initializer 에서 dependency 메타데이터를 다운로드하는데 실패하였습니다.");
            }

            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream(), "UTF-8"));
            StringBuilder sb = new StringBuilder();

            String line = "";
            while ((line = br.readLine()) != null) {
                sb.append(line);
            }
            JSONParser parser = new JSONParser();
            JSONObject starter = (JSONObject) parser.parse(sb.toString());

            JSONObject returnObj = new JSONObject();

            // single-select
            JSONObject selectValues = new JSONObject();
            selectValues.put("spring_type", addSingleSelectValues(starter, "type"));
            selectValues.put("spring_packaging", addSingleSelectValues(starter, "packaging"));
            selectValues.put("spring_jvm_version", addSingleSelectValues(starter, "javaVersion"));
            selectValues.put("spring_language", addSingleSelectValues(starter, "language"));
            selectValues.put("spring_platform_version", addSingleSelectValues(starter, "bootVersion"));
            returnObj.put("single-select", selectValues);

            // text
            JSONArray textValues = new JSONArray();
            textValues.add(addTextValues("Group", "spring_group_id"));
            textValues.add(addTextValues("Artifact", "spring_artifact_id"));
            textValues.add(addTextValues("Name", "spring_name"));
            textValues.add(addTextValues("Description", "spring_description"));
            textValues.add(addTextValues("Package name", "spring_package_name"));
            returnObj.put("text", textValues);

            // dependencies
            JSONArray categories = (JSONArray) ((JSONObject) starter.get("dependencies")).get("values");
            JSONArray dependencies = new JSONArray();
            for (Object category : categories) {
                JSONArray sub = (JSONArray) ((JSONObject) category).get("values");
                for (Object dependency : sub) {
                    dependencies.add(addDependencies((JSONObject) dependency));
                }
            }
            returnObj.put("dependencies", dependencies);

            return returnObj;

        } catch (Exception e) {
            throw new RuntimeException("JSON Parsing 에 실패하였습니다.");
        }
    }

    private JSONObject addDependencies(JSONObject dependency) {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("id", dependency.get("id"));
        jsonObject.put("name", dependency.get("name"));
        jsonObject.put("description", dependency.get("description"));

        return jsonObject;
    }

    private JSONObject addTextValues(String name, String id) {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("name", name);
        jsonObject.put("id", id);

        return jsonObject;
    }

    private JSONObject addSingleSelectValues(JSONObject starter, String name) {
        JSONObject original = (JSONObject) starter.get(name);

        String defaultValue = (String) original.get("default");

        JSONArray values = (JSONArray) original.get("values");

        JSONObject jsonObject = new JSONObject();

        jsonObject.put("default", defaultValue);

        JSONArray jsonArray = new JSONArray();
        for (Object value : values) {
            JSONObject tmp = new JSONObject();
            tmp.put("id", ((JSONObject) value).get("id"));
            tmp.put("name", ((JSONObject) value).get("name"));

            jsonArray.add(tmp);
        }

        jsonObject.put("values", jsonArray);

        return jsonObject;

    }

}
