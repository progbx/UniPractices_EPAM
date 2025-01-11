package uz.itpu.config;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.*;
import java.sql.Connection;
import java.sql.SQLException;
import java.io.*;

class PostgresDatabaseConfigTest {

    @BeforeEach
    void setUp() throws SQLException {
        // Set up code if needed
    }

    @AfterEach
    void tearDown() throws SQLException {
        // Clean up code if needed
    }

    @Test
    void testGetConnection() {
        try {
            Connection connection = PostgresDatabaseConfig.getConnection();
            assertNotNull(connection);
            assertFalse(connection.isClosed());
        } catch (SQLException e) {
            fail("Connection should be established.");
        }
    }

    @Test
    void testInitializeSchemaFromFile() {
        String testFilePath = "test_schema.sql";
        createTestFile(testFilePath);

        try {
            PostgresDatabaseConfig.initializeSchemaFromFile(testFilePath);
            // Add assertions to verify the schema initialization
        } finally {
            deleteTestFile(testFilePath);
        }
    }

    @Test
    void testSchemaInitializationWithMultipleStatements() {
        String testFilePath = "test_multi_statements.sql";
        createTestFileWithMultipleStatements(testFilePath);

        try {
            PostgresDatabaseConfig.initializeSchemaFromFile(testFilePath);
            // Add assertions to verify the schema initialization
        } finally {
            deleteTestFile(testFilePath);
        }
    }

    void createTestFile(String filePath) {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(filePath))) {
            writer.write("CREATE TABLE test_table (id SERIAL PRIMARY KEY, name VARCHAR(255));");
            writer.write("INSERT INTO test_table (name) VALUES ('test_name');");
        } catch (IOException e) {
            fail("Failed to create test file: " + filePath);
        }
    }

    void createTestFileWithMultipleStatements(String filePath) {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(filePath))) {
            writer.write("CREATE TABLE test_table (id SERIAL PRIMARY KEY, name VARCHAR(255));");
            writer.write("INSERT INTO test_table (name) VALUES ('test_name');");
            writer.write("CREATE TABLE another_table (id SERIAL PRIMARY KEY, description TEXT);");
        } catch (IOException e) {
            fail("Failed to create test file: " + filePath);
        }
    }

    void deleteTestFile(String filePath) {
        File file = new File(filePath);
        if (file.exists()) {
            assertTrue(file.delete(), "Test file should be deleted.");
        }
    }
}
