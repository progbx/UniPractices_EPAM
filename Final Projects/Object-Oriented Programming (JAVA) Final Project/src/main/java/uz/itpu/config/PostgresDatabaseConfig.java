package uz.itpu.config;

import java.io.BufferedReader;
import java.io.FileReader;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

public class PostgresDatabaseConfig {
    private static final String DB_URL = "jdbc:postgresql://localhost:5432/forOOP";
    private static final String USER = "postgres";
    private static final String PASSWORD = "444bbb";
    public static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(DB_URL, USER, PASSWORD);
    }

    public static void initializeSchemaFromFile(String filePath) {
        try (Connection connection = getConnection();
             Statement statement = connection.createStatement();
             BufferedReader reader = new BufferedReader(new FileReader(filePath))) {

            StringBuilder sqlBuilder = new StringBuilder();
            String line;

            while ((line = reader.readLine()) != null) {
                sqlBuilder.append(line);
                if (line.trim().endsWith(";")) {
                    statement.execute(sqlBuilder.toString());
                    sqlBuilder.setLength(0);
                }
            }

            System.out.println("Schema initialized successfully from " + filePath);
        } catch (Exception e) {
            e.printStackTrace();
            System.err.println("Failed to initialize schema from file: " + filePath);
        }
    }
}