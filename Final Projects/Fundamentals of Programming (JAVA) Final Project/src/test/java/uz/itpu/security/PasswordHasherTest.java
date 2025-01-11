package uz.itpu.security;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;

class PasswordHasherTest {

    @Test
    void testHashPassword() {
        String plainPassword = "mySecretPassword";
        String hashedPassword = PasswordHasher.hashPassword(plainPassword);

        assertNotNull(hashedPassword);
        assertNotEquals(plainPassword, hashedPassword);
        assertTrue(hashedPassword.startsWith("$2a$"));
    }

    @Test
    void testCheckPassword() {
        String plainPassword = "mySecretPassword";
        String hashedPassword = PasswordHasher.hashPassword(plainPassword);

        assertTrue(PasswordHasher.checkPassword(plainPassword, hashedPassword));
        assertFalse(PasswordHasher.checkPassword("wrongPassword", hashedPassword));
    }

    @Test
    void testDifferentHashesForSamePassword() {
        String plainPassword = "mySecretPassword";
        String hashedPassword1 = PasswordHasher.hashPassword(plainPassword);
        String hashedPassword2 = PasswordHasher.hashPassword(plainPassword);

        assertNotEquals(hashedPassword1, hashedPassword2);
    }

    @Test
    void testCheckPasswordWithDifferentHashes() {
        String plainPassword = "mySecretPassword";
        String hashedPassword1 = PasswordHasher.hashPassword(plainPassword);
        String hashedPassword2 = PasswordHasher.hashPassword(plainPassword);

        assertTrue(PasswordHasher.checkPassword(plainPassword, hashedPassword1));
        assertTrue(PasswordHasher.checkPassword(plainPassword, hashedPassword2));
    }

    @Test
    void testCheckPasswordWithNullValues() {
        assertThrows(IllegalArgumentException.class, () -> {
            PasswordHasher.checkPassword(null, "someHashedPassword");
        });

        assertThrows(IllegalArgumentException.class, () -> {
            PasswordHasher.checkPassword("somePassword", null);
        });
    }
}
