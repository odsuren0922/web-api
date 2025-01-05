CREATE TABLE users (
    id SERIAL  PRIMARY KEY,
    username VARCHAR(50),
    email VARCHAR(255),
    password VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
