package models;

import java.util.ArrayList;


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

        for(int i = 0; i < desiredNumberOfPods; i++){
            createPodWithRandomPeople(podSizes.get(i));
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
            simLog.add("DAY " + day );
            for (int i = 0; i< everyoneInSim.size(); i++) {
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
        return new Person( randBetween(1, 14),  randBetween(1,9), "bob", numPeople);
    }

    public static int randBetween(int min, int max){
        int range = max - min + 1;
        return (int)(Math.random() * range) + min;
    }

    public String toJSON(){
        JSONObject responseJSON= new JSONObject();
        for(Pod p: podsInSim){
            JSONObject tempJSON = p.toJSON();
            responseJSON.putJSONObject(p.getID(), tempJSON );
        }
        System.out.println("simLog: " + simLog);
        responseJSON.putArrayListString("DayByDay", this.simLog);
        return responseJSON.toString();
    }
   
}