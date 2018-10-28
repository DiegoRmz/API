CREATE DATABASE aircraft;
USE aircraft;

CREATE TABLE users(
    email VARCHAR(100) NOT NULL PRIMARY KEY,
    userName VARCHAR(100) NOT NULL,
    pswd TEXT NOT NULL
);


CREATE TABLE aircraft(
    id INT NOT NULL PRIMARY KEY,
    model VARCHAR(50),
    producer VARCHAR(50),
    currentStatus VARCHAR(50),
    pilot VARCHAR(50)
);