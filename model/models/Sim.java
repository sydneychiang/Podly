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
    int numPodSpread;
    int numActivitySpread; 
    
    public Sim(){
        Person.createHashmap();
    }

  

    public void createPods(int desiredNumberOfPods){
        /*Pod thisPod = new Pod(14, numPods);
        numPeople += 1;
        Person p = new Person( 14,  1, "bob", numPeople);
        everyoneInSim.add(p);
        thisPod.addPersonToPod(p);
        podsInSim.add(thisPod);
        numPods++;*/


        for(int i = 0; i < desiredNumberOfPods; i++){
            createPodWithRandomPeople(randBetween(2,15));
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
            System.out.println("DAY "+ day);
            for (int i = 0; i< everyoneInSim.size(); i++) {
                everyoneInSim.get(i).simulatePerson();
            }
            for (int i = 0; i< podsInSim.size(); i++) {
                podsInSim.get(i).simulatePod();
            }
        }
    }
    private Person createRandomPerson(){
        numPeople += 1;
        return new Person( randBetween(1, 14),  randBetween(1,9), "bob", numPeople);
    }
    public static int randBetween(int min, int max){
        int range = max - min + 1;
        return (int)(Math.random() * range) + min;
    }
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
   
}