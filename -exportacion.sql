-- MySQL dump 10.13  Distrib 5.6.39, for Linux (x86_64)
--
-- Host: localhost    Database: residencia
-- ------------------------------------------------------
-- Server version	5.6.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `alumnos`
--

DROP TABLE IF EXISTS `alumnos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `alumnos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `no_control` varchar(8) NOT NULL,
  `plan_estudios` enum('2009-2010','2015-2016') NOT NULL,
  `nombre` varchar(40) NOT NULL,
  `ap_paterno` varchar(30) NOT NULL,
  `ap_materno` varchar(30) NOT NULL,
  `sexo` enum('H','M') DEFAULT NULL,
  `domicilio` varchar(200) DEFAULT NULL,
  `colonia` varchar(30) DEFAULT NULL,
  `codigo_postal` varchar(5) DEFAULT NULL,
  `no_seguro` varchar(20) DEFAULT NULL,
  `numero_celular` varchar(20) DEFAULT NULL,
  `ciudad` varchar(150) NOT NULL DEFAULT '',
  `id_tipo_seguro` int(11) DEFAULT NULL,
  `id_carrera` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `no_control` (`no_control`),
  UNIQUE KEY `id_usuario` (`id_usuario`),
  KEY `id_tipo_seguro` (`id_tipo_seguro`),
  KEY `id_carrera` (`id_carrera`),
  CONSTRAINT `alumnos_ibfk_1` FOREIGN KEY (`id_tipo_seguro`) REFERENCES `tipo_seguros` (`id`) ON DELETE CASCADE,
  CONSTRAINT `alumnos_ibfk_2` FOREIGN KEY (`id_carrera`) REFERENCES `carreras` (`id`) ON DELETE CASCADE,
  CONSTRAINT `alumnos_ibfk_3` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alumnos`
--

LOCK TABLES `alumnos` WRITE;
/*!40000 ALTER TABLE `alumnos` DISABLE KEYS */;
/*!40000 ALTER TABLE `alumnos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `anteproyectos`
--

DROP TABLE IF EXISTS `anteproyectos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `anteproyectos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `objetivo_general` varchar(255) DEFAULT NULL,
  `origen` enum('Banco de proyectos','Propuesta propia','Trabajador') DEFAULT NULL,
  `dictamen` enum('aprobado','no aprobado') NOT NULL DEFAULT 'no aprobado',
  `path_file_anteproyecto` varchar(255) DEFAULT NULL,
  `id_alumno` int(11) NOT NULL,
  `id_periodo` int(11) NOT NULL,
  `id_asesor_externo` int(11) DEFAULT NULL,
  `id_asesor_interno` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_alumno` (`id_alumno`),
  KEY `id_periodo` (`id_periodo`),
  KEY `id_asesor_externo` (`id_asesor_externo`),
  KEY `id_asesor_interno` (`id_asesor_interno`),
  CONSTRAINT `anteproyectos_ibfk_1` FOREIGN KEY (`id_alumno`) REFERENCES `alumnos` (`id`) ON DELETE CASCADE,
  CONSTRAINT `anteproyectos_ibfk_2` FOREIGN KEY (`id_periodo`) REFERENCES `periodos` (`id`) ON DELETE CASCADE,
  CONSTRAINT `anteproyectos_ibfk_3` FOREIGN KEY (`id_asesor_externo`) REFERENCES `asesor_externos` (`id`) ON DELETE CASCADE,
  CONSTRAINT `anteproyectos_ibfk_4` FOREIGN KEY (`id_asesor_interno`) REFERENCES `docentes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `anteproyectos`
--

