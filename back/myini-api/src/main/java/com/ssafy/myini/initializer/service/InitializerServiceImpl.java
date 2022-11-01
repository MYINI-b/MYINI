package com.ssafy.myini.initializer.service;

import com.ssafy.myini.InitializerException;
import com.ssafy.myini.config.S3Uploader;
import com.ssafy.myini.erd.domain.entity.ErdTable;
import com.ssafy.myini.erd.domain.entity.TableColumn;
import com.ssafy.myini.erd.domain.repository.ErdTableRepository;
import com.ssafy.myini.erd.domain.repository.TableColumnRepository;
import com.ssafy.myini.erd.response.ErdTableListResponse;
import com.ssafy.myini.fileio.EntityWrite;
import com.ssafy.myini.fileio.InitProjectDownload;
import com.ssafy.myini.fileio.RepositoryWrite;
import com.ssafy.myini.NotFoundException;
import com.ssafy.myini.initializer.request.InitializerRequest;
import com.ssafy.myini.initializer.response.InitializerPossibleResponse;
import com.ssafy.myini.project.domain.Project;
import com.ssafy.myini.project.domain.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.FileUtils;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileReader;
import java.io.Reader;
import java.net.URL;
import java.util.List;
import java.util.stream.Collectors;

import static com.ssafy.myini.NotFoundException.*;

@Service
@RequiredArgsConstructor
@Transactional
public class InitializerServiceImpl implements InitializerService {
    private final ProjectRepository projectRepository;
    private final ErdTableRepository erdTableRepository;
    private final TableColumnRepository tableColumnRepository;
    private final S3Uploader s3Uploader;

    @Override
    @Transactional
    public InitializerPossibleResponse initializerIsPossible(Long projectId) {
        Project project = projectRepository.findById(projectId).orElseThrow(() -> new NotFoundException(PROJECT_NOT_FOUND));

        //요구사항명세서 체크

        //ERD체크
        InitializerPossibleResponse initializerPossibleResponse = null;
        //테이블유무
        List<ErdTable> erdTables = erdTableRepository.findAllByProject(project);
        if (erdTables.size() == 0) {
            initializerPossibleResponse = new InitializerPossibleResponse(false, "테이블이 없습니다.");
            return initializerPossibleResponse;
        } else {
            //테이블 컬럼유무
            for (ErdTable erdTable : erdTables) {
                List<TableColumn> tableColumns = tableColumnRepository.findAllByErdTable(erdTable);
                if (tableColumns.size() == 0) {
                    initializerPossibleResponse = new InitializerPossibleResponse(false, "컬럼이 없습니다.");
                    return initializerPossibleResponse;
                }
            }
        }

        //API명세서 체크

        initializerPossibleResponse = new InitializerPossibleResponse(true, "빌드가능");
        return initializerPossibleResponse;
    }

    @Override
    @Transactional
    public Void initializerStart(Long projectId, InitializerRequest initializerRequest) {
        //프로젝트 init
        InitProjectDownload.initProject(initializerRequest);

        Project project = projectRepository.findById(projectId).orElseThrow(() -> new NotFoundException(PROJECT_NOT_FOUND));
        List<ErdTable> erdTables = erdTableRepository.findAllByProject(project);
        List<ErdTableListResponse> erdTableListResponses = erdTables.stream().map(ErdTableListResponse::from).collect(Collectors.toList());

        //ERD json 받아오기
        try {
            JSONParser jsonParser = new JSONParser();
            File file = new File("erd");
            FileUtils.copyURLToFile(new URL("https://myini.s3.ap-northeast-2.amazonaws.com/ERD/1.vuerd.json"),file);

            Reader reader = new FileReader(file);
            JSONObject erd = (JSONObject) jsonParser.parse(reader);
            try {
                //entity 작성
                EntityWrite.entityWrite(erd, initializerRequest);
                //repository 작성
            }catch (Exception e){
                throw new InitializerException(InitializerException.INITIALIZER_FAIL);
            }
        }catch (Exception e){
            System.out.println("e = " + e);
        }

//        //Repository 작성
//        for (ErdTableListResponse erdTableListResponse : erdTableListResponses) {
//            RepositoryWrite.repositoryWrite(erdTableListResponse, initializerRequest);
//        }

        return null;
    }

    @Override
    public ByteArrayOutputStream myIniDownload() {
        ByteArrayOutputStream byteArrayOutputStream = s3Uploader.downloadFile("front Setup 0.1.0.exe");

        return byteArrayOutputStream;
    }

}
