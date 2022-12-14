-- MariaDB dump 10.19  Distrib 10.6.11-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: PrestamoDeMA
-- ------------------------------------------------------
-- Server version	10.6.11-MariaDB-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Cliente`
--

DROP TABLE IF EXISTS `Cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Cliente` (
  `ID` int(10) NOT NULL AUTO_INCREMENT,
  `Nombre_Cliente` varchar(255) NOT NULL,
  `Apellidos_Cliente` varchar(255) NOT NULL,
  `Edad` int(3) NOT NULL,
  `Genero` char(1) DEFAULT NULL,
  `Ciudad_Cliente` varchar(255) NOT NULL,
  `Calle_Cliente` varchar(255) NOT NULL,
  `Num_Telefonico` varchar(255) NOT NULL,
  `Creado` timestamp NOT NULL DEFAULT current_timestamp(),
  `Actualizado` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `Activo` char(1) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Cliente`
--

LOCK TABLES `Cliente` WRITE;
/*!40000 ALTER TABLE `Cliente` DISABLE KEYS */;
INSERT INTO `Cliente` VALUES (1,'Angel','Lerdo Atilano',19,'M','Tuxtepec','5 de mayo','2459793','2022-12-13 06:00:59','2022-12-13 14:23:59','S'),(2,'Luisa','Felipe Hilario',21,'F','Tuxtepec','20 de Noviembre','2882927172','2022-12-13 06:02:55','2022-12-13 00:02:55','S');
/*!40000 ALTER TABLE `Cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Prestamos`
--

DROP TABLE IF EXISTS `Prestamos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Prestamos` (
  `ID` int(10) NOT NULL AUTO_INCREMENT,
  `Tipo_De_Material_Audiovisual` varchar(255) NOT NULL,
  `MARCA` varchar(255) NOT NULL,
  `Numero_Prestamo` int(10) NOT NULL,
  `F_Solicitud` varchar(255) NOT NULL,
  `F_Entrega` varchar(255) NOT NULL,
  `Importe_Pagar` varchar(255) NOT NULL,
  `Creado` timestamp NOT NULL DEFAULT current_timestamp(),
  `Actualizado` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `Activo` char(1) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Prestamos`
--

LOCK TABLES `Prestamos` WRITE;
/*!40000 ALTER TABLE `Prestamos` DISABLE KEYS */;
INSERT INTO `Prestamos` VALUES (1,'Television','Samsug',2,'2022-12-10','2022-12-17','550$','2022-12-13 05:54:28','2022-12-13 15:59:53','S'),(2,'Bocina','Xiaomi',1,'2022-12-13','2022-12-21','450$','2022-12-13 05:56:33','2022-12-13 15:52:28','N'),(3,'Proyector','Epson',1,'2022-12-14','2022-12-22','500$','2022-12-13 05:59:28','2022-12-12 23:59:28','S'),(4,'Microfonos','Samsug',2,'2022-12-10','2022-12-17','450$','2022-12-13 21:25:48','2022-12-13 15:26:12','S'),(5,'Cables HDMI','Samsug',2,'2022-12-10','2022-12-17','1000$','2022-12-13 22:00:34','2022-12-13 16:00:34','S');
/*!40000 ALTER TABLE `Prestamos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-13 16:23:59
