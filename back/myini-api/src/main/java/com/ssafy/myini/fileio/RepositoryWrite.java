package com.ssafy.myini.fileio;

import com.ssafy.myini.InitializerException;
import com.ssafy.myini.initializer.request.InitializerRequest;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

public class RepositoryWrite {
        static StringBuilder repositoryImportContents;
        private static int depth = 0;

    public static String repositoryPreview(JSONObject tableItem, InitializerRequest initializerRequest){
            repositoryImportContents = new StringBuilder();
            String pkType = "";

            StringBuilder contents = new StringBuilder();

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

            repositoryImportContents.append("import " + initializerRequest.getSpringPackageName() + ".entity."+tableName+";\n"+
                    "import org.springframework.data.jpa.repository.JpaRepository;\n");

            contents.append("package " + initializerRequest.getSpringPackageName() + ".repository;\n" +
                    "\n"+
                    repositoryImportContents+
                    "\n"+
                    "public interface "+ tableName + "Repository extends JpaRepository<"+tableName+", "+pkType+">{\n"
            );
            depth++;
            FileUtil.appendTab(contents,depth);
            depth--;
            contents.append("// TODO : ");
            contents.append(tableName+"Repository")
                    .append(" 코드를 작성하세요.\n")
                    .append("}");

            return contents.toString();
    }

    public static void repositoryWrite(JSONObject tableItem, InitializerRequest initializerRequest){
     try {
        FileUtil.fileWrite(initializerRequest, repositoryPreview(tableItem,initializerRequest), "repository", (String) tableItem.get("name")+"Repository");
    }catch (Exception e){
        throw new InitializerException(InitializerException.INITIALIZER_FAIL);
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