LOCK TABLES `anteproyectos` WRITE;
/*!40000 ALTER TABLE `anteproyectos` DISABLE KEYS */;
/*!40000 ALTER TABLE `anteproyectos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `asesor_externos`
--

DROP TABLE IF EXISTS `asesor_externos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `asesor_externos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `puesto` varchar(100) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_empresa` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_usuario` (`id_usuario`),
  KEY `id_empresa` (`id_empresa`),
  CONSTRAINT `asesor_externos_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE,
  CONSTRAINT `asesor_externos_ibfk_2` FOREIGN KEY (`id_empresa`) REFERENCES `empresas` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asesor_externos`
--

LOCK TABLES `asesor_externos` WRITE;
/*!40000 ALTER TABLE `asesor_externos` DISABLE KEYS */;
/*!40000 ALTER TABLE `asesor_externos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `asesoria`
--

DROP TABLE IF EXISTS `asesoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `asesoria` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_proyecto` int(11) NOT NULL,
  `id_asesor_interno` int(11) NOT NULL,
  `permitir_generar_formato` tinyint(1) NOT NULL DEFAULT '0',
  `tipo` enum('presencial','virtual') NOT NULL DEFAULT 'virtual',
  `fecha` date NOT NULL,
  `url_avance` varchar(300) NOT NULL,
  `temas_a_asesorar` varchar(500) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_proyecto` (`id_proyecto`),
  KEY `id_asesor_interno` (`id_asesor_interno`),
  CONSTRAINT `asesoria_ibfk_1` FOREIGN KEY (`id_proyecto`) REFERENCES `proyectos` (`id`) ON DELETE CASCADE,
  CONSTRAINT `asesoria_ibfk_2` FOREIGN KEY (`id_asesor_interno`) REFERENCES `docentes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asesoria`
--

LOCK TABLES `asesoria` WRITE;
/*!40000 ALTER TABLE `asesoria` DISABLE KEYS */;
/*!40000 ALTER TABLE `asesoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cancelacion_proyectos`
--

DROP TABLE IF EXISTS `cancelacion_proyectos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cancelacion_proyectos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_proyecto` varchar(255) DEFAULT NULL,
  `justificacion` varchar(255) DEFAULT NULL,
  `id_alumno` int(11) NOT NULL,
  `id_asesor_interno` int(11) DEFAULT NULL,
  `id_periodo` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_alumno` (`id_alumno`),
  KEY `id_asesor_interno` (`id_asesor_interno`),
  KEY `id_periodo` (`id_periodo`),
  CONSTRAINT `cancelacion_proyectos_ibfk_1` FOREIGN KEY (`id_alumno`) REFERENCES `alumnos` (`id`) ON DELETE CASCADE,
  CONSTRAINT `cancelacion_proyectos_ibfk_2` FOREIGN KEY (`id_asesor_interno`) REFERENCES `docentes` (`id`) ON DELETE CASCADE,
  CONSTRAINT `cancelacion_proyectos_ibfk_3` FOREIGN KEY (`id_periodo`) REFERENCES `periodos` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cancelacion_proyectos`
--

LOCK TABLES `cancelacion_proyectos` WRITE;
/*!40000 ALTER TABLE `cancelacion_proyectos` DISABLE KEYS */;
/*!40000 ALTER TABLE `cancelacion_proyectos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carreras`
--

DROP TABLE IF EXISTS `carreras`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `carreras` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(40) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `id_departamento` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`),
  KEY `id_departamento` (`id_departamento`),
  CONSTRAINT `carreras_ibfk_1` FOREIGN KEY (`id_departamento`) REFERENCES `departamentos` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carreras`
--

LOCK TABLES `carreras` WRITE;
/*!40000 ALTER TABLE `carreras` DISABLE KEYS */;
/*!40000 ALTER TABLE `carreras` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `criterio_evaluacion`
--

DROP TABLE IF EXISTS `criterio_evaluacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `criterio_evaluacion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_evaluacion` int(11) NOT NULL,
  `valor_de_evaluacion` int(11) NOT NULL,
  `id_criterio` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_evaluacion` (`id_evaluacion`),
  KEY `id_criterio` (`id_criterio`),
  CONSTRAINT `criterio_evaluacion_ibfk_1` FOREIGN KEY (`id_evaluacion`) REFERENCES `evaluaciones` (`id`) ON DELETE CASCADE,
  CONSTRAINT `criterio_evaluacion_ibfk_2` FOREIGN KEY (`id_criterio`) REFERENCES `criterios` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `criterio_evaluacion`
--

LOCK TABLES `criterio_evaluacion` WRITE;
/*!40000 ALTER TABLE `criterio_evaluacion` DISABLE KEYS */;
/*!40000 ALTER TABLE `criterio_evaluacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `criterios`
--

DROP TABLE IF EXISTS `criterios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `criterios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(300) DEFAULT NULL,
  `valor_max` int(11) DEFAULT NULL,
  `tipo` enum('asesor_externo','asesor_interno') NOT NULL,
  `anexo` varchar(30) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `criterios`
--

LOCK TABLES `criterios` WRITE;
/*!40000 ALTER TABLE `criterios` DISABLE KEYS */;
INSERT INTO `criterios` VALUES (1,'Asiste puntualmente con el horario establecido',5,'asesor_externo','XXIX','2018-02-07 15:21:02','2018-02-07 15:21:02'),(2,'Trabajo en equipo y se comunica de forma efectiva (oral y escrita)',10,'asesor_externo','XXIX','2018-02-07 15:21:02','2018-02-07 15:21:02'),(3,'Tiene iniciativa para colaborar',5,'asesor_externo','XXIX','2018-02-07 15:21:02','2018-02-07 15:21:02'),(4,'Propone mejoras al proyecto',10,'asesor_externo','XXIX','2018-02-07 15:21:02','2018-02-07 15:21:02'),(5,'Cumple con los objetivos correspondientes al proyecto',15,'asesor_externo','XXIX','2018-02-07 15:21:02','2018-02-07 15:21:02'),(6,'Es ordenado y cumple satisfactoriamente con las actividades encomendadas en los tiempos establecidos del cronograma',15,'asesor_externo','XXIX','2018-02-07 15:21:02','2018-02-07 15:21:02'),(7,'Demuestra liderezgo en su actuar',10,'asesor_externo','XXIX','2018-02-07 15:21:02','2018-02-07 15:21:02'),(8,'Demuestra conocimiento en el área de su especialidad',20,'asesor_externo','XXIX','2018-02-07 15:21:02','2018-02-07 15:21:02'),(9,'Demuestra su comportamiento ético (es diciplinado, acata órdenes, respeta a sus compañeros de trabajo, entre otros)',10,'asesor_externo','XXIX','2018-02-07 15:21:02','2018-02-07 15:21:02'),(10,'Asistió puntualmente a las reuniones de asesoría ',10,'asesor_interno','XXIX','2018-02-07 15:21:02','2018-02-07 15:21:02'),(11,'Demuestra conocimiento en el área de su especialidad',20,'asesor_interno','XXIX','2018-02-07 15:21:02','2018-02-07 15:21:02'),(12,'Trabaja en equipo y se comunica de forma efectiva (oral y escrita)',15,'asesor_interno','XXIX','2018-02-07 15:21:02','2018-02-07 15:21:02'),(13,'Es dedicado y proactivo en las actividades encomendadas',20,'asesor_interno','XXIX','2018-02-07 15:21:02','2018-02-07 15:21:02'),(14,'Es ordenado y cumple satisfactoriamente con las actividades encomendadas en los tiempos establecidos en el cronograma',20,'asesor_interno','XXIX','2018-02-07 15:21:02','2018-02-07 15:21:02'),(15,'Propone mejoras al proyecto',15,'asesor_interno','XXIX','2018-02-07 15:21:02','2018-02-07 15:21:02'),(16,'Portada',2,'asesor_externo','XXX','2018-02-07 15:21:02','2018-02-07 15:21:02'),(17,'Agradecimientos',2,'asesor_externo','XXX','2018-02-07 15:21:02','2018-02-07 15:21:02'),(18,'Resumen',2,'asesor_externo','XXX','2018-02-07 15:21:02','2018-02-07 15:21:02'),(19,'Indice',2,'asesor_externo','XXX','2018-02-07 15:21:02','2018-02-07 15:21:02'),(20,'Introducción',2,'asesor_externo','XXX','2018-02-07 15:21:02','2018-02-07 15:21:02'),(21,'Problemas al resolver, priorizándolos',5,'asesor_externo','XXX','2018-02-07 15:21:02','2018-02-07 15:21:02'),(22,'Objetivos',5,'asesor_externo','XXX','2018-02-07 15:21:02','2018-02-07 15:21:02'),(23,'Justificación',0,'asesor_externo','XXX','2018-02-07 15:21:02','2018-02-07 15:21:02'),(24,'Marco teórico (fundamentos teóricos)',10,'asesor_externo','XXX','2018-02-07 15:21:02','2018-02-07 15:21:02'),(25,'Procedimiento y descripción de las actividades realizadas',5,'asesor_externo','XXX','2018-02-07 15:21:02','2018-02-07 15:21:02'),(26,'Resultados, planos, gráficas, prototipos, manuales, programas, análisis estadísticos, modelos matemáticos, simulaciones, normativas, regulaciones, y restricciones, entre otros. Solo para proyectos que por su naturaleza lo requieran: estudio de mercado, estudio técnico y estudio economico.**',45,'asesor_externo','XXX','2018-02-07 15:21:02','2018-02-07 15:21:02'),(27,'Conclusiones, recomendaciones y experiencia profesional adquirida',15,'asesor_externo','XXX','2018-02-07 15:21:02','2018-02-07 15:21:02'),(28,'Competencias desarrolladas y/o aplicadas',3,'asesor_externo','XXX','2018-02-07 15:21:02','2018-02-07 15:21:02'),(29,'Fuentes de información',2,'asesor_externo','XXX','2018-02-07 15:21:02','2018-02-07 15:21:02'),(30,'Portada',2,'asesor_interno','XXX','2018-02-07 15:21:02','2018-02-07 15:21:02'),(31,'Agradecimientos',2,'asesor_interno','XXX','2018-02-07 15:21:02','2018-02-07 15:21:02'),(32,'Resumen',2,'asesor_interno','XXX','2018-02-07 15:21:02','2018-02-07 15:21:02'),(33,'Indice',2,'asesor_interno','XXX','2018-02-07 15:21:02','2018-02-07 15:21:02'),(34,'Introducción',2,'asesor_interno','XXX','2018-02-07 15:21:02','2018-02-07 15:21:02'),(35,'Problemas al resolver, priorizándolos',5,'asesor_interno','XXX','2018-02-07 15:21:02','2018-02-07 15:21:02'),(36,'Objetivos',5,'asesor_interno','XXX','2018-02-07 15:21:02','2018-02-07 15:21:02'),(37,'Justificación',0,'asesor_interno','XXX','2018-02-07 15:21:02','2018-02-07 15:21:02'),(38,'Marco teórico (fundamentos teóricos)',10,'asesor_interno','XXX','2018-02-07 15:21:02','2018-02-07 15:21:02'),(39,'Procedimiento y descripción de las actividades realizadas',5,'asesor_interno','XXX','2018-02-07 15:21:02','2018-02-07 15:21:02'),(40,'Resultados, planos, gráficas, prototipos, manuales, programas, análisis estadísticos, modelos matemáticos, simulaciones, normativas, regulaciones, y restricciones, entre otros. Solo para proyectos que por su naturaleza lo requieran: estudio de mercado, estudio técnico y estudio economico.**',45,'asesor_interno','XXX','2018-02-07 15:21:02','2018-02-07 15:21:02'),(41,'Conclusiones, recomendaciones y experiencia profesional adquirida',15,'asesor_interno','XXX','2018-02-07 15:21:02','2018-02-07 15:21:02'),(42,'Competencias desarrolladas y/o aplicadas',3,'asesor_interno','XXX','2018-02-07 15:21:02','2018-02-07 15:21:02'),(43,'Fuentes de información',2,'asesor_interno','XXX','2018-02-07 15:21:02','2018-02-07 15:21:02'),(44,'Asiste puntualmente con el horario establecido',5,'asesor_externo','III','2018-02-07 15:21:02','2018-02-07 15:21:02'),(45,'Trabajo en equipo',10,'asesor_externo','III','2018-02-07 15:21:02','2018-02-07 15:21:02'),(46,'Tiene iniciativa para ayudar en las actividades encomendadas',10,'asesor_externo','III','2018-02-07 15:21:02','2018-02-07 15:21:02'),(47,'Organiza su tiempo y trabaja sin necesidad de una superación estrecha',5,'asesor_externo','III','2018-02-07 15:21:02','2018-02-07 15:21:02'),(48,'Realiza mejoras al proyecto',10,'asesor_externo','III','2018-02-07 15:21:02','2018-02-07 15:21:02'),(49,'Cumple con los objetivos correspondientes al proyecto',10,'asesor_externo','III','2018-02-07 15:21:02','2018-02-07 15:21:02'),(50,'Mostró responsabilidad y compromiso en la residencia profesional',5,'asesor_interno','III','2018-02-07 15:21:02','2018-02-07 15:21:02'),(51,'Realizó un trabajo innovador en su área de desempeño',10,'asesor_interno','III','2018-02-07 15:21:02','2018-02-07 15:21:02'),(52,'Aplica las competencias para la realización del proyecto',10,'asesor_interno','III','2018-02-07 15:21:02','2018-02-07 15:21:02'),(53,'Es dedicado y proactivo en los trabajos encomendados',10,'asesor_interno','III','2018-02-07 15:21:02','2018-02-07 15:21:02'),(54,'Cumple con los objetivos correspondiente al proyecto',10,'asesor_interno','III','2018-02-07 15:21:02','2018-02-07 15:21:02'),(55,'Entrega en tiempo y forma el informe técnico',5,'asesor_interno','III','2018-02-07 15:21:02','2018-02-07 15:21:02');
/*!40000 ALTER TABLE `criterios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `departamentos`
--

DROP TABLE IF EXISTS `departamentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `departamentos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(40) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departamentos`
--

LOCK TABLES `departamentos` WRITE;
/*!40000 ALTER TABLE `departamentos` DISABLE KEYS */;
/*!40000 ALTER TABLE `departamentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `docente_carreras`
--

DROP TABLE IF EXISTS `docente_carreras`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `docente_carreras` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_docente` int(11) NOT NULL,
  `id_carrera` int(11) NOT NULL,
  `rol` enum('docente','jefe_proyecto','presidente_academia','deshabilitado') NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `index_uq_docente_carreras` (`id_docente`,`id_carrera`),
  KEY `id_carrera` (`id_carrera`),
  CONSTRAINT `docente_carreras_ibfk_1` FOREIGN KEY (`id_docente`) REFERENCES `docentes` (`id`) ON DELETE CASCADE,
  CONSTRAINT `docente_carreras_ibfk_2` FOREIGN KEY (`id_carrera`) REFERENCES `carreras` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `docente_carreras`
--

LOCK TABLES `docente_carreras` WRITE;
/*!40000 ALTER TABLE `docente_carreras` DISABLE KEYS */;
/*!40000 ALTER TABLE `docente_carreras` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `docentes`
--

DROP TABLE IF EXISTS `docentes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `docentes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(40) NOT NULL,
  `ap_paterno` varchar(30) NOT NULL,
  `ap_materno` varchar(30) NOT NULL,
  `titulo` varchar(10) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_departamento` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_usuario` (`id_usuario`),
  KEY `id_departamento` (`id_departamento`),
  CONSTRAINT `docentes_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE,
  CONSTRAINT `docentes_ibfk_2` FOREIGN KEY (`id_departamento`) REFERENCES `departamentos` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `docentes`
--

LOCK TABLES `docentes` WRITE;
/*!40000 ALTER TABLE `docentes` DISABLE KEYS */;
/*!40000 ALTER TABLE `docentes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empresas`
--

DROP TABLE IF EXISTS `empresas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `empresas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(200) NOT NULL,
  `clasificacion` enum('industrial','servicios','público','privado','otro') NOT NULL,
  `rfc` varchar(13) DEFAULT NULL,
  `domicilio` varchar(50) DEFAULT NULL,
  `colonia` varchar(50) DEFAULT NULL,
  `mision` varchar(600) NOT NULL DEFAULT '',
  `codigo_postal` varchar(5) DEFAULT NULL,
  `fax` varchar(15) DEFAULT NULL,
  `id_titular` int(11) NOT NULL,
  `id_representante_legal` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`),
  KEY `fk_titular_empresa` (`id_titular`),
  KEY `fk_representante_legal_empresa` (`id_representante_legal`),
  CONSTRAINT `fk_representante_legal_empresa` FOREIGN KEY (`id_representante_legal`) REFERENCES `titulares` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_titular_empresa` FOREIGN KEY (`id_titular`) REFERENCES `titulares` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empresas`
--

LOCK TABLES `empresas` WRITE;
/*!40000 ALTER TABLE `empresas` DISABLE KEYS */;
INSERT INTO `empresas` VALUES (1,'CETEC JÚAREZ, S.C.','servicios','CJU990112T96','Avenida Júarez n.6','Centro','En CETEC estamos comprometidos a contribuir al progreso de México, formando profesionales plenamente calificados en el área de la computación, inglés y preparatoria, garantizándoles la capacitación más avanzada y sembrando en ellos valores de excelencia y calidad humana; \nmediante la participación y mejora continua de nuestro personal y de  una permanente actualización tecnológica.\n\nFortaleciendo la solidez económica y social de todos los que conducimos la empresa hacia su crecimiento constante. Y a su absoluto liderazgo en el mercado.','39000','',1,2,'2018-02-07 15:30:27','2018-02-07 15:30:56');
/*!40000 ALTER TABLE `empresas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `evaluaciones`
--

DROP TABLE IF EXISTS `evaluaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `evaluaciones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `observaciones` varchar(500) NOT NULL DEFAULT '',
  `tipo` enum('asesor_externo','asesor_interno') NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evaluaciones`
--

LOCK TABLES `evaluaciones` WRITE;
/*!40000 ALTER TABLE `evaluaciones` DISABLE KEYS */;
/*!40000 ALTER TABLE `evaluaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `observaciones`
--

DROP TABLE IF EXISTS `observaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `observaciones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_proyecto` int(11) NOT NULL,
  `id_asesor_interno` int(11) NOT NULL,
  `observacion` varchar(500) DEFAULT NULL,
  `solucionada` tinyint(1) DEFAULT '0',
  `tipo` enum('plan_de_trabajo','cronograma') NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_proyecto` (`id_proyecto`),
  KEY `id_asesor_interno` (`id_asesor_interno`),
  CONSTRAINT `observaciones_ibfk_1` FOREIGN KEY (`id_proyecto`) REFERENCES `proyectos` (`id`) ON DELETE CASCADE,
  CONSTRAINT `observaciones_ibfk_2` FOREIGN KEY (`id_asesor_interno`) REFERENCES `docentes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `observaciones`
--

LOCK TABLES `observaciones` WRITE;
/*!40000 ALTER TABLE `observaciones` DISABLE KEYS */;
/*!40000 ALTER TABLE `observaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `periodos`
--

DROP TABLE IF EXISTS `periodos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `periodos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `periodo` enum('FEBRERO-JUNIO','AGOSTO-DICIEMBRE') NOT NULL,
  `ciclo` varchar(4) NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date NOT NULL,
  `fecha_inicio_entrega_anteproyecto` date NOT NULL,
  `fecha_fin_entrega_anteproyecto` date NOT NULL,
  `filename_dictamen` varchar(255) DEFAULT NULL,
  `id_carrera` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `index_uq_periodo_ciclo` (`periodo`,`ciclo`,`id_carrera`),
  KEY `id_carrera` (`id_carrera`),
  CONSTRAINT `periodos_ibfk_1` FOREIGN KEY (`id_carrera`) REFERENCES `carreras` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `periodos`
--

LOCK TABLES `periodos` WRITE;
/*!40000 ALTER TABLE `periodos` DISABLE KEYS */;
/*!40000 ALTER TABLE `periodos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proyectos`
--

DROP TABLE IF EXISTS `proyectos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `proyectos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `filename_plan_trabajo` varchar(200) DEFAULT NULL,
  `aprobacion_plan_trabajo` tinyint(1) DEFAULT '0',
  `filename_cronograma` varchar(200) DEFAULT NULL,
  `aprobacion_cronograma` tinyint(1) DEFAULT '0',
  `url_informe_tecnico` varchar(300) DEFAULT NULL,
  `autorizar_carta_liberacion_asesor_interno` tinyint(1) DEFAULT '0',
  `autorizar_carta_liberacion_asesor_externo` tinyint(1) DEFAULT '0',
  `id_anteproyecto` int(11) NOT NULL,
  `id_evaluacion_asesor_interno` int(11) DEFAULT NULL,
  `id_evaluacion_asesor_externo` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_anteproyecto` (`id_anteproyecto`),
  KEY `fkey_id_evaluacion_asesor_interno` (`id_evaluacion_asesor_interno`),
  KEY `fkey_id_evaluacion_asesor_externo` (`id_evaluacion_asesor_externo`),
  CONSTRAINT `fkey_id_evaluacion_asesor_externo` FOREIGN KEY (`id_evaluacion_asesor_externo`) REFERENCES `evaluaciones` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fkey_id_evaluacion_asesor_interno` FOREIGN KEY (`id_evaluacion_asesor_interno`) REFERENCES `evaluaciones` (`id`) ON DELETE CASCADE,
  CONSTRAINT `proyectos_ibfk_1` FOREIGN KEY (`id_anteproyecto`) REFERENCES `anteproyectos` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proyectos`
--

LOCK TABLES `proyectos` WRITE;
/*!40000 ALTER TABLE `proyectos` DISABLE KEYS */;
/*!40000 ALTER TABLE `proyectos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `revision_anteproyectos`
--

DROP TABLE IF EXISTS `revision_anteproyectos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `revision_anteproyectos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `esFactible` enum('factible','no_factible','corrección') NOT NULL DEFAULT 'no_factible',
  `comentario` varchar(500) DEFAULT NULL,
  `id_docente` int(11) NOT NULL,
  `id_anteproyecto` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_revision_anteproyectos_id_docente_id_anteproyecto` (`id_docente`,`id_anteproyecto`),
  KEY `id_anteproyecto` (`id_anteproyecto`),
  CONSTRAINT `revision_anteproyectos_ibfk_1` FOREIGN KEY (`id_docente`) REFERENCES `docentes` (`id`) ON DELETE CASCADE,
  CONSTRAINT `revision_anteproyectos_ibfk_2` FOREIGN KEY (`id_anteproyecto`) REFERENCES `anteproyectos` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `revision_anteproyectos`
--

LOCK TABLES `revision_anteproyectos` WRITE;
/*!40000 ALTER TABLE `revision_anteproyectos` DISABLE KEYS */;
/*!40000 ALTER TABLE `revision_anteproyectos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `revision_seguimientos`
--

DROP TABLE IF EXISTS `revision_seguimientos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `revision_seguimientos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_seguimiento_proyecto` int(11) NOT NULL,
  `id_docente` int(11) NOT NULL,
  `observacion` varchar(500) NOT NULL,
  `solucionado` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_seguimiento_proyecto` (`id_seguimiento_proyecto`),
  KEY `id_docente` (`id_docente`),
  CONSTRAINT `revision_seguimientos_ibfk_1` FOREIGN KEY (`id_seguimiento_proyecto`) REFERENCES `seguimiento_proyectos` (`id`) ON DELETE CASCADE,
  CONSTRAINT `revision_seguimientos_ibfk_2` FOREIGN KEY (`id_docente`) REFERENCES `docentes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `revision_seguimientos`
--

LOCK TABLES `revision_seguimientos` WRITE;
/*!40000 ALTER TABLE `revision_seguimientos` DISABLE KEYS */;
/*!40000 ALTER TABLE `revision_seguimientos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seguimiento_proyectos`
--

DROP TABLE IF EXISTS `seguimiento_proyectos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `seguimiento_proyectos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url_seguimiento` varchar(300) DEFAULT NULL,
  `id_seguimiento` int(11) NOT NULL,
  `id_proyecto` int(11) DEFAULT NULL,
  `id_evaluacion_asesor_interno` int(11) DEFAULT NULL,
  `id_evaluacion_asesor_externo` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_seguimiento` (`id_seguimiento`),
  KEY `id_proyecto` (`id_proyecto`),
  KEY `fkey_id_evaluacion_asesor_interno_seguimiento` (`id_evaluacion_asesor_interno`),
  KEY `fkey_id_evaluacion_asesor_externo_seguimiento` (`id_evaluacion_asesor_externo`),
  CONSTRAINT `fkey_id_evaluacion_asesor_externo_seguimiento` FOREIGN KEY (`id_evaluacion_asesor_externo`) REFERENCES `evaluaciones` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fkey_id_evaluacion_asesor_interno_seguimiento` FOREIGN KEY (`id_evaluacion_asesor_interno`) REFERENCES `evaluaciones` (`id`) ON DELETE CASCADE,
  CONSTRAINT `seguimiento_proyectos_ibfk_1` FOREIGN KEY (`id_seguimiento`) REFERENCES `seguimientos` (`id`) ON DELETE CASCADE,
  CONSTRAINT `seguimiento_proyectos_ibfk_2` FOREIGN KEY (`id_proyecto`) REFERENCES `proyectos` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seguimiento_proyectos`
--

LOCK TABLES `seguimiento_proyectos` WRITE;
/*!40000 ALTER TABLE `seguimiento_proyectos` DISABLE KEYS */;
/*!40000 ALTER TABLE `seguimiento_proyectos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seguimientos`
--

DROP TABLE IF EXISTS `seguimientos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `seguimientos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_periodo` int(11) NOT NULL,
  `fecha_inicial` date NOT NULL,
  `fecha_final` date NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_periodo` (`id_periodo`),
  CONSTRAINT `seguimientos_ibfk_1` FOREIGN KEY (`id_periodo`) REFERENCES `periodos` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seguimientos`
--

LOCK TABLES `seguimientos` WRITE;
/*!40000 ALTER TABLE `seguimientos` DISABLE KEYS */;
/*!40000 ALTER TABLE `seguimientos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `SequelizeMeta_name_unique` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sequelizemeta`
--

LOCK TABLES `sequelizemeta` WRITE;
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
INSERT INTO `sequelizemeta` VALUES ('20170918013002-create-usuario.js'),('20170918013227-create-departamento.js'),('20170918013844-create-carrera.js'),('20170918172201-create-docente.js'),('20170920205603-create-empresa.js'),('20170920210716-create-tipo-seguro.js'),('20170920211127-create-alumno.js'),('20170921002811-create-asesor-externo.js'),('20170921004100-create-periodo.js'),('20170921010430-create-anteproyecto.js'),('20170927205531-create-docente-carreras.js'),('20170927212730-add_index_to_docente_carreras.js'),('20170928165346-add_index_to_periodo.js'),('20171002145821-create-revision-anteproyecto.js'),('20171019185303-create-proyecto.js'),('20171019185626-create-asesoria.js'),('20171019185832-create-solucion-recomendada.js'),('20171019190006-create-seguimiento.js'),('20171019190119-create-seguimiento-proyecto.js'),('20171019190323-create-revision-seguimiento.js'),('20171023182138-create-observaciones.js'),('20171114194346-create-evaluacion.js'),('20171114204056-add_foreignkeys_evaluacion_to_proyecto.js'),('20171116024245-create-criterio.js'),('20171116031524-create-criterio-evaluacion.js'),('20171127225003-create-cancelacion-proyecto.js'),('20171206040123-add_fk_seguimiento_proyecto_to_evaluacion.js'),('20180123162607-create-titular.js'),('20180123170407-add_fk_empresa_to_titulares.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `solucion_recomendadas`
--

DROP TABLE IF EXISTS `solucion_recomendadas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `solucion_recomendadas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_asesoria` int(11) NOT NULL,
  `solucion` varchar(255) NOT NULL,
  `solucionado` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_asesoria` (`id_asesoria`),
  CONSTRAINT `solucion_recomendadas_ibfk_1` FOREIGN KEY (`id_asesoria`) REFERENCES `asesoria` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `solucion_recomendadas`
--

LOCK TABLES `solucion_recomendadas` WRITE;
/*!40000 ALTER TABLE `solucion_recomendadas` DISABLE KEYS */;
/*!40000 ALTER TABLE `solucion_recomendadas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_seguros`
--

DROP TABLE IF EXISTS `tipo_seguros`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipo_seguros` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(40) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_seguros`
--

LOCK TABLES `tipo_seguros` WRITE;
/*!40000 ALTER TABLE `tipo_seguros` DISABLE KEYS */;
INSERT INTO `tipo_seguros` VALUES (1,'IMMS','2018-02-07 15:21:02','2018-02-07 15:21:02'),(2,'ISSTE','2018-02-07 15:21:02','2018-02-07 15:21:02'),(3,'METLIFE','2018-02-07 15:21:02','2018-02-07 15:21:02'),(4,'GNP','2018-02-07 15:21:02','2018-02-07 15:21:02'),(5,'QUÁLITAS','2018-02-07 15:21:02','2018-02-07 15:21:02'),(6,'INBURSA','2018-02-07 15:21:02','2018-02-07 15:21:02'),(7,'OTRO','2018-02-07 15:21:02','2018-02-07 15:21:02');
/*!40000 ALTER TABLE `tipo_seguros` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `titulares`
--

DROP TABLE IF EXISTS `titulares`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `titulares` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(10) NOT NULL,
  `nombre` varchar(70) NOT NULL,
  `puesto` varchar(50) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `titulares`
--

LOCK TABLES `titulares` WRITE;
/*!40000 ALTER TABLE `titulares` DISABLE KEYS */;
INSERT INTO `titulares` VALUES (1,'LIC.','Debora Cecilia Medina Bergman','Directora del Plantel','2018-02-07 15:30:27','2018-02-07 15:30:56'),(2,'LIC.','Debora Cecilia Medina Bergman','Directora del Plantel','2018-02-07 15:30:27','2018-02-07 15:30:56');
/*!40000 ALTER TABLE `titulares` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `correo` varchar(60) NOT NULL,
  `contrasenia` varchar(100) NOT NULL,
  `rol` enum('candidato_residente','residente','docente','admin','jefe_departamento','asesor_externo','subdirector_academico') NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `correo` (`correo`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'seguimientoresidenciasitch@gmail.com','$2a$08$mNDUAIKYymwCOtNYpxH/uOKIU2tbsaHEiXUSDuYqKdqqPHBtkR242','admin','2018-02-07 15:21:02','2018-02-07 15:21:02');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-02-07 12:46:06
