package uz.itpu.dao;

import uz.itpu.models.User;
import uz.itpu.config.PostgresDatabaseConfig;
import org.junit.jupiter.api.*;

import java.sql.Connection;
import java.sql.Statement;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;

class UserDaoTest {

    private UserDao userDao;

    @BeforeEach
    void setUp() {
        userDao = new UserDao();
    }

    @Test
    void testSave() {
        User user = new User("testUser", "password", "user");
        userDao.save(user);
        assertTrue(userDao.userExists(user.getUsername()));
    }

    @Test
    void testUpdate() {
        User user = new User("testUser", "password", "user");
        userDao.save(user);

        user = userDao.findByUsername(user.getUsername()).orElseThrow();
        user.setPassword("newPassword");
        userDao.update(user);

        User updatedUser = userDao.findByUsername(user.getUsername()).orElseThrow();
        assertEquals("newPassword", updatedUser.getPassword());
    }

    @Test
    void testDelete() {
        User user = new User("testUser", "password", "user");
        userDao.save(user);
        user = userDao.findByUsername(user.getUsername()).orElseThrow();

        userDao.delete(user.getId());
        assertFalse(userDao.userExists(user.getUsername()));
    }

    @Test
    void testGet() {
        User user = new User("testUser", "password", "user");
        userDao.save(user);

        user = userDao.findByUsername(user.getUsername()).orElseThrow();
        Optional<User> retrievedUser = userDao.get(user.getId());

        assertTrue(retrievedUser.isPresent());
        assertEquals(user.getUsername(), retrievedUser.get().getUsername());
    }

    @Test
    void testGetAll() {
        User user1 = new User("user1", "password1", "user");
        User user2 = new User("user2", "password2", "user");
        userDao.save(user1);
        userDao.save(user2);

        List<User> users = userDao.getAll();
        assertTrue(users.size() >= 2);
        assertTrue(users.stream().anyMatch(user -> user.getUsername().equals("user1")));
        assertTrue(users.stream().anyMatch(user -> user.getUsername().equals("user2")));
    }

    @AfterEach
    void tearDown() {
        // Clean up database after each test
        try (Connection connection = PostgresDatabaseConfig.getConnection();
             Statement statement = connection.createStatement()) {
            statement.executeUpdate("DELETE FROM users WHERE username LIKE 'testUser%'");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
