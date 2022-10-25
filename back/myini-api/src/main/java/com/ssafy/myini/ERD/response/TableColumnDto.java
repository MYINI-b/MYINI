package com.ssafy.myini.ERD.response;

import com.ssafy.myini.ERD.domain.entity.TableColumn;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TableColumnDto {
    private Long tableColumnId;
    private String tableColumnName;
    private List<ConstraintDto> constraintDtos;

    public static TableColumnDto from(TableColumn tableColumn){
        TableColumnDto tableColumnDto = new TableColumnDto();
        tableColumnDto.tableColumnId = tableColumn.getTableColumnId();
        tableColumnDto.tableColumnName = tableColumn.getTableColumnName();
        tableColumnDto.constraintDtos = tableColumn.getColumnConditions().stream().map(ConstraintDto::from).collect(Collectors.toList());

        return tableColumnDto;
    }
}
