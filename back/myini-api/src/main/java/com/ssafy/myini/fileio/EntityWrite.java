package com.ssafy.myini.fileio;

import com.ssafy.myini.erd.response.ConditionItemDto;
import com.ssafy.myini.erd.response.ErdTableListResponse;
import com.ssafy.myini.erd.response.TableColumnDto;
import com.ssafy.myini.erd.response.TableRelationDto;
import com.ssafy.myini.initializer.request.InitializerRequest;
import org.springframework.jdbc.support.JdbcUtils;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.util.List;

public class EntityWrite {
    static String entityImportContents = "";

    public static void entityWrite(List<ErdTableListResponse> erdTableListResponses, ErdTableListResponse erdTableListResponse, InitializerRequest initializerRequest){
        entityImportContents="";
        entityImportContents += "import lombok.*;\n"+
                "import javax.persistence.*;\n";
        String columnContents = columnWrite(erdTableListResponse);
        String relationContents = relationWrite(erdTableListResponses, erdTableListResponse, initializerRequest);

        String contents = "" +
                "package " + initializerRequest.getSpring_package_name() + ".entity;\n" +
                "\n"+
                entityImportContents+
                "\n"+
                "@Entity\n"+
                "@NoArgsConstructor(access = AccessLevel.PROTECTED)\n"+
                "@AllArgsConstructor\n"+
                "@Getter\n"+
                "public class "+erdTableListResponse.getErdTableName()+" {\n\n"+
                columnContents+
                relationContents+
                "api문서 다써지면 create나 update추가하기\n\n"+
                "}";

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
            File file = new File(entityPath+erdTableListResponse.getErdTableName()+".java");
            if (!file.exists()) {
                folder.createNewFile();
            }

            //파일 쓰기
            FileWriter fw = new FileWriter(file);
            BufferedWriter writer = new BufferedWriter(fw);
            writer.write(contents);
            writer.close();

        }catch (Exception e){
            System.out.println("e = " + e);
        }
    }
    
    public static String columnWrite(ErdTableListResponse erdTableListResponse){
        String columnContents = "";

        for (TableColumnDto tableColumnDto : erdTableListResponse.getTableColumnDtos()) {
            //제약조건 어노테이션 추가
            String flag = "";
            for (ConditionItemDto conditionItemDto : tableColumnDto.getConditionItemDtos()) {

                //pk일때
                if (conditionItemDto.getConditionItemName().equals("pk")){
                    columnContents += "@Id\n@GeneratedValue(strategy = GenerationType.IDENTITY)\n"+
                            "@Column(name=\""+CamelToSnake(erdTableListResponse.getErdTableName())+"_id\")\n";
                }
                //unique일때
                if (conditionItemDto.getConditionItemName().equals("unique")){
                    flag += "u";
                }
                //notnull일때
                if (conditionItemDto.getConditionItemName().equals("notnull")){
                    flag += "n";
                }
            }

            if(flag.contains("u") && flag.contains("n")) columnContents += "@Column(unique = true, nullable = false)\n";
            else if(flag.contains("u") && !flag.contains("n")) columnContents += "@Column(unique = true)\n";
            else if(!flag.contains("u") && flag.contains("n")) columnContents += "@Column(nullable = false)\n";

            //자료형 + 변수명 추가
                columnContents += "private " + tableColumnDto.getTableColumnType() + " " + JdbcUtils.convertUnderscoreNameToPropertyName(tableColumnDto.getTableColumnName()) + ";\n\n";

        }

        return columnContents;
    }

    public static String relationWrite(List<ErdTableListResponse> erdTableListResponses, ErdTableListResponse erdTableListResponse, InitializerRequest initializerRequest){
        String relationContents = "";

        //ManyToOne 설정
        for (ErdTableListResponse erdTableListResponse1 : erdTableListResponses) {
            for (TableRelationDto tableRelationDto : erdTableListResponse1.getTableRelationDtos()) {
                if(tableRelationDto.getToTableId() == erdTableListResponse.getErdTableId()){
                    relationContents += "@ManyToOne(fetch = FetchType.LAZY)\n"+
                            "@JoinColumn(name = \""+CamelToSnake(erdTableListResponse1.getErdTableName())+"_id\")\n"+
                            "private "+erdTableListResponse1.getErdTableName()+" "+erdTableListResponse1.getErdTableName().substring(0,1).toLowerCase()+erdTableListResponse1.getErdTableName().substring(1)+";\n\n";

                    entityImportContents += "import "+ initializerRequest.getSpring_package_name() + ".entity." + erdTableListResponse1.getErdTableName()+";\n";
                }
            }
        }

        //OneToMany 설정
        if(erdTableListResponse.getTableRelationDtos().size() != 0){
            entityImportContents += "import java.util.ArrayList;\n"+
                    "import java.util.List;\n";
            for (TableRelationDto tableRelationDto : erdTableListResponse.getTableRelationDtos()) {
                relationContents += "@OneToMany(mappedBy = \""+erdTableListResponse.getErdTableName().substring(0,1).toLowerCase()+erdTableListResponse.getErdTableName().substring(1)+"\", fetch = FetchType.LAZY, cascade = CascadeType.ALL)\n"+
                        "private List<"+tableRelationDto.getToTableName()+"> "+tableRelationDto.getToTableName().substring(0,1).toLowerCase()+tableRelationDto.getToTableName().substring(1)+"List = new ArrayList<>();\n\n";
            }
        }
        return relationContents;
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