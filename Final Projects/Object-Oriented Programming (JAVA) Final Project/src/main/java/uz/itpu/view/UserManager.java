package uz.itpu.view;

import uz.itpu.Main;
import uz.itpu.security.Authentication;
import uz.itpu.dao.UserDao;
import uz.itpu.models.User;
import java.util.Scanner;

public class UserManager {
    private ApplianceManager applianceManager;
    private UserDao userDao;
    private Scanner scanner;

    public UserManager() {
        applianceManager = new ApplianceManager();
        userDao = new UserDao();
        scanner = new Scanner(System.in);
    }

    public void run() {
        while (true) {
            showUserMenu();
            int choice = getUserChoice();
            switch (choice) {
                case 1:
                    applianceManager.run();
                    break;
                case 2:
                    requestAdminRights();
                    break;
                case 3:
                    updateUserData();
                    break;
                case 4:
                    deleteUserAccount();
                    break;
                case 5:
                    Authentication.signOut();
                    Main.restartApplication();
                    return;
                default:
                    System.out.println("Invalid choice. Please try again.");
            }
        }
    }

    private void showUserMenu() {
        System.out.println("\n=== User Panel ===");
        System.out.println("1. Manage Products");
        System.out.println("2. Request Admin Rights");
        System.out.println("3. Update My Data");
        System.out.println("4. Delete My Account");
        System.out.println("5. Sign Out");
        System.out.print("Enter your choice: ");
    }

    private int getUserChoice() {
        while (!scanner.hasNextInt()) {
            System.out.print("Please enter a valid number: ");
            scanner.next();
        }
        return scanner.nextInt();
    }

    private void requestAdminRights() {
        User currentUser = Authentication.getCurrentUser();
        if (userDao.hasPendingRequest(currentUser.getId())) {
            System.out.println("You already have a pending admin request.");
            return;
        }
        userDao.createAdminRequest(currentUser.getId());
        System.out.println("Your request for admin rights has been submitted.");
    }

    private void updateUserData() {
        User currentUser = Authentication.getCurrentUser();
        scanner.nextLine();

        System.out.print("Enter new username (leave blank to keep unchanged): ");
        String newUsername = scanner.nextLine();
        if (!newUsername.trim().isEmpty()) {
            currentUser.setUsername(newUsername);
        }

        System.out.print("Enter new password (leave blank to keep unchanged): ");
        String newPassword = scanner.nextLine();
        if (!newPassword.trim().isEmpty()) {
            currentUser.setPassword(newPassword);
        }

        userDao.update(currentUser);
        System.out.println("Your data has been updated successfully.");
    }

    private void deleteUserAccount() {
        User currentUser = Authentication.getCurrentUser();
        System.out.print("Are you sure you want to delete your account? (yes/no): ");
        String confirmation = scanner.next();
        if (confirmation.equalsIgnoreCase("yes")) {
            userDao.delete(currentUser.getId());
            System.out.println("Your account has been deleted.");
            Authentication.signOut();
            Main.restartApplication();
        } else {
            System.out.println("Account deletion canceled.");
        }
    }
}