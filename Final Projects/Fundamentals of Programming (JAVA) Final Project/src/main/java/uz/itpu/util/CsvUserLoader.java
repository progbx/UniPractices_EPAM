package uz.itpu.util;

import uz.itpu.dao.UserDao;
import uz.itpu.models.User;
import uz.itpu.security.PasswordHasher;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class CsvUserLoader {
    public static void loadUsers(String filePath) {
        UserDao userDao = new UserDao();
        try (BufferedReader br = new BufferedReader(new FileReader(filePath))) {
            String line;
            boolean isFirstLine = true;
            while ((line = br.readLine()) != null) {
                if (isFirstLine) {
                    isFirstLine = false;
                    continue;
                }
                String[] values = line.split(",");
                if (values.length != 3) {
                    System.err.println("Invalid line in CSV: " + line);
                    continue;
                }
                String username = values[0].trim();
                String password = values[1].trim();
                String role = values[2].trim();
                if (!userDao.userExists(username)) {
                    userDao.save(new User(username, PasswordHasher.hashPassword(password), role));
                } else {
                    return;
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}