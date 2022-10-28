package com.ssafy.myini.fileio;

import com.ssafy.myini.ERD.response.ConditionItemDto;
import com.ssafy.myini.ERD.response.ErdTableListResponse;
import com.ssafy.myini.ERD.response.TableColumnDto;
import com.ssafy.myini.initializer.request.InitializerRequest;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;

public class RepositoryWrite {
    public static void repositoryWrite(ErdTableListResponse erdTableListResponse, InitializerRequest initializerRequest){
        String pkType = "";
        la : for (TableColumnDto tableColumnDto : erdTableListResponse.getTableColumnDtos()) {
            for (ConditionItemDto conditionItemDto : tableColumnDto.getConditionItemDtos()) {
                if(conditionItemDto.getConditionItemName().equals("pk")) {
                    pkType = tableColumnDto.getTableColumnType();
                    break la;
                }
            }
        }

        String contents = "" +
                "package " + initializerRequest.getSpring_package_name() + ".repository;\n" +
                "\n"+
                "import " + initializerRequest.getSpring_package_name() + ".entity."+erdTableListResponse.getErdTableName()+";\n"+
                "import org.springframework.data.jpa.repository.JpaRepository;\n"+
                "\n"+
                "public interface "+ erdTableListResponse.getErdTableName() + "Repository extends JpaRepository<"+erdTableListResponse.getErdTableName()+", "+pkType+">{}"
                ;

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
            File file = new File(repositoryPath+erdTableListResponse.getErdTableName()+"Repository.java");
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
}
