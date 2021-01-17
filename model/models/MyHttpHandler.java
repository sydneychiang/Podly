package models; 

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
            server = HttpServer.create(new InetSocketAddress("localhost", 8001), 10);
            ThreadPoolExecutor threadPoolExecutor = (ThreadPoolExecutor)Executors.newFixedThreadPool(10);
            server.createContext("/simulation", new  MyHttpHandler());
            server.setExecutor(threadPoolExecutor);
            server.start();
            System.out.println(" Server started on port 8001");
        }catch(Exception e){
            System.out.println("There was an exception lmao.");
        }
        
    }

    public void handle(HttpExchange hExchange) throws IOException{
        String requestParamValue=null;
        if ("GET".equals(hExchange.getRequestMethod())) {
            System.out.println(hExchange.getRequestURI().toString());
            String urlParam = hExchange.getRequestURI().toString().split("\\?")[1].split("=")[1];
            handleResponse(hExchange, urlParam);
        }
    }
    private String handleResponse(HttpExchange httpExchange, String requestParamValue) throws IOException {
        OutputStream outputStream = httpExchange.getResponseBody();
        OutputStreamWriter osw = new OutputStreamWriter(outputStream, "UTF-8");
        StringBuilder json = new StringBuilder();

        System.out.println(requestParamValue);

        Sim s = new Sim(Integer.parseInt(requestParamValue));
        s.runSim(365);
        System.out.println(s.toJSON());


        json.append(s.toJSON());

        httpExchange.sendResponseHeaders(200, json.toString().length());
        osw.write(json.toString());
        osw.flush();
        osw.close();
        return ";";

    }

}

