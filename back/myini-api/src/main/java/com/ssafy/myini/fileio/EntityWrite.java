package com.ssafy.myini.fileio;

import com.ssafy.myini.initializer.request.InitializerRequest;
import com.ssafy.myini.initializer.response.PreviewResponse;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.jdbc.support.JdbcUtils;
import org.springframework.security.core.parameters.P;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.util.ArrayList;
import java.util.List;

public class EntityWrite {
    static StringBuilder entityImportContents;
    static List<Table> tableList = new ArrayList<>();
    static List<Column> columnList = new ArrayList<>();
    static List<RelationEndColumn> relationEndColumnList = new ArrayList<>();

    //모든 테이블의 ID와 이름 클래스
    static class Table {
        String tableId;
        String tableName;

        public Table(String tableId, String tableName) {
            super();
            this.tableId = tableId;
            this.tableName = tableName;
        }

        public String toString(){
            return tableId + ", " + tableName;
        }
    }

    //모든 컬럼의 ID와 이름 클래스
    static class Column {
        String columnId;
        String columnName;

        public Column(String columnId, String columnName) {
            super();
            this.columnId = columnId;
            this.columnName = columnName;
        }

        public String toString(){
            return columnId + ", " + columnName;
        }
    }

    //모든 연관관계 n 에서의 컬럼 ID 클래스
    static class RelationEndColumn {
        String columnId;

        public RelationEndColumn(String columnId) {
            super();
            this.columnId = columnId;
        }

        public String toString(){
            return columnId;
        }
    }
    public static List<PreviewResponse> entityPreview(JSONObject erd, InitializerRequest initializerRequest, List<PreviewResponse> previewResponses) throws Exception{
        //테이블, 컬럼, 연관관계 ID와 NAME 저장하기
        setTableAndColumn(erd);

        JSONObject table = (JSONObject) erd.get("table");
        JSONArray tables = (JSONArray) table.get("tables");
        JSONObject relationship = (JSONObject) erd.get("relationship");
        JSONArray relationships = (JSONArray) relationship.get("relationships");

        //테이블
        for (int i=0 ; i<tables.size() ; i++){
            entityImportContents = new StringBuilder();
            entityImportContents.append("import lombok.*;\nimport javax.persistence.*;\n");
            StringBuilder contents = new StringBuilder();
            JSONObject tableItem = (JSONObject) tables.get(i);

            String tableName = (String) tableItem.get("name");
            String tableId = (String) tableItem.get("id");

            JSONArray columns = (JSONArray) tableItem.get("columns");
            StringBuilder columnContents = columnWrite(columns);
            StringBuilder relationContents = relationWrite(tableId, relationships, initializerRequest);

            contents.append("package " + initializerRequest.getSpring_package_name() + ".entity;\n")
                    .append("\n")
                    .append(entityImportContents)
                    .append("\n")
                    .append("@Entity\n@NoArgsConstructor(access = AccessLevel.PROTECTED)\n@AllArgsConstructor\n@Getter\n")
                    .append("public class "+tableName+" {\n\n")
                    .append(columnContents)
                    .append(relationContents)
                    .append("}");

            PreviewResponse previewResponse = new PreviewResponse("entity", tableName+".java" , contents.toString());
            previewResponses.add(previewResponse);
        }

        return previewResponses;
    }

