package models;

import java.util.ArrayList;


public class Pod {
    private int id;
    private int numPeople = 0;
    ArrayList<Person> people = new ArrayList<Person>();
    private int meetingFrequency; // how many times this pod meets a week
    private int daysInSim;
    private boolean compromised = false;
    private int compromisedDate = -1;
    private int compromisedPerson = -1;
    private String compromiseActivity = "NA";
    private int compromiseInterval = -1;
    private int compromiseLimit = -1;
    
    public Pod(int meetingFrequency, int id) {
        this.id = id;
        this.meetingFrequency = meetingFrequency;
        System.out.println("Created POD " + id + " meetingFrequency: " + meetingFrequency);
    }
 
    public String simulatePod(){
        daysInSim += 1;
        String returnMessage = "";
        if(!compromised && daysInSim % meetingFrequency == 0){
            returnMessage = "POD " + this.id + " meeting on day " + daysInSim;
            //pod meets
            boolean covidTrue = false;
            for(Person p: people){ //if anyone has covid, give everyone in this pod covid
                if(p.hasCovid()) {
                    covidTrue = true;
                    returnMessage = returnMessage+ "POD " + this.id + " COMPROMISED";
                    this.compromised = true;
                    this.compromisedPerson = p.getID();
                    this.compromisedDate = daysInSim;
                    this.compromiseActivity = p.getCompromiseActivity();
                    this.compromiseInterval = p.getCompromiseInterval();
                    this.compromiseLimit = p.getCompromiseLimit();
                    break;
                }
            }
            if (covidTrue) {
                for (Person p : people)
                    p.giveCovid();
            }

        }
        return returnMessage;
    }

    public void addPersonToPod(Person a){
        people.add(a);
        numPeople++;
    }

    public int getNumPeople(){
        return numPeople;
    }

    public int getMeetingFrequency(){
        return meetingFrequency;
    }

    public int getID(){
        return this.id;
    }

    public boolean compromised(){
        return this.compromised;
    }

    public int getCompromisedDate(){
        return this.compromisedDate;
    }

    public int getCompromisedPerson(){
        return this.compromisedPerson;
    }

    public JSONObject toJSON(){
        System.out.println("pod to json");
        JSONObject responseJSON= new JSONObject();
        ArrayList<Integer> InfectedIDs = new ArrayList<Integer>();
        ArrayList<Integer> UninfectedIDs = new ArrayList<Integer>();
        int numInfected = 0;
        for(Person p: people){
            if(p.hasCovid()){
                numInfected++;
                InfectedIDs.add(p.getID());
            }
            else{
                UninfectedIDs.add(p.getID());
            }

        }

        responseJSON.put("isCovidFree", !compromised);
        responseJSON.put("numInfected", numInfected);
        responseJSON.putArrayListInteger("infectedIDs", InfectedIDs);
        responseJSON.putArrayListInteger("unInfectedIDs", UninfectedIDs);
        responseJSON.put("compromisedPerson", compromisedPerson);
        responseJSON.put("compromisedDate", compromisedDate);
        responseJSON.put("compromiseActivity", compromiseActivity);
        responseJSON.put("compromiseLimit", compromiseLimit); // FIX ME
        responseJSON.put("compromiseInterval", compromiseInterval ); // FIX ME
        
        return responseJSON;
    }
   
}    