package uz.itpu;

import uz.itpu.view.AdminManager;
import uz.itpu.view.ApplianceManager;
import uz.itpu.config.PostgresDatabaseConfig;
import uz.itpu.util.CsvUserLoader;
import uz.itpu.models.User;
import uz.itpu.dao.UserDao;
import uz.itpu.security.Authentication;
import uz.itpu.view.UserManager;

public class Main {
    private static UserDao userDao = new UserDao();

    public static void main(String[] args) {
        String schemaFilePath = "src/main/resources/userdata/schema.sql";
        PostgresDatabaseConfig.initializeSchemaFromFile(schemaFilePath);
        String userFilePath = "src/main/resources/userdata/users.csv";
        CsvUserLoader.loadUsers(userFilePath);

        System.out.println("Welcome to the Household Appliances Warehouse Search System!");
        System.out.println("Version: 1.0  Date: 08.03.2024");
        System.out.println("Created by: Bahromboy Botirboev (Bahromboy_Botirboev@student.itpu.uz)");

        boolean isAuthenticated = false;
        while (!isAuthenticated) {
            User user = Authentication.signIn();
            if (user != null) {
                isAuthenticated = true;
                if (user.getRole().equalsIgnoreCase("admin")) {
                    AdminManager adminManager = new AdminManager();
                    adminManager.run();
                } else {
                    UserManager userManager = new UserManager();
                    userManager.run();
                }
            } else {
                System.out.println("Sign in failed. Please try again.");
            }
        }
    }

    // Inside the Main class

    public static void restartApplication() {
        try {
            main(new String[0]);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
