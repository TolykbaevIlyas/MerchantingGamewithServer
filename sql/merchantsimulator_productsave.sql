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
-- Table structure for table `productsave`
--

DROP TABLE IF EXISTS `productsave`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productsave` (
  `id` int NOT NULL AUTO_INCREMENT,
  `savename` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `dealerID` int NOT NULL,
  `productName` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `productweight` int NOT NULL,
  `productCost` int NOT NULL,
  `productType` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `productStatus` float NOT NULL,
  `productCostOfSellingPlace` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `dealerID` (`dealerID`),
  CONSTRAINT `productsave_ibfk_1` FOREIGN KEY (`dealerID`) REFERENCES `playersaves` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productsave`
--

LOCK TABLES `productsave` WRITE;
/*!40000 ALTER TABLE `productsave` DISABLE KEYS */;
INSERT INTO `productsave` VALUES (18,'2023-06-27 22:42',16,'fish',40,30000,' Мясо',1.2,36000),(19,'2023-06-27 22:42',16,'Green',15,9000,' Краска',1.2,10800),(20,'2023-06-27 22:42',16,'milk',20,30000,' drink',0.25,23000),(21,'2023-06-27 22:44',19,'fish',40,30000,' Мясо',1.2,36000),(22,'2023-06-27 22:44',19,'Green',15,9000,' Краска',1.2,10800),(23,'2023-06-27 22:44',19,'milk',20,30000,' drink',0.25,23000),(24,'2023-06-27 22:44',19,'Green',15,9000,' Краска',1.2,10800),(25,'2023-06-27 22:44',19,'milk',20,30000,' drink',0.25,23000),(26,'2023-06-27 22:44',19,'fish',40,30000,' Мясо',1.2,36000),(27,'2023-06-28 09:43',23,'milk',20,30000,' drink',0.25,23000),(28,'2023-06-28 09:43',23,'steak',40,50000,' meat',0.25,40000);
/*!40000 ALTER TABLE `productsave` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-28 19:46:58
