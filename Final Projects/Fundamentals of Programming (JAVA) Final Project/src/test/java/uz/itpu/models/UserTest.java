package uz.itpu.models;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;

class UserTest {

    @Test
    void testUserConstructorWithAllFields() {
        User user = new User(1, "username", "password", "role");
        assertEquals(1, user.getId());
        assertEquals("username", user.getUsername());
        assertEquals("password", user.getPassword());
        assertEquals("role", user.getRole());
    }

    @Test
    void testUserConstructorWithoutId() {
        User user = new User("username", "password", "role");
        assertEquals("username", user.getUsername());
        assertEquals("password", user.getPassword());
        assertEquals("role", user.getRole());
    }

    @Test
    void testDefaultConstructor() {
        User user = new User();
        assertNull(user.getUsername());
        assertNull(user.getPassword());
        assertNull(user.getRole());
    }

    @Test
    void testSettersAndGetters() {
        User user = new User();
        user.setId(2);
        user.setUsername("newUser");
        user.setPassword("newPassword");
        user.setRole("newRole");

        assertEquals(2, user.getId());
        assertEquals("newUser", user.getUsername());
        assertEquals("newPassword", user.getPassword());
        assertEquals("newRole", user.getRole());
    }
}
