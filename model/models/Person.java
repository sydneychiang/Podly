package models;
import java.util.*;
 
public class Person{
    private String name;
    private final int riskInterval;// how often they go out
    private final int riskLimit;// how risky they are 
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
    public void simulatePerson(){
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
                System.out.println("\t\tPerson " + this.id + " got covid from " + getActivityFromRiskLevel(rand));
            }
            else{
                System.out.println("\tPerson " + this.id + " did not get covid from " + getActivityFromRiskLevel(rand));
            }
        }
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
        hm.put(1, new ArrayList<String>(Arrays.asList(new String[]{"getting the mail"})));
        hm.put(2, new ArrayList<String>(Arrays.asList(new String[]{"restaurant takeout", " pumping gas", " camping" })));
        hm.put(3, new ArrayList<String>(Arrays.asList(new String[]{ "grocery shopping", "walking with others", "golfing" })));
        hm.put(4, new ArrayList<String>(Arrays.asList(new String[]{ "restaurant dining outside ", "going to a library", "playground", })));
        hm.put(5, new ArrayList<String>(Arrays.asList(new String[]{ "outdoor barbeque", "going to a beach", "shopping at the mall" })));
        hm.put(6, new ArrayList<String>(Arrays.asList(new String[]{ "swimming at a public pool", "going to school", "going to day care", "going to camp", "working in an office" })));
        hm.put(7, new ArrayList<String>(Arrays.asList(new String[]{"indoor dining at a restaurant", "getting a haircut", "shaking hands", "traveling by plane", 
                        "attending a wedding", "attending a funeral", "playing basketball", "playing football"})));
        hm.put(8, new ArrayList<String>(Arrays.asList(new String[]{ "eating at a buffet", "working out in a gym", "going to a movie theater" })));
        hm.put(9, new ArrayList<String>(Arrays.asList(new String[]{ "going to a bar", "attending a church with over 500 people", "going to a stadium" })));
    }
    public String getCompromiseActivity(){
        return this.compromiseActivity;
    }
    
    
}