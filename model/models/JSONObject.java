package models;
import java.util.ArrayList;

public class JSONObject {
    private String JSON = "";
   
    public String toString() {
        return "{" + ((JSON.length() == 0) ? "" : JSON.substring(0,JSON.length()-1)) + "}";
    }

    public void putArrayListInteger(Object key, ArrayList<Integer> value) {
        JSON = JSON +  "\""+ key.toString() + "\" : [";
        for(Object item: value){
            JSON = JSON + "\"" + item.toString() + "\",";
        }
        if(value.size() > 0){
            JSON = JSON.substring(0, JSON.length() - 1) + "],";
        }
        else{
            JSON = JSON + "],";
        }
    }
    public void putArrayListString(Object key, ArrayList<String > value) {
        JSON = JSON +  "\""+ key.toString() + "\" : [";
        for(Object item: value){
            JSON = JSON + "\"" + item.toString() + "\",";
        }
        if(value.size() > 0){
            JSON = JSON.substring(0, JSON.length() - 1) + "],";
        }
        else{
            JSON = JSON + "],";
        }
    }
    public void putArrayListBoolean(Object key, ArrayList<Boolean> value) {
        JSON = JSON +  "\""+ key.toString() + "\" : [";
        for(Object item: value){
            JSON = JSON + "\"" + item.toString() + "\",";
        }
        if(value.size() > 0){
            JSON = JSON.substring(0, JSON.length() - 1) + "],";
        }
        else{
            JSON = JSON + "],";
        }
    }

    public void putJSONObject(Object key, JSONObject value) {
        JSON = JSON +  "\""+ key.toString() + "\" : "+ value.toString() + ",";
    }
    public void put(Object key, Object value) {
        JSON = JSON +  "\""+ key.toString() + "\" : \""+ value.toString() + "\",";
    }

}   
