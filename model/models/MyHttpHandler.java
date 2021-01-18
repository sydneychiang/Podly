package models; 

import java.util.ArrayList;

import java.io.IOException;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.net.InetSocketAddress;
import java.util.concurrent.ThreadPoolExecutor;

import java.util.concurrent.Executors;
import java.util.concurrent.ThreadPoolExecutor;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

public class MyHttpHandler implements HttpHandler {
    public static void main(String [] args){
        HttpServer server;
        try{
            int portNumber = 8008;
            server = HttpServer.create(new InetSocketAddress("localhost", portNumber), 10);
            ThreadPoolExecutor threadPoolExecutor = (ThreadPoolExecutor)Executors.newFixedThreadPool(10);
            server.createContext("/simulation", new  MyHttpHandler());
            server.setExecutor(threadPoolExecutor);
            server.start();
            System.out.println(" Server started on port " + portNumber);
        }catch(Exception e){
            System.out.println("There was an exception lmao.");
        }
        
    }

    public void handle(HttpExchange hExchange) throws IOException{
        String requestParamValue=null;
        hExchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");

        //System.out.println("httpexchange");
        if ("GET".equals(hExchange.getRequestMethod())) {
            System.out.println(hExchange.getRequestURI().toString());
            String urlParam = hExchange.getRequestURI().toString();//.split("\\?")[1].split("=");
            handleResponse(hExchange, urlParam);
        }
    }
    private String handleResponse(HttpExchange httpExchange, String requestParamValue) throws IOException {
        OutputStream outputStream = httpExchange.getResponseBody();
        OutputStreamWriter osw = new OutputStreamWriter(outputStream, "UTF-8");
        StringBuilder json = new StringBuilder();

        String[] requestArray = requestParamValue.split("\\?");
        
        String[] params = requestArray[1].split("\\&");
        
        int numDays = Integer.parseInt(params[0].split("\\=")[1]);
        ArrayList<Integer> podSizes = new ArrayList<Integer>();

        //System.out.println(params.length);
        for (int i = 1; i < params.length; i++) {
            podSizes.add(Integer.parseInt(params[i].split("=")[1]));
        }   

        // numDays
        // numPods --> podSizes.size()
        // podSizes

        Sim s = new Sim(podSizes.size(), podSizes);
        s.runSim(numDays);
        System.out.println(s.toJSON());


        json.append(s.toJSON());
        

        httpExchange.sendResponseHeaders(200, json.toString().length());
        osw.write(json.toString());
        osw.flush();
        osw.close();
        return ";";

    }

}

