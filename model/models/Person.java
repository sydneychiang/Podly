package models;
import java.util.*;
 
public class Person{
    private String name;
    private final int riskInterval; // how often they go out
    private final int riskLimit; // how risky they are 
    private final int id;
    private int daysInSim = 0;
    private int covidStatus = 0;
    private int compromisedDate = -1;
    private String compromiseActivity;
    private static HashMap<Integer, ArrayList<String>> hm = new HashMap<>();
    
    public Person(int riskInterval, int riskLimit, String name, int id){
        this.riskInterval = riskInterval;
        this.riskLimit = riskLimit;
        this.name = name;
        this.id = id;
        this.covidStatus = 0;
        this.daysInSim = 0;
        System.out.println("Created Person " + id + " RI " + riskInterval + " RL " + riskLimit);
    }
    public String simulatePerson(){
        this.daysInSim += 1;
        if(this.daysInSim % riskInterval == 0){
            //dice roll for getting covid w/ low probabilty, modify covidStatus if they get it
            
            int max = riskLimit;
            int min = 1;
            int range = max - min+1;
            int rand = (int)(Math.random() * range) + min;

            double riskPercentage = getChanceFromRiskLevel(rand);
            double maxPercentage = 100.0;
            double minPercentage = 0.0;
            double rangePercentage = maxPercentage - minPercentage;
            double randomCovidPercentage = (Math.random() * rangePercentage) + minPercentage;

            if (randomCovidPercentage/100 <= riskPercentage)
            {
                covidStatus = 1;
                if(compromisedDate == -1){
                    compromisedDate = daysInSim;
                    compromiseActivity = getActivityFromRiskLevel(rand);
                }
                return "-Person " + this.id + " got covid from " + compromiseActivity;
            }
            else{
                return "-Person " + this.id + " did not get covid from " + getActivityFromRiskLevel(rand);
            }
        }
        return "";
    }
    private double getChanceFromRiskLevel(int riskLevel){
        //exponent function here to convert from 1-9 to percentage chance
        return Math.pow(Math.E, 0.4087*riskLevel) * 0.0233 - 0.0233;
    }

    public boolean hasCovid(){
        return (this.covidStatus > 0) ? true  : false;
    }
    public void giveCovid(){
        this.covidStatus = 1;
    }
    public int getCompromisedDate(){
        return this.compromisedDate;
    }
    public int getID(){
        return this.id;
    }
    public int getCompromiseInterval(){
        return this.riskInterval;
    }
    public int getCompromiseLimit(){
        return this.riskLimit;
    }

    public String getActivityFromRiskLevel(int riskLevel){
        ArrayList<String> optionsArray = hm.get(riskLevel);
        return optionsArray.get(Sim.randBetween(0, optionsArray.size()-1));
    }

    public static void createHashmap () {
        hm.put(1, new ArrayList<String>(Arrays.asList(new String[]{"Getting the mail"})));
        hm.put(2, new ArrayList<String>(Arrays.asList(new String[]{"Getting restaurant takeout", "Pumping gas", " Camping" })));
        hm.put(3, new ArrayList<String>(Arrays.asList(new String[]{ "Grocery shopping", "Walking with others", "Golfing" })));
        hm.put(4, new ArrayList<String>(Arrays.asList(new String[]{ "Restaurant dining outside ", "Going to a library", "Playing at a playground", })));
        hm.put(5, new ArrayList<String>(Arrays.asList(new String[]{ "Attending an outdoor barbeque", "Going to a beach", "Shopping at the mall" })));
        hm.put(6, new ArrayList<String>(Arrays.asList(new String[]{ "Swimming at a public pool", "Going to school", "Going to day care", "Going to camp", "Working in an office" })));
        hm.put(7, new ArrayList<String>(Arrays.asList(new String[]{"Indoor dining at a restaurant", "Getting a haircut", "Shaking hands", "Traveling by plane", 
                        "Attending a wedding", "Attending a funeral", "Playing basketball", "Playing football"})));
        hm.put(8, new ArrayList<String>(Arrays.asList(new String[]{ "Eating at a buffet", "Working out in a gym", "Going to a movie theater" })));
        hm.put(9, new ArrayList<String>(Arrays.asList(new String[]{ "Going to a bar", "Attending a church with over 500 people", "Going to a stadium" })));
    }
    public String getCompromiseActivity(){
        return this.compromiseActivity;
    }
    
    
    
}