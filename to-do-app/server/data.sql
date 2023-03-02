CREATE DATABASE todoapp;

CREATE TABLE todos(
    id VARCHAR(255) PRIMARY KEY,
    user_email VARCHAR(255),
    title VARCHAR(30),
    progres INT,
    date VARCHAR(300)
);

CREATE TABLE user(
    email VARCHAR(255) PRIMARY KEY,
    hashed_password VARCHAR(255)
);