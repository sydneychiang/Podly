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
    
    public Pod(int meetingFrequency, int id) {
        this.id = id;
        this.meetingFrequency = meetingFrequency;
        System.out.println("Created POD " + id + " meetingFrequency: " + meetingFrequency);
    }
 
    public void simulatePod(){
        daysInSim += 1;
        if(!compromised && daysInSim % meetingFrequency == 0){
            System.out.println("POD meeting on day " + daysInSim);
            //pod meets
            boolean covidTrue = false;
            for(Person p: people){//if anyone has covid, give everyone in this pod covid
                if(p.hasCovid()) {
                    covidTrue = true;
                    System.out.println("POD " + this.id + " COMPROMISED");
                    this.compromised = true;
                    this.compromisedPerson = p.getID();
                    this.compromisedDate = daysInSim;
                    break;
                }
            }
            if (covidTrue) {
                for (Person p : people)
                    p.giveCovid();
            }

        }
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
   
}    