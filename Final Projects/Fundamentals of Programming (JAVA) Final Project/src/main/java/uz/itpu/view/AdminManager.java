package uz.itpu.view;

import uz.itpu.Main;
import uz.itpu.security.Authentication;
import uz.itpu.dao.UserDao;
import uz.itpu.models.User;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Scanner;

public class AdminManager {
    private ApplianceManager applianceManager;
    private UserDao userDao;
    private Scanner scanner;

    public AdminManager() {
        applianceManager = new ApplianceManager();
        userDao = new UserDao();
        scanner = new Scanner(System.in);
    }

    public void run() {
        while (true) {
            showAdminMenu();
            int choice = getAdminChoice();
            switch (choice) {
                case 1:
                    applianceManager.run();
                    break;
                case 2:
                    handleAdminRequests();
                    break;
                case 3:
                    addNewUser();
                    break;
                case 4:
                    updateUserData();
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

    private void showAdminMenu() {
        System.out.println("\n=== Admin Panel ===");
        System.out.println("1. Manage Products");
        System.out.println("2. Handle Admin Requests");
        System.out.println("3. Add New User");
        System.out.println("4. Update User Data");
        System.out.println("5. Sign Out");
        System.out.print("Enter your choice: ");
    }

    private int getAdminChoice() {
        while (!scanner.hasNextInt()) {
            System.out.print("Please enter a valid number: ");
            scanner.next();
        }
        return scanner.nextInt();
    }

    private void handleAdminRequests() {
        List<Map<String, Object>> requests = userDao.getAllAdminRequests();
        if (requests.isEmpty()) {
            System.out.println("No admin requests to handle.");
            return;
        }

        for (Map<String, Object> request : requests) {
            System.out.println("\nRequest ID: " + request.get("id"));
            System.out.println("Username: " + request.get("username"));
            System.out.println("Status: " + request.get("status"));
            if (!"pending".equalsIgnoreCase((String) request.get("status"))) {
                continue;
            }

            System.out.print("Do you want to approve this request? (yes/no): ");
            String decision = scanner.next();
            if (decision.equalsIgnoreCase("yes")) {
                int requestId = (int) request.get("id");
                String username = (String) request.get("username");
                Optional<User> userOpt = userDao.findByUsername(username);
                if (userOpt.isPresent()) {
                    User user = userOpt.get();
                    userDao.promoteToAdmin(user.getId());
                    userDao.updateAdminRequestStatus(requestId, "approved");
                    System.out.println("User " + username + " has been promoted to admin.");
                } else {
                    System.out.println("User not found.");
                }
            } else {
                int requestId = (int) request.get("id");
                userDao.updateAdminRequestStatus(requestId, "rejected");
                System.out.println("Request ID " + requestId + " has been rejected.");
            }
        }
    }

    private void addNewUser() {
        scanner.nextLine();
        System.out.println("=== Add New User ===");
        System.out.print("Enter username: ");
        String username = scanner.nextLine();

        if (userDao.userExists(username)) {
            System.out.println("Username already exists. Please choose a different username.");
            return;
        }


        System.out.print("Enter password: ");
        String password = scanner.nextLine();

        System.out.print("Enter role (user/admin): ");
        String role = scanner.nextLine().toLowerCase();
        if (!role.equals("user") && !role.equals("admin")) {
            System.out.println("Invalid role. Defaulting to 'user'.");
            role = "user";
        }

        User newUser = new User();
        newUser.setUsername(username);
        newUser.setPassword(password);
        newUser.setRole(role);
        userDao.save(newUser);
        System.out.println("New user has been added successfully.");
    }

    private void updateUserData() {
        System.out.print("Enter the username of the user to update: ");
        String username = scanner.next();
        Optional<User> userOpt = userDao.findByUsername(username);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            scanner.nextLine();

            System.out.print("Enter new username (leave blank to keep unchanged): ");
            String newUsername = scanner.nextLine();
            if (!newUsername.trim().isEmpty()) {
                user.setUsername(newUsername);
            }

            System.out.print("Enter new password (leave blank to keep unchanged): ");
            String newPassword = scanner.nextLine();
            if (!newPassword.trim().isEmpty()) {
                user.setPassword(newPassword);
            }

            System.out.print("Enter new role (user/admin, leave blank to keep unchanged): ");
            String newRole = scanner.nextLine().toLowerCase();
            if (newRole.equals("user") || newRole.equals("admin")) {
                user.setRole(newRole);
            }

            userDao.update(user);
            System.out.println("User data has been updated successfully.");
        } else {
            System.out.println("User not found.");
        }
    }
}