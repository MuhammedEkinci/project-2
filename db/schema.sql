  DROP DATABASE IF EXISTS memes_db;
  CREATE DATABASE memes_db;
  USE memes_db;
 CREATE TABLE `memes_db`.`profile` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));
CREATE TABLE `memes_db`.`your_memes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NULL,
  `meme` VARCHAR(45) NULL,
  `date` VARCHAR(45) NULL,
  PRIMARY KEY (`id`));
CREATE TABLE `memes_db`.`liked_memes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `meme` VARCHAR(45) NULL,
  `username` VARCHAR(45) NULL,
  PRIMARY KEY (`id`));
