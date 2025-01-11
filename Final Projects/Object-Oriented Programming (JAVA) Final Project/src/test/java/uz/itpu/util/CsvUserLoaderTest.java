package uz.itpu.util;

import uz.itpu.dao.UserDao;
import uz.itpu.models.User;
import uz.itpu.security.PasswordHasher;
import org.junit.jupiter.api.*;
import org.mockito.*;

import java.io.*;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.assertTrue;

class CsvUserLoaderTest {

    @Mock
    private UserDao userDao;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testLoadUsers() throws IOException {
        String testFilePath = "test_users.csv";
        createTestCsvFile(testFilePath, "username,password,role\nuser1,password1,user\nuser2,password2,admin");

        CsvUserLoader.loadUsers(testFilePath);

        verify(userDao, times(1)).save(any(User.class));
        deleteTestFile(testFilePath);
    }

    @Test
    void testLoadUsersWithInvalidLine() throws IOException {
        String testFilePath = "test_invalid_users.csv";
        createTestCsvFile(testFilePath, "username,password,role\nuser1,password1,user\ninvalid,line\nuser2,password2,admin");

        CsvUserLoader.loadUsers(testFilePath);

        verify(userDao, times(2)).save(any(User.class));
        deleteTestFile(testFilePath);
    }

    @Test
    void testLoadUsersWithExistingUser() throws IOException {
        String testFilePath = "test_existing_users.csv";
        createTestCsvFile(testFilePath, "username,password,role\nuser1,password1,user\nuser2,password2,admin");

        when(userDao.userExists("user1")).thenReturn(true);
        when(userDao.userExists("user2")).thenReturn(false);

        CsvUserLoader.loadUsers(testFilePath);

        verify(userDao, times(1)).save(any(User.class));
        deleteTestFile(testFilePath);
    }

    void createTestCsvFile(String filePath, String content) throws IOException {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(filePath))) {
            writer.write(content);
        }
    }

    void deleteTestFile(String filePath) {
        File file = new File(filePath);
        if (file.exists()) {
            assertTrue(file.delete(), "Test file should be deleted.");
        }
    }
}
