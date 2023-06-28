-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: merchantsimulator
-- ------------------------------------------------------
-- Server version	8.0.24

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `playersaves`
--

DROP TABLE IF EXISTS `playersaves`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `playersaves` (
  `id` int NOT NULL AUTO_INCREMENT,
  `SaveName` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `playerID` int NOT NULL,
  `city` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `distance` int NOT NULL,
  `speed` int NOT NULL,
  `money` int NOT NULL,
  `weight` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `playerID` (`playerID`),
  CONSTRAINT `playersaves_ibfk_1` FOREIGN KEY (`playerID`) REFERENCES `dealer` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `playersaves`
--

LOCK TABLES `playersaves` WRITE;
/*!40000 ALTER TABLE `playersaves` DISABLE KEYS */;
INSERT INTO `playersaves` VALUES (15,'2023-06-27 22:41',77,'Cobalt',0,2,73525,108),(16,'2023-06-27 22:42',77,'Cobalt',0,2,4525,33),(17,'2023-06-27 22:42',77,'Cobalt',0,2,4525,33),(18,'2023-06-27 22:42',77,'Cobalt',0,2,4525,33),(19,'2023-06-27 22:44',77,'Cobalt',0,2,4525,33),(20,'2023-06-27 22:44',77,'Cobalt',0,2,4525,33),(21,'2023-06-27 22:44',77,'Cobalt',0,2,4525,33),(22,'2023-06-28 09:34',78,'Almaty',60,6,82601,70),(23,'2023-06-28 09:43',78,'Almaty',60,6,2601,10);
/*!40000 ALTER TABLE `playersaves` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-28 19:46:57
