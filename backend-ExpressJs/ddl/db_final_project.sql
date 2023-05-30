-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: db_final_project
-- ------------------------------------------------------
-- Server version	5.5.5-10.9.3-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cache`
--

DROP TABLE IF EXISTS `cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache` (
  `cache_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `url` text DEFAULT NULL,
  `data` longtext DEFAULT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`cache_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache`
--

LOCK TABLES `cache` WRITE;
/*!40000 ALTER TABLE `cache` DISABLE KEYS */;
INSERT INTO `cache` VALUES (1,'https://api.openweathermap.org/data/2.5/weather?lat=45.4028986&lon=-75.683692&appid=82dc1d787a7efd97503ecec1a230ad4f&units=metric','{\"coord\":{\"lon\":-75.6837,\"lat\":45.4029},\"weather\":[{\"id\":801,\"main\":\"Clouds\",\"description\":\"few clouds\",\"icon\":\"02d\"}],\"base\":\"stations\",\"main\":{\"temp\":10.71,\"feels_like\":9.14,\"temp_min\":9.89,\"temp_max\":11.32,\"pressure\":1024,\"humidity\":50},\"visibility\":10000,\"wind\":{\"speed\":7.72,\"deg\":360,\"gust\":11.32},\"clouds\":{\"all\":20},\"dt\":1684971915,\"sys\":{\"type\":2,\"id\":2005537,\"country\":\"CA\",\"sunrise\":1684920230,\"sunset\":1684974936},\"timezone\":-14400,\"id\":6094817,\"name\":\"Ottawa\",\"cod\":200}','2023-05-24 19:45:16'),(2,'https://api.openweathermap.org/data/2.5/weather?lat=45.4028986&lon=-75.683692&appid=82dc1d787a7efd97503ecec1a230ad4f&units=metric','{\"coord\":{\"lon\":-75.6837,\"lat\":45.4029},\"weather\":[{\"id\":800,\"main\":\"Clear\",\"description\":\"clear sky\",\"icon\":\"01d\"}],\"base\":\"stations\",\"main\":{\"temp\":17.37,\"feels_like\":16.55,\"temp_min\":15.32,\"temp_max\":19.1,\"pressure\":1024,\"humidity\":53},\"visibility\":10000,\"wind\":{\"speed\":3.09,\"deg\":90},\"clouds\":{\"all\":0},\"dt\":1685451497,\"sys\":{\"type\":2,\"id\":2005537,\"country\":\"CA\",\"sunrise\":1685438360,\"sunset\":1685493691},\"timezone\":-14400,\"id\":6094817,\"name\":\"Ottawa\",\"cod\":200}','2023-05-30 08:58:18'),(3,'http://api.openweathermap.org/data/2.5/air_pollution?lat=45.4028986&lon=-75.683692&appid=82dc1d787a7efd97503ecec1a230ad4f','{\"coord\":{\"lon\":-75.6837,\"lat\":45.4029},\"list\":[{\"main\":{\"aqi\":1},\"components\":{\"co\":273.71,\"no\":2.65,\"no2\":7.63,\"o3\":55.08,\"so2\":5.13,\"pm2_5\":3.96,\"pm10\":5.28,\"nh3\":2.09},\"dt\":1685451359}]}','2023-05-30 08:58:24');
/*!40000 ALTER TABLE `cache` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `park`
--

DROP TABLE IF EXISTS `park`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `park` (
  `park_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `park_name` varchar(100) DEFAULT NULL,
  `park_address` varchar(100) DEFAULT NULL,
  `park_city` varchar(100) DEFAULT NULL,
  `park_province` varchar(100) DEFAULT NULL,
  `park_country` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`park_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `park`
--

LOCK TABLES `park` WRITE;
/*!40000 ALTER TABLE `park` DISABLE KEYS */;
/*!40000 ALTER TABLE `park` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rating`
--

DROP TABLE IF EXISTS `rating`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rating` (
  `rating_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `park_id` int(10) unsigned NOT NULL,
  `rating_stars(1-5)` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`rating_id`),
  KEY `rating_FK` (`park_id`),
  KEY `rating_FK_1` (`user_id`),
  CONSTRAINT `rating_FK` FOREIGN KEY (`park_id`) REFERENCES `park` (`park_id`),
  CONSTRAINT `rating_FK_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rating`
--

LOCK TABLES `rating` WRITE;
/*!40000 ALTER TABLE `rating` DISABLE KEYS */;
/*!40000 ALTER TABLE `rating` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `email` text DEFAULT NULL,
  `passHash` text NOT NULL,
  `cookieHash` text DEFAULT NULL,
  `date-modified` datetime NOT NULL DEFAULT current_timestamp(),
  `first` varchar(100) DEFAULT NULL,
  `last` varchar(100) DEFAULT NULL,
  `profile_image` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_un` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (7,'12345','ottawa\'s','WZRHGrsBESr8wYFZ9sx0tPURuZgG2lmzyvWpwXPKz8U=','5+OdH4RNECuZlJ1vGWKc2O7MQsG7ExQfydUniVVB0PI=','2023-05-26 10:10:53','456','123','s.img');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usertracking`
--

DROP TABLE IF EXISTS `usertracking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usertracking` (
  `usertracking_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `park_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`usertracking_id`),
  KEY `usertracking_FK` (`user_id`),
  KEY `usertracking_FK_1` (`park_id`),
  CONSTRAINT `usertracking_FK` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `usertracking_FK_1` FOREIGN KEY (`park_id`) REFERENCES `park` (`park_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usertracking`
--

LOCK TABLES `usertracking` WRITE;
/*!40000 ALTER TABLE `usertracking` DISABLE KEYS */;
/*!40000 ALTER TABLE `usertracking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'db_final_project'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-30 12:26:22