    public static void entityWrite(JSONObject erd, InitializerRequest initializerRequest) throws Exception{
        //테이블, 컬럼, 연관관계 ID와 NAME 저장하기
        setTableAndColumn(erd);

        JSONObject table = (JSONObject) erd.get("table");
        JSONArray tables = (JSONArray) table.get("tables");
        JSONObject relationship = (JSONObject) erd.get("relationship");
        JSONArray relationships = (JSONArray) relationship.get("relationships");

        //테이블
        for (int i=0 ; i<tables.size() ; i++){
            entityImportContents = new StringBuilder();
            entityImportContents.append("import lombok.*;\nimport javax.persistence.*;\n");
            StringBuilder contents = new StringBuilder();
            JSONObject tableItem = (JSONObject) tables.get(i);

            String tableName = (String) tableItem.get("name");
            String tableId = (String) tableItem.get("id");

            JSONArray columns = (JSONArray) tableItem.get("columns");
            StringBuilder columnContents = columnWrite(columns);
            StringBuilder relationContents = relationWrite(tableId, relationships, initializerRequest);

            contents.append("package " + initializerRequest.getSpring_package_name() + ".entity;\n")
                    .append("\n")
                    .append(entityImportContents)
                    .append("\n")
                    .append("@Entity\n@NoArgsConstructor(access = AccessLevel.PROTECTED)\n@AllArgsConstructor\n@Getter\n")
                    .append("public class "+tableName+" {\n\n")
                    .append(columnContents)
                    .append(relationContents)
                    .append("}");

        try {
            //폴더 찾아가기
            String entityPath = initializerRequest.getSpring_base_path()+"\\"+initializerRequest.getSpring_name()+"\\src\\main\\java\\";

            String[] packagePath = initializerRequest.getSpring_package_name().split("[.]");
            for (String s : packagePath) {
                entityPath = entityPath + s + "\\";
            }
            entityPath += "entity\\";

            //폴더 만들기
            File folder = new File(entityPath);
            if (!folder.exists()) {
                folder.mkdir();
            }

            //파일 만들기
            File file = new File(entityPath+tableName+".java");
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



    public static StringBuilder columnWrite(JSONArray columns){
        StringBuilder columnContents = new StringBuilder();

        for (int i=0 ; i<columns.size() ; i++){
            JSONObject column = (JSONObject) columns.get(i);

            String columnName = (String) column.get("name");
            String columnId = (String) column.get("id");
            String columnDataType = (String) column.get("dataType");
            columnDataType = dataTypeChange(columnDataType);
//            String columnDefault = (String) column.get("default");

            JSONObject option = (JSONObject) column.get("option");

            Boolean primaryKey = (Boolean) option.get("primaryKey");
            Boolean unique = (Boolean) option.get("unique");
            Boolean notNull = (Boolean) option.get("notNull");

            if(!relationEndColumnList.contains(columnId)) {
                Boolean isPk = false;
                String flag = "";
                //pk일때
                if (primaryKey) {
                    isPk = true;
                    columnContents.append("@Id\n@GeneratedValue(strategy = GenerationType.IDENTITY)\n" +
                            "@Column(name=\"" + columnName + "\")\n");
                }
                //unique일때
                if (unique) {
                    flag += "u";
                }
                //notnull일때
                if (notNull) {
                    flag += "n";
                }

                if(!isPk) {
                    if (flag.contains("u") && flag.contains("n"))
                        columnContents.append("@Column(unique = true, nullable = false)\n");
                    else if (flag.contains("u") && !flag.contains("n"))
                        columnContents.append("@Column(unique = true)\n");
                    else if (!flag.contains("u") && flag.contains("n"))
                        columnContents.append("@Column(nullable = false)\n");
                }

                //자료형 + 변수명 추가
                columnContents.append("private " + columnDataType + " " + JdbcUtils.convertUnderscoreNameToPropertyName(columnName) + ";\n\n");

            }
        }
        return columnContents;
    }

    public static StringBuilder relationWrite(String tableId, JSONArray relationships, InitializerRequest initializerRequest){

        StringBuilder relationContents = new StringBuilder();
        StringBuilder ManyToOneContents = new StringBuilder();
        StringBuilder OneToManyContents = new StringBuilder();
        int OneToManyIndex = 1;
        for (int i=0 ; i<relationships.size() ; i++){
            JSONObject relationship = (JSONObject) relationships.get(i);
            JSONObject start = (JSONObject) relationship.get("start");
            String startTableId = (String) start.get("tableId");
            String startTableName = "";

            for (Table table : tableList) {
                if(table.tableId.equals(startTableId)) startTableName = table.tableName;
            }
            JSONObject end = (JSONObject) relationship.get("end");
            String endTableId = (String) end.get("tableId");
            String endTableName = "";

            for (Table table : tableList) {
                if(table.tableId.equals(endTableId)) endTableName = table.tableName;
            }


            JSONArray columnIds = (JSONArray) end.get("columnIds");
            String endColumnName = "";
            for (Column column : columnList) {
                if(column.columnId.equals(columnIds.get(0))) endColumnName = column.columnName;
            }

            if(tableId.equals(endTableId)){
                ManyToOneContents.append("@ManyToOne(fetch = FetchType.LAZY)\n"+
                        "@JoinColumn(name = \""+endColumnName+"\")\n"+
                        "private "+startTableName+" "+JdbcUtils.convertUnderscoreNameToPropertyName(endColumnName.substring(0,endColumnName.length()-3))+";\n\n");

                entityImportContents.append("import "+ initializerRequest.getSpring_package_name() + ".entity." + startTableName+";\n");
            }

            if(tableId.equals(startTableId)){
                entityImportContents.append("import java.util.*;\n");
                if(!OneToManyContents.toString().contains(endTableName.substring(0,1).toLowerCase()+endTableName.substring(1)+"List")){
                    OneToManyContents.append("@OneToMany(mappedBy = \""+JdbcUtils.convertUnderscoreNameToPropertyName(endColumnName.substring(0,endColumnName.length()-3))+"\", fetch = FetchType.LAZY, cascade = CascadeType.ALL)\n"+
                            "private List<"+endTableName+"> "+endTableName.substring(0,1).toLowerCase()+endTableName.substring(1)+"List = new ArrayList<>();\n\n");
                }else{
                    OneToManyContents.append("@OneToMany(mappedBy = \""+JdbcUtils.convertUnderscoreNameToPropertyName(endColumnName.substring(0,endColumnName.length()-3))+"\", fetch = FetchType.LAZY, cascade = CascadeType.ALL)\n"+
                            "private List<"+endTableName+"> "+endTableName.substring(0,1).toLowerCase()+endTableName.substring(1)+"List"+(OneToManyIndex++)+" = new ArrayList<>();\n\n");
                }
            }
        }
        return relationContents.append(ManyToOneContents).append(OneToManyContents);
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
        }else if(columnDataType.equals("DATETIME")){
            if (!entityImportContents.toString().contains("import java.time.LocalDateTime;"))
                entityImportContents.append("import java.time.LocalDateTime;\n");
            return "LocalDateTime";
        }

        return "String";
    }

    private static void setTableAndColumn(JSONObject erd) {
        JSONObject table = (JSONObject) erd.get("table");
        JSONArray tables = (JSONArray) table.get("tables");

        JSONObject relationship = (JSONObject) erd.get("relationship");
        JSONArray relationships = (JSONArray) relationship.get("relationships");

        for (int i=0 ; i<tables.size() ; i++) {

            JSONObject tableItem = (JSONObject) tables.get(i);

            //테이블 이름
            String tn = (String) tableItem.get("name");
            //테이블 ID
            String ti = (String) tableItem.get("id");

            tableList.add(new Table(ti, tn));

            JSONArray columns = (JSONArray) tableItem.get("columns");
            for (int j = 0; j < columns.size(); j++) {
                JSONObject column = (JSONObject) columns.get(j);
                String ci = (String) column.get("id");
                String cn = (String) column.get("name");
                
                columnList.add(new Column(ci, cn));
            }
        }
        for (int i=0 ; i<relationships.size() ; i++){
            JSONObject relation = (JSONObject) relationships.get(i);
            JSONObject end = (JSONObject) relation.get("end");
            JSONArray columnIds = (JSONArray) end.get("columnIds");

            for (int j=0 ; j<columnIds.size() ; j++){
                String ci = (String)columnIds.get(j);
                relationEndColumnList.add(new RelationEndColumn(ci));
            }


        }

    }

    public static String CamelToSnake(String str){
        String result = "";

        char c = str.charAt(0);
        result = result + Character.toLowerCase(c);

        for (int i = 1; i < str.length(); i++) {

            char ch = str.charAt(i);
            if (Character.isUpperCase(ch)) {
                result = result + '_';
                result = result
                        + Character.toLowerCase(ch);
            }
            else {
                result = result + ch;
            }
        }
        return result;
    }

}