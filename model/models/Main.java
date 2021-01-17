package models;

import java.util.ArrayList;

class Main {
 
    public static void main(String[] args) {
    
       Sim s = new Sim();
       s.createPods(50);
       s.runSim(30);
       s.printReport();
    }
}