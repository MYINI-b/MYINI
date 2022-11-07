package com.ssafy.myini.fileio;

import com.ssafy.myini.InitializerException;
import com.ssafy.myini.initializer.request.InitializerRequest;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.jdbc.support.JdbcUtils;
import java.util.ArrayList;
import java.util.List;

public class EntityWrite {
    static StringBuilder entityImportContents;
    static StringBuilder entityAnnotationContents;
    static List<Table> tableList = new ArrayList<>();
    static List<Column> columnList = new ArrayList<>();
    static List<RelationEndColumn> relationEndColumnList = new ArrayList<>();
    private static int depth = 0;

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
    public static String entityPreview(JSONObject tableItem,JSONObject relationship, InitializerRequest initializerRequest) throws Exception{
        JSONArray relationships = (JSONArray) relationship.get("relationships");

        //entity 작성 시작
            entityImportContents = new StringBuilder();
            entityAnnotationContents = new StringBuilder();

            //필수 import 선언
            entityImportContents.append("import lombok.*;\nimport javax.persistence.*;\n");
            entityAnnotationContents.append("@Entity\n@NoArgsConstructor(access = AccessLevel.PROTECTED)\n@AllArgsConstructor\n@Getter\n");
            StringBuilder contents = new StringBuilder();

            String tableName = (String) tableItem.get("name");
            String tableId = (String) tableItem.get("id");

            JSONArray columns = (JSONArray) tableItem.get("columns");

            depth++;
            //컬럼 작성
            StringBuilder columnContents = columnWrite(columns);
//            //연관관계 작성
            StringBuilder relationContents = relationWrite(tableId, relationships, initializerRequest);
            depth--;

            //패키지, 클래스메인함수 등 작성
            contents.append("package " + initializerRequest.getSpringPackageName() + ".entity;\n")
                    .append("\n")
                    .append(entityImportContents)
                    .append("\n")
                    .append(entityAnnotationContents)
                    .append("public class "+tableName+" {\n\n")
                    .append(columnContents)
                    .append(relationContents);

            FileUtil.appendTab(contents,depth);
            contents.append("}");

        return contents.toString();
    }

    public static void entityWrite(JSONObject tableItem,JSONObject relationship,InitializerRequest initializerRequest) {
        try {
        FileUtil.fileWrite(initializerRequest, entityPreview(tableItem, relationship,initializerRequest), "entity", (String) tableItem.get("name"));
        }catch (Exception e){
            throw new InitializerException(InitializerException.INITIALIZER_FAIL);
        }
    }



