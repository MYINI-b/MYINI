package com.ssafy.myini.fileio;

import com.ssafy.myini.ERD.response.ConditionItemDto;
import com.ssafy.myini.ERD.response.ErdTableListResponse;
import com.ssafy.myini.ERD.response.TableColumnDto;
import com.ssafy.myini.initializer.request.InitializerRequest;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;

public class EntityWrite {
    public static void entityWrite(ErdTableListResponse erdTableListResponse, InitializerRequest initializerRequest){
        String columnContents = columnWrite(erdTableListResponse);
        String relationContents = relationWrite(erdTableListResponse);

        String contents = "" +
                "package " + initializerRequest.getSpring_package_name() + ".entity;\n" +
                "\n"+
                "import lombok.*\n"+
                "import javax.persistence.*;\n"+
                "\n"+
                "@Entity\n"+
                "@NoArgsConstructor(access = AccessLevel.PROTECTED)\n"+
                "@AllArgsConstructor\n"+
                "@Getter\n"+
                "public class "+erdTableListResponse.getErdTableName()+" {\n"+
                ""+
                ""+
                ""+
                ""+
                ""+
                ""+
                ""+
                ""+
                ""+
                ""
                ;

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
            for (ConditionItemDto conditionItemDto : tableColumnDto.getConditionItemDtos()) {
                //pk일때
                if (conditionItemDto.getConditionItemName().equals("pk")){
                    columnContents += "@Id\n@GeneratedValue(strategy = GenerationType.IDENTITY)\n";
                }
                //unique일때
                if (conditionItemDto.getConditionItemName().equals("unique")){
                    columnContents += "@Column(unique = true)\n";
                }
                //notnull일때
                if (conditionItemDto.getConditionItemName().equals("notnull")){
                    columnContents += "@Column(nullable = false)\n";
                }
            }

            //자료형 + 변수명 추가
            columnContents += "private " + tableColumnDto.getTableColumnType() + " " + tableColumnDto.getTableColumnName() + ";\n\n";
        }

        return columnContents;
    }

    public static String relationWrite(ErdTableListResponse erdTableListResponse){
        String relationContents = "";

        

        return relationContents;
    }

}