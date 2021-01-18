package models;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.*;


public class Sim{
    ArrayList <Person> everyoneInSim = new ArrayList<Person>();
    ArrayList <Pod> podsInSim = new ArrayList<Pod>();
    private int numPeople = 0;
    private int numPods = 0;
    private ArrayList<String> simLog = new ArrayList<String>();
    int numPodSpread;
    int numActivitySpread; 

    
    

    public Sim(int desiredNumberOfPods, ArrayList<Integer> podSizes){
        Person.createHashmap();
        this.createPods(desiredNumberOfPods, podSizes);
    }

  

    public void createPods(int desiredNumberOfPods, ArrayList<Integer> podSizes){
        /*Pod thisPod = new Pod(14, numPods);
        numPeople += 1;
        Person p = new Person( 14,  1, "bob", numPeople);
        everyoneInSim.add(p);
        thisPod.addPersonToPod(p);
        podsInSim.add(thisPod);
        numPods++;*/


        for(int i = 0; i < desiredNumberOfPods; i++){
            createPodWithRandomPeople(podSizes.get(i));
            // createPodWithRandomPeople(1); //change


        }
    }
 
    private void createPodWithRandomPeople(int numPeople){
        Pod thisPod = new Pod(randBetween(1, 14), numPods);
        podsInSim.add(thisPod);
        for(int i = 0; i < numPeople; i++){
            Person p = createRandomPerson();
            everyoneInSim.add(p);
            thisPod.addPersonToPod(p);
        }
        numPods++;
        
    }
    public void runSim(int numDays){
        for(int day = 1; day < numDays; day++){
            //System.out.println("DAY "+ day);
            simLog.add("DAY " + day );
            for (int i = 0; i< everyoneInSim.size(); i++) {
                //System.out.println("SIMULATINGPERSON");
                //System.out.println(everyoneInSim.get(i).simulatePerson());
                String message1 = everyoneInSim.get(i).simulatePerson();
                if(message1.length() > 0){
                    simLog.add(message1);
                }
                
            }
            for (int i = 0; i< podsInSim.size(); i++) {
                String message2 = podsInSim.get(i).simulatePod();
                if(message2.length() > 1){
                    simLog.add(message2);
                }
            }
        }
    }
    private Person createRandomPerson(){
        numPeople += 1;
        // return new Person( randBetween(1, 14),  1, "bob", numPeople); // change

        return new Person( randBetween(1, 14),  randBetween(1,9), "bob", numPeople);
    }
    public static int randBetween(int min, int max){
        int range = max - min + 1;
        return (int)(Math.random() * range) + min;
    }
    /*
    public void printReport(){
        System.out.println("\n\n\n");
        for(Person a: everyoneInSim){
            if(a.hasCovid()){
                System.out.printf("Person %d Got COVID on day %d\n", a.getID(), a.getCompromisedDate());
                if(a.getCompromisedDate()==-1){
                    numPodSpread++;
                }else{
                    numActivitySpread++;
                }
            }else{
                System.out.printf("Person %d did NOT get COVID\n", a.getID());
            }
            
        }
        for(Pod p: podsInSim){
            if (p.compromised()) {
                 System.out.printf("POD %d COMPROMISED on day %d by Person %d\n", p.getID(), p.getCompromisedDate(), p.getCompromisedPerson());
            } else {
                System.out.printf("POD %d NOT COMPROMISED\n", p.getID());         
            }
        }
        System.out.println("Activity: " + numActivitySpread + " Pod: " + numPodSpread);
    }
    */

    public String toJSON(){
        JSONObject responseJSON= new JSONObject();
        for(Pod p: podsInSim){
            //System.out.println("doing a pod in sim");
            JSONObject tempJSON = p.toJSON();
            responseJSON.putJSONObject(p.getID(), tempJSON );
        }
        System.out.println("simLog: " + simLog);
        responseJSON.putArrayListString("DayByDay", this.simLog);
        //System.out.println("done with pods in sim");
        return responseJSON.toString();
    }
   
}