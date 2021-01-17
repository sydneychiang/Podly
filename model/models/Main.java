package models;

import java.util.ArrayList;

class Main {
 
    public static void main(String[] args) {
    
    //    Sim s = new Sim();
    //    s.createPods(50);
    //    s.runSim(30);
    //    s.printReport();]
        JSONObject obj = new JSONObject();
        obj.put("hello", "world");
        obj.put("abc", "123");
        obj.put("rishi", "godugu");
        obj.put("amar", 123);
        obj.put("tim", 4);
        obj.put("booleanTest", false);
        System.out.println(obj.toString());

        JSONObject obj2 = new JSONObject();
        ArrayList<Integer> arr = new ArrayList<Integer>();
        
        obj2.putArrayListInteger("testArray", arr);
        System.out.println(obj2.toString());


        
        
    }
} 