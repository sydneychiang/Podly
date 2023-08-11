package models;

class Main {
    public static void main(String[] args) {
        Log a = new Log("");
        a.add("hello");
        a.add("world");
        System.out.println(a.get());
        
    }
} 