    public static StringBuilder columnWrite(JSONArray columns){
        StringBuilder columnContents = new StringBuilder();

        //한 entity에 있는 컬럼 수만큼 돌기
        for (int i=0 ; i<columns.size() ; i++){
            JSONObject column = (JSONObject) columns.get(i);

            //컬럼 정보들
            String columnName = (String) column.get("name");
            String columnId = (String) column.get("id");
            String columnDataType = (String) column.get("dataType");
            String columnJavaDataType = dataTypeChange(columnDataType);
            String columnDefault = (String) column.get("default");

            JSONObject option = (JSONObject) column.get("option");

            Boolean primaryKey = (Boolean) option.get("primaryKey");
            Boolean unique = (Boolean) option.get("unique");
            Boolean notNull = (Boolean) option.get("notNull");

            //연관관계로 작성해야 하는 컬럼이 아닌 컬럼들 작성
            if(!relationEndColumnList.contains(columnId)) {
                Boolean isPk = false;
                String flag = "";
                //pk일때
                if (primaryKey) {
                    isPk = true;
                    FileUtil.appendTab(columnContents,depth);
                    columnContents.append("@Id\n");
                    FileUtil.appendTab(columnContents,depth);
                    columnContents.append("@GeneratedValue(strategy = GenerationType.IDENTITY)\n");
                    FileUtil.appendTab(columnContents,depth);
                    columnContents.append("@Column(name=\"" + columnName + "\")\n");
//                    columnContents.append("@Id\n@GeneratedValue(strategy = GenerationType.IDENTITY)\n" +
//                            "@Column(name=\"" + columnName + "\")\n");
                }
                //unique 일때
                if (unique) {
                    flag += "u";
                }
                //notnull 일때
                if (notNull) {
                    flag += "n";
                }
                //default 일때
                if (!columnDefault.equals("")) {
                    flag += "d";
                }

                //default 일때 어노테이션과 임포트 추가
                if(flag.contains("d") && !entityAnnotationContents.toString().contains("@DynamicInsert\n@DynamicUpdate\n")) {
                    entityAnnotationContents.append("@DynamicInsert\n@DynamicUpdate\n");
                    entityImportContents.append("import org.hibernate.annotations.DynamicInsert;\n" +
                            "import org.hibernate.annotations.DynamicUpdate;\n");
                }

                //pk 가아닌 컬럼의 제약조건 설정
                if(!isPk && (flag.contains("u") || flag.contains("n") || flag.contains("d"))) {
                    FileUtil.appendTab(columnContents,depth);
                    if (flag.contains("u") && flag.contains("n") && flag.contains("d"))
                        columnContents.append("@Column(unique = true, nullable = false, columnDefinition=\""+columnDataType.split("\\(")[0]+" default "+(columnDataType.contains("VARCHAR") || columnDataType.contains("CHAR")?"'"+columnDefault+"'":columnDefault)+"\")\n");
                    else if (flag.contains("u") && flag.contains("n") && !flag.contains("d"))
                        columnContents.append("@Column(unique = true, nullable = false)\n");
                    else if (flag.contains("u") && !flag.contains("n") && flag.contains("d"))
                        columnContents.append("@Column(unique = true, columnDefinition=\""+columnDataType.split("\\(")[0]+" default "+(columnDataType.contains("VARCHAR") || columnDataType.contains("CHAR")?"'"+columnDefault+"'":columnDefault)+"\")\n");
                    else if (flag.contains("u") && !flag.contains("n") && !flag.contains("d"))
                        columnContents.append("@Column(unique = true)\n");
                    else if (!flag.contains("u") && flag.contains("n") && flag.contains("d"))
                        columnContents.append("@Column(nullable = false, columnDefinition=\""+columnDataType.split("\\(")[0]+" default "+(columnDataType.contains("VARCHAR") || columnDataType.contains("CHAR")?"'"+columnDefault+"'":columnDefault)+"\")\n");
                    else if (!flag.contains("u") && flag.contains("n") && !flag.contains("d"))
                        columnContents.append("@Column(nullable = false)\n");
                    else if (!flag.contains("u") && !flag.contains("n") && flag.contains("d"))
                        columnContents.append("@Column(columnDefinition=\""+columnDataType.split("\\(")[0]+" default "+(columnDataType.contains("VARCHAR") || columnDataType.contains("CHAR")?"'"+columnDefault+"'":columnDefault)+"\")\n");

                    //자료형 + 변수명 추가
                    FileUtil.appendTab(columnContents,depth);
                    columnContents.append("private " + columnJavaDataType + " " + JdbcUtils.convertUnderscoreNameToPropertyName(columnName) + ";\n\n");
                }else{
                    //자료형 + 변수명 추가
                    FileUtil.appendTab(columnContents,depth);
                    columnContents.append("private " + columnJavaDataType + " " + JdbcUtils.convertUnderscoreNameToPropertyName(columnName) + ";\n\n");
                }



            }
        }
        return columnContents;
    }

