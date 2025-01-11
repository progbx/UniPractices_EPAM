package uz.itpu.security;

import uz.itpu.dao.UserDao;
import uz.itpu.models.User;
import org.mindrot.jbcrypt.BCrypt;
import java.util.Optional;
import java.util.Scanner;

public class Authentication {
    private static UserDao userDao = new UserDao();
    private static User currentUser = null;
    private static Scanner scanner = new Scanner(System.in);

    public static User signIn() {
        System.out.println("=== Sign In ===");
        System.out.print("Username: ");
        String username = scanner.nextLine();
        System.out.print("Password: ");
        String password = scanner.nextLine();

        Optional<User> userOpt = userDao.findByUsername(username);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (BCrypt.checkpw(password, user.getPassword())) {
                currentUser = user;
                System.out.println("Sign in successful! Welcome, " + user.getUsername() + "!");
                return currentUser;
            } else {
                System.out.println("Incorrect password.");
            }
        } else {
            System.out.println("User not found.");
        }
        return null;
    }

    public static void signOut() {
        if (currentUser != null) {
            System.out.println("Goodbye, " + currentUser.getUsername() + "!");
            currentUser = null;
        } else {
            System.out.println("No user is currently signed in.");
        }
    }

    public static User getCurrentUser() {
        return currentUser;
    }
}