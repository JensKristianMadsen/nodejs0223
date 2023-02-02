import db from "./create-connection.js";

/*db.query("DROP TABLE IF EXISTS users");

db.query(`CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL  UNIQUE,
    email VARCHAR(60) NOT NULL UNIQUE,
    password VARCHAR(150) NOT NULL
);`);*/

db.query(`CREATE TABLE gokarts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    driver VARCHAR(50) NOT NULL,
    age INT NOT NULL,
    cc INT NOT NULL,
    best_lab_time FLOAT NOT NULL,
    total_time FLOAT NOT NULL,
    pitstops INT NOT NULL
);`);

db.end();