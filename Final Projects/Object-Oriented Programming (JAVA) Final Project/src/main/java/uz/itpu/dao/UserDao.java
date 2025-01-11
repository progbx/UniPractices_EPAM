package uz.itpu.dao;

import uz.itpu.models.User;
import uz.itpu.config.PostgresDatabaseConfig;
import java.sql.*;
import java.util.*;

public class UserDao {
    public void save(User user) {
        String sql = "INSERT INTO users (username, password, role) VALUES (?, ?, ?)";
        try (Connection connection = PostgresDatabaseConfig.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, user.getUsername());
            statement.setString(2, user.getPassword());
            statement.setString(3, user.getRole());
            statement.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException("Error saving user", e);
        }
    }

    public void update(User user) {
        String sql = "UPDATE users SET username = ?, password = ?, role = ? WHERE id = ?";
        try (Connection connection = PostgresDatabaseConfig.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, user.getUsername());
            statement.setString(2, user.getPassword());
            statement.setString(3, user.getRole());
            statement.setInt(4, user.getId());
            statement.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException("Error updating user", e);
        }
    }

    public void delete(int id) {
        String sql = "DELETE FROM users WHERE id = ?";
        try (Connection connection = PostgresDatabaseConfig.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, id);
            statement.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException("Error deleting user", e);
        }
    }

    public Optional<User> get(int id) {
        String sql = "SELECT * FROM users WHERE id = ?";
        try (Connection connection = PostgresDatabaseConfig.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, id);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    return Optional.of(mapUser(resultSet));
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException("Error getting user", e);
        }
        return Optional.empty();
    }

    public List<User> getAll() {
        List<User> users = new ArrayList<>();
        String sql = "SELECT * FROM users";
        try (Connection connection = PostgresDatabaseConfig.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql);
             ResultSet resultSet = statement.executeQuery()) {
            while (resultSet.next()) {
                users.add(mapUser(resultSet));
            }
        } catch (SQLException e) {
            throw new RuntimeException("Error getting all users", e);
        }
        return users;
    }

    private User mapUser(ResultSet resultSet) throws SQLException {
        User user = new User();
        user.setId(resultSet.getInt("id"));
        user.setUsername(resultSet.getString("username"));
        user.setPassword(resultSet.getString("password"));
        user.setRole(resultSet.getString("role"));
        return user;
    }

    public boolean userExists(String username) {
        String sql = "SELECT COUNT(*) FROM users WHERE username = ?";
        try (Connection connection = PostgresDatabaseConfig.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {


            statement.setString(1, username);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    return resultSet.getInt(1) > 0;
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
            throw new RuntimeException("Error checking if user exists", e);
        }
        return false;
    }

    public boolean hasPendingRequest(int userId) {
        String sql = "SELECT COUNT(*) FROM admin_requests WHERE user_id = ? AND status = 'pending'";
        try (Connection connection = PostgresDatabaseConfig.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, userId);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    return resultSet.getInt(1) > 0;
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
            throw new RuntimeException("Error checking pending request", e);
        }
        return false;
    }

    public void createAdminRequest(int userId) {
        String sql = "INSERT INTO admin_requests (user_id) VALUES (?)";
        try (Connection connection = PostgresDatabaseConfig.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, userId);
            statement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
            throw new RuntimeException("Error creating admin request", e);
        }
    }

    public List<Map<String, Object>> getAllAdminRequests() {
        String sql = "SELECT ar.id, u.username, ar.status FROM admin_requests ar " +
                "JOIN users u ON ar.user_id = u.id";
        List<Map<String, Object>> requests = new ArrayList<>();
        try (Connection connection = PostgresDatabaseConfig.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql);
             ResultSet resultSet = statement.executeQuery()) {
            while (resultSet.next()) {
                Map<String, Object> request = new HashMap<>();
                request.put("id", resultSet.getInt("id"));
                request.put("username", resultSet.getString("username"));
                request.put("status", resultSet.getString("status"));
                requests.add(request);
            }
        } catch (SQLException e) {
            e.printStackTrace();
            throw new RuntimeException("Error fetching admin requests", e);
        }
        return requests;
    }

    public void updateAdminRequestStatus(int requestId, String status) {
        String sql = "UPDATE admin_requests SET status = ? WHERE id = ?";
        try (Connection connection = PostgresDatabaseConfig.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, status);
            statement.setInt(2, requestId);
            statement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
            throw new RuntimeException("Error updating admin request status", e);
        }
    }

    public void promoteToAdmin(int userId) {
        String sql = "UPDATE users SET role = 'admin' WHERE id = ?";
        try (Connection connection = PostgresDatabaseConfig.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, userId);
            statement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
            throw new RuntimeException("Error promoting user to admin", e);
        }
    }

public Optional<User> findByUsername(String username) {
    String sql = "SELECT * FROM users WHERE username = ?";
    try (Connection connection = PostgresDatabaseConfig.getConnection();
         PreparedStatement statement = connection.prepareStatement(sql)) {
        statement.setString(1, username);
        try (ResultSet resultSet = statement.executeQuery()) {
            if (resultSet.next()) {
                return Optional.of(mapUser(resultSet));
            }
        }
    } catch (SQLException e) {
        e.printStackTrace();
        throw new RuntimeException("Error finding user by username", e);
    }
    return Optional.empty();
}
}