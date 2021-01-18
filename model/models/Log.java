package models;
public class Log {
    StringBuilder logger;
    public Log(String initialValue) {
        logger = new StringBuilder();
        logger.append(initialValue);
    }
    public void add(String val) {
        logger.append(val + "\n");
    }
    public String get() {
        return logger.toString();
    }
}
