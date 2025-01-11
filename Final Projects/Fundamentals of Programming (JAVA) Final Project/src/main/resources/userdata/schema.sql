CREATE TABLE IF NOT EXISTS users (
                                     id SERIAL PRIMARY KEY,
                                     username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'user'))
    );


CREATE TABLE IF NOT EXISTS admin_requests (
                                              id SERIAL PRIMARY KEY,
                                              user_id INT NOT NULL,
                                              status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );