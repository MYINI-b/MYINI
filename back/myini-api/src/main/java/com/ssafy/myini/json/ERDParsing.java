//package com.ssafy.myini.json;
//
//import org.json.simple.JSONArray;
//import org.json.simple.JSONObject;
//
//public class ERDParsing {
//    public static void tableParsing(JSONObject erd){
//        JSONObject table = (JSONObject) erd.get("table");
//        JSONArray tables = (JSONArray) table.get("tables");
//        for (int i=0 ; i<tables.size() ; i++){
//            JSONObject tableItem = (JSONObject) tables.get(i);
//            //테이블 이름
//            String erdTableName = (String) tableItem.get("name");
//
//            JSONArray columns = (JSONArray) tableItem.get("columns");
//            for (int j=0 ; j<columns.size() ; j++)
//
//
//        }
//
//    }
//
//    public static void relationParsing(){
//
//    }
//}