    public static StringBuilder relationWrite(String tableId, JSONArray relationships, InitializerRequest initializerRequest){
        StringBuilder relationContents = new StringBuilder();
        StringBuilder ManyToOneContents = new StringBuilder();
        StringBuilder OneToManyContents = new StringBuilder();

        //연관관계가 겹치면 리스트 뒤에 붙을 인덱스
        int OneToManyIndex = 1;

        //연관관계 수만큼 for문
        for (int i=0 ; i<relationships.size() ; i++){
            JSONObject relationship = (JSONObject) relationships.get(i);
            JSONObject start = (JSONObject) relationship.get("start");
            String startTableId = (String) start.get("tableId");
            String startTableName = "";

            //Json에 테이블 아이디만 있고 이름이 없기 때문에 미리 모아둔 테이블리스트에서 맞는 ID에 따른 이름설정
            for (Table table : tableList) {
                if(table.tableId.equals(startTableId)) startTableName = table.tableName;
            }
            JSONObject end = (JSONObject) relationship.get("end");
            String endTableId = (String) end.get("tableId");
            String endTableName = "";

            //Json에 테이블 아이디만 있고 이름이 없기 때문에 미리 모아둔 테이블리스트에서 맞는 ID에 따른 이름설정
            for (Table table : tableList) {
                if(table.tableId.equals(endTableId)) endTableName = table.tableName;
            }

            JSONArray columnIds = (JSONArray) end.get("columnIds");
            String endColumnName = "";

            //Json에 컬럼 아이디만 있고 이름이 없기 때문에 미리 모아둔 컬럼리스트에서 맞는 ID에 따른 이름설정
            for (Column column : columnList) {
                if(column.columnId.equals(columnIds.get(0))) endColumnName = column.columnName;
            }

            //ManyToOne 작성
            if(tableId.equals(endTableId)){
                FileUtil.appendTab(ManyToOneContents,depth);
                ManyToOneContents.append("@ManyToOne(fetch = FetchType.LAZY)\n");
                FileUtil.appendTab(ManyToOneContents,depth);
                ManyToOneContents.append("@JoinColumn(name = \""+endColumnName+"\")\n");
                FileUtil.appendTab(ManyToOneContents,depth);
                ManyToOneContents.append("private "+startTableName+" "+JdbcUtils.convertUnderscoreNameToPropertyName(endColumnName.substring(0,endColumnName.length()-3))+";\n\n");

//                ManyToOneContents.append("@ManyToOne(fetch = FetchType.LAZY)\n"+
//                        "@JoinColumn(name = \""+endColumnName+"\")\n"+
//                        "private "+startTableName+" "+JdbcUtils.convertUnderscoreNameToPropertyName(endColumnName.substring(0,endColumnName.length()-3))+";\n\n");

                entityImportContents.append("import "+ initializerRequest.getSpringPackageName() + ".entity." + startTableName+";\n");
            }

            //OneToMany 작성
            if(tableId.equals(startTableId)){
                entityImportContents.append("import java.util.*;\n");
                //같은 리스트가 여러개일때 (ex. 같은 pk 두개를 fk 로써 받고있을 때)
                if(!OneToManyContents.toString().contains(endTableName.substring(0,1).toLowerCase()+endTableName.substring(1)+"List")){
                    FileUtil.appendTab(OneToManyContents,depth);
                    OneToManyContents.append("@OneToMany(mappedBy = \""+JdbcUtils.convertUnderscoreNameToPropertyName(endColumnName.substring(0,endColumnName.length()-3))+"\", fetch = FetchType.LAZY, cascade = CascadeType.ALL)\n");
                    FileUtil.appendTab(OneToManyContents,depth);
                    OneToManyContents.append("private List<"+endTableName+"> "+endTableName.substring(0,1).toLowerCase()+endTableName.substring(1)+"List = new ArrayList<>();\n\n");
                }else{
                    FileUtil.appendTab(OneToManyContents,depth);
                    OneToManyContents.append("@OneToMany(mappedBy = \""+JdbcUtils.convertUnderscoreNameToPropertyName(endColumnName.substring(0,endColumnName.length()-3))+"\", fetch = FetchType.LAZY, cascade = CascadeType.ALL)\n");
                    FileUtil.appendTab(OneToManyContents,depth);
                    OneToManyContents.append("private List<"+endTableName+"> "+endTableName.substring(0,1).toLowerCase()+endTableName.substring(1)+"List"+(OneToManyIndex++)+" = new ArrayList<>();\n\n");
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

    public static void setTableAndColumn(JSONObject erd) {
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

}