package com.ssafy.myini.fileio;

import com.ssafy.myini.erd.response.ConditionItemDto;
import com.ssafy.myini.erd.response.ErdTableListResponse;
import com.ssafy.myini.erd.response.TableColumnDto;
import com.ssafy.myini.initializer.request.InitializerRequest;
import com.ssafy.myini.initializer.response.PreviewResponse;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.util.List;

public class RepositoryWrite {
        static StringBuilder repositoryImportContents;

    public static List<PreviewResponse> repositoryPreview(JSONObject erd, InitializerRequest initializerRequest, List<PreviewResponse> previewResponses){

        JSONObject table = (JSONObject) erd.get("table");
        JSONArray tables = (JSONArray) table.get("tables");

        //테이블 수만큼 for문
        for (int i=0 ; i<tables.size() ; i++){
            repositoryImportContents = new StringBuilder();
            String pkType = "";

            StringBuilder contents = new StringBuilder();
            JSONObject tableItem = (JSONObject) tables.get(i);

            String tableName = (String) tableItem.get("name");

            //PK 타입 획득하기
            JSONArray columns = (JSONArray) tableItem.get("columns");
            for (int j=0 ; j<columns.size() ; j++){
                JSONObject column = (JSONObject) columns.get(j);

                JSONObject option = (JSONObject) column.get("option");
                if( (Boolean) option.get("primaryKey")){
                    pkType = (String) column.get("dataType");
                    break;
                }
            }

            pkType = dataTypeChange(pkType);

            repositoryImportContents.append("import " + initializerRequest.getSpring_package_name() + ".entity."+tableName+";\n"+
                    "import org.springframework.data.jpa.repository.JpaRepository;\n");

            contents.append("package " + initializerRequest.getSpring_package_name() + ".repository;\n" +
                    "\n"+
                    repositoryImportContents+
                    "\n"+
                    "public interface "+ tableName + "Repository extends JpaRepository<"+tableName+", "+pkType+">{}"
            ) ;

            PreviewResponse previewResponse = new PreviewResponse("repository",tableName+"Repository.java",contents.toString());
            previewResponses.add(previewResponse);
        }
        return previewResponses;
    }

    public static void repositoryWrite(JSONObject erd, InitializerRequest initializerRequest){

        JSONObject table = (JSONObject) erd.get("table");
        JSONArray tables = (JSONArray) table.get("tables");

        //테이블 수만큼 for문
        for (int i=0 ; i<tables.size() ; i++){
            repositoryImportContents = new StringBuilder();
            String pkType = "";

            StringBuilder contents = new StringBuilder();
            JSONObject tableItem = (JSONObject) tables.get(i);

            String tableName = (String) tableItem.get("name");

            //PK 타입 획득하기
            JSONArray columns = (JSONArray) tableItem.get("columns");
            for (int j=0 ; j<columns.size() ; j++){
                JSONObject column = (JSONObject) columns.get(j);

                JSONObject option = (JSONObject) column.get("option");
                if( (Boolean) option.get("primaryKey")){
                    pkType = (String) column.get("dataType");
                    break;
                }
            }

            pkType = dataTypeChange(pkType);

            //기본 임포트 설정
            repositoryImportContents.append("import " + initializerRequest.getSpring_package_name() + ".entity."+tableName+";\n"+
                    "import org.springframework.data.jpa.repository.JpaRepository;\n");

            
            contents.append("package " + initializerRequest.getSpring_package_name() + ".repository;\n" +
                    "\n"+
                    repositoryImportContents+
                    "\n"+
                    "public interface "+ tableName + "Repository extends JpaRepository<"+tableName+", "+pkType+">{}"
            ) ;


        try {
            //폴더 찾아가기
            String repositoryPath = initializerRequest.getSpring_base_path()+"\\"+initializerRequest.getSpring_name()+"\\src\\main\\java\\";

            String[] packagePath = initializerRequest.getSpring_package_name().split("[.]");
            for (String s : packagePath) {
                repositoryPath = repositoryPath + s + "\\";
            }
            repositoryPath += "repository\\";

            //폴더 만들기
            File folder = new File(repositoryPath);
            if (!folder.exists()) {
                folder.mkdir();
            }

            //파일 만들기
            File file = new File(repositoryPath+tableName+"Repository.java");
            if (!file.exists()) {
                folder.createNewFile();
            }

            //파일 쓰기
            FileWriter fw = new FileWriter(file);
            BufferedWriter writer = new BufferedWriter(fw);
            writer.write(contents.toString());
            writer.close();

        }catch (Exception e){
            System.out.println("e = " + e);
        }
    }
    }

    private static String dataTypeChange(String columnDataType) {
        if(columnDataType.equals("BIGINT(Long)")){
            return "Long";
        }else if(columnDataType.equals("INT(Integer)")){
            return "Integer";
        }else if(columnDataType.equals("CHAR(Character)")){
            return "Character";
        }else if(columnDataType.equals("DOUBLE(Double)")){
            return "Double";
        }else if(columnDataType.equals("FLOAT(Float)")){
            return "Float";
        }else if(columnDataType.equals("SMALLINT(Short)")){
            return "Short";
        }else if(columnDataType.equals("TINYINT(Byte)")){
            return "Byte";
        }else if(columnDataType.equals("BOOLEAN(Boolean)")){
            return "Boolean";
        }else if(columnDataType.equals("VARCHAR(String)")){
            return "String";
        }
        return "String";
    }
}
