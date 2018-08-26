-- MySQL dump 10.13  Distrib 5.6.39, for Linux (x86_64)
--
-- Host: localhost    Database: seguimiento_residencias
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
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alumnos`
--

LOCK TABLES `alumnos` WRITE;
/*!40000 ALTER TABLE `alumnos` DISABLE KEYS */;
INSERT INTO `alumnos` VALUES (1,'10520290','2009-2010','Alondra Estefania','Reyes','Flores','M','Campeche #12 Colonia San José',NULL,NULL,'12303634294','747781256','chilpancingo',1,1,24,'2018-02-14 14:39:43','2018-02-14 14:39:43'),(2,'10520522','2009-2010','José Arturo','Moto','Reyes','H','América del Norte, Manzana 10, Lote 4. Col las Américas',NULL,NULL,'12303633452','4715030','chilpancingo',1,1,25,'2018-02-14 14:52:54','2018-02-14 14:52:54'),(3,'12520153','2009-2010','Bismark','Ortega','Saavedra','H','CDA DE AMATITOS 6 COL. MOCTEZUMA 39020 CHIPANCINGO DE LOS BRAVO.',NULL,NULL,'05169314118','5525374338','chilpancingo',1,1,26,'2018-02-14 15:27:00','2018-02-14 15:27:00'),(4,'13520461','2009-2010','David Fernando','Carbajal ','Cabrera','H','Fracc. Rio Azul segunda Etapa Calle Rio Yaqui Mz6 Lt39',NULL,NULL,'05169444790','4710241','Chilpancingo',1,1,27,'2018-02-14 15:36:54','2018-02-14 15:36:54'),(5,'13520436','2009-2010','Samuel Adrián','Molina','Derramona','H','Calle 30 de Agosto, #28  Colonia Sección Séptima C.P. 39038',NULL,NULL,'08169520858','4786032','Chilpancingo',1,1,28,'2018-02-14 15:40:13','2018-02-14 15:40:13'),(6,'10520288','2009-2010','Victor Arnulfo','Ramirez','Pavon','H','Calle S\\N, Lote #40 Col. Agua potable y alcantarillado C.P. 39070',NULL,NULL,'72935204536','7451107882','Chilpancingo',1,1,29,'2018-02-14 15:51:14','2018-02-14 15:51:14'),(7,'12520092','2009-2010','JUAN CARLOS','RENTERIA','LOPEZ','H','COL. RUBEN MORA CALLE: GABRIEL GARCÍA MÁRQUEZ M.8 L.5 C.P.39094',NULL,NULL,'18149328868','7471620998','Chilpancingo, Gro. ',1,1,30,'2018-02-14 15:54:44','2018-02-14 15:54:44'),(8,'15520116','2009-2010','Osvaldo Daniel','Amador','Salinas','H','Av. Del Sur Núm. 57 Colonia la Cima.',NULL,NULL,'08169585778','7471826060','Chilpancingo de los Bravo, Gro. ',1,1,31,'2018-02-14 15:58:58','2018-02-14 15:58:58'),(9,'13520429','2009-2010','Susana Yaretzin','de la Cruz','Bernabé','M','Calle Ayutla No. 35 Colonia Progreso C.P: 39050',NULL,NULL,'08169563247','747 – 49 4 85 75','Chilpancingo, Guerrero',1,1,32,'2018-02-14 16:32:09','2018-02-14 16:32:09'),(10,'09520406','2009-2010','ANIBAL','CLAVEL','MOZO','H','CALLE CARITINO MALDONADO #20, COL.SANTUARIO, C.P. 39170, TIXTLA DE GUERRERO',NULL,NULL,'12345','7541078059','TIXTLA DE GUERRERO, GUERRERO',7,1,33,'2018-02-14 16:42:28','2018-02-14 16:42:28'),(11,'13520492','2009-2010','Alberto','Gonzalez','Guzman','H','Calle Galileo Galilei, Mz.7 Lt. 19, Col. San Jose C.P 39015',NULL,NULL,'12305678521','(747) - 4786334','Chilpancingo, Guerrero ',1,1,34,'2018-02-14 16:44:36','2018-02-14 16:44:36'),(12,'12520353','2009-2010','Jaime Christopher','González','Benítez','H','And. 17 SN Col. Emiliano Zapata C.P. 39050',NULL,NULL,'05169365177','(747) 137 8277','Chilpancingo, Gro. ',1,1,35,'2018-02-14 17:04:15','2018-02-14 17:04:15'),(13,'13520501','2009-2010','José Juan','Morales','Tolentino','H','Calle: Arnoldo Martínez S/N col. PRD',NULL,NULL,'08169551283','7471624024','Chilpancingo de los Bravo ',1,1,36,'2018-02-14 17:07:21','2018-02-14 17:07:21'),(14,'12520203','2009-2010','Gumercindo','Venalonzo','Martínez','H','Calle Salvador Días Mirón #8 Barrio de San Miguelito Mochitlan Gro. C.P: 39230',NULL,NULL,'05169359493','7471599440','Mochitlan Gro.',1,1,37,'2018-02-14 22:14:15','2018-02-14 22:14:15'),(15,'13520421','2009-2010','Sonia Guadalupe','García','Duran','M','Calle: Corregidora Nº142 Colonia: Independencia',NULL,NULL,'08169563718','7471720389','Chilpancingo de los Bravo ',1,1,38,'2018-02-14 22:15:46','2018-02-14 22:15:46'),(16,'12520290','2009-2010','ESNAIDER IVAN ','HERNANDEZ','CARRILLO','H','AV. Guerrero No.58 Col. San José Tierra Colorada Guerrero',NULL,NULL,'05169479804','7471028207','Chilpancingo, Gro.',2,1,39,'2018-02-14 22:17:18','2018-02-14 22:17:18'),(17,'12520068','2009-2010','Diana Laura','Velez','Tolentino','M','Calle. Lerdo de Tejada, Colonia Vista Hermosa',NULL,NULL,'05169315123','7454770726','Chilpancingo De Los Bravo Gro.',1,1,40,'2018-02-14 22:20:00','2018-02-14 22:20:00'),(18,'13520541','2009-2010','Francisco','Arcos','Jaimes','H','Prol Lazaro Cardenas LT20, Col. Zapata, CP 39050',NULL,NULL,'27149547302','7471394132','Chilpancingo',1,1,41,'2018-02-14 22:25:56','2018-02-14 22:25:56'),(19,'13520533','2009-2010','ALFREDO','LARIOS','VILLANUEVA','H','GARDENIAS L4 M11 COL.BUGAMBILIAS JAZMINES MED UL5522 Y ESQ LIRIOS C.P.39090',NULL,NULL,'18149328868','7471752541','Chilpancingo, Gro.',1,1,42,'2018-02-14 22:41:10','2018-02-14 22:41:10'),(20,'13520476','2009-2010','José Manuel','Hernández','Antaño','H',' Avenida Constitución No.9, Barrio de San Agustín, Petaquillas Gro.',NULL,NULL,'08169504308','49 1 23 73','Chilpancingo',1,1,43,'2018-02-14 22:43:12','2018-02-14 22:43:12'),(21,'12520145','2009-2010','Karen','Nava','Díaz','M','Calle: Ejido No.16 Colonia: Guerrero C.P 39020',NULL,NULL,'05169307039','7471845020','Chilpancingo de los Bravo, Gro.',1,1,44,'2018-02-14 22:45:19','2018-02-14 22:45:19'),(22,'09520608','2009-2010','Jair','Relles','Salgado','H','Calle Aguila Imperial #11. Col. C.N.O.P, Sección \"C\".',NULL,NULL,'63169069141','7474712859','Chilpancingo, Gro.',1,1,45,'2018-02-14 22:48:50','2018-02-14 22:48:50'),(23,'12520196','2009-2010','Francisco','Nieto','Dominguez','H','Av. Las Torres s/n Col. Ampliación Santa Cruz Norte',NULL,NULL,'05169352217','7471389708','Chilpancingo De Los Bravo Gro.',1,1,47,'2018-02-15 11:49:17','2018-02-15 11:49:17'),(24,'11520492','2009-2010','Marisol','Isidro','Flores','M','Francisco Javier Mina N°4, Colonia Centro',NULL,NULL,'0455535326534','7474989799','Chilpancingo de los Bravo.',1,1,48,'2018-02-15 11:53:01','2018-02-15 11:53:01'),(25,'13520439','2009-2010','Emmanuel','Romero','Sánchez','H','Zaragoza No. 65 Col. Centro',NULL,NULL,'11','7421141198','Chilpancingo de los Bravo, Gro',1,1,49,'2018-02-15 11:55:38','2018-02-15 11:55:38'),(26,'10520502','2009-2010','JOEL','ALCOCER','GUTIERREZ','H','LAS FLORES 26, SANTA URSULA COAPA',NULL,NULL,'12071922746','55 73255468','CHILPANCINGO',1,1,51,'2018-02-15 23:19:52','2018-02-15 23:19:52'),(27,'12520355','2009-2010','José Antonio','Hernández','Garcia','H','Calle Tonantzin col. fracc azteca',NULL,NULL,'72129306519','4789252','Chilpancingo Gro.',1,1,56,'2018-02-16 11:03:02','2018-02-16 11:03:02'),(28,'11520443','2009-2010','Alexis Jair','Espiritu','Alonso','H','Calle Insurgentes S/N Barrio de San Pedro , CP 39230',NULL,NULL,'72129324207','7471407918',' Mochitlan , Guerrero ',1,1,59,'2018-02-19 11:55:46','2018-02-19 11:55:46');
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
  `nombre` varchar(600) DEFAULT NULL,
  `objetivo_general` varchar(600) DEFAULT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `anteproyectos`
--

LOCK TABLES `anteproyectos` WRITE;
/*!40000 ALTER TABLE `anteproyectos` DISABLE KEYS */;
INSERT INTO `anteproyectos` VALUES (1,'Desarrollo de actividades profesionales en apoyo al Departamento de Sistemas y Computación en el Instituto Tecnológico de Chilpancingo.','Desarrollar actividades profesionales en apoyo al Departamento de Sistemas y Computación del Instituto Tecnológico de Chilpancingo.\n\n','Trabajador','aprobado','4d2d4f4daeffc323fb7f4005255ebb05',1,1,13,6,'2018-02-14 14:39:43','2018-02-20 09:05:26'),(2,'Desarrollo de un sistema web gestor de banco de reactivos para el apoyo del aprendizaje y evaluación de la materia lenguajes de interfaz del instituto tecnológico de Chilpancingo Gro.','Desarrollar un sistema que permita al maestro dar seguimiento a las evaluaciones parciales de los alumnos de la materia lenguajes de interfaz del Instituto Tecnológico de Chilpancingo a través de un sistema gestor banco reactivos.','Propuesta propia','aprobado','85bcbdcfc8f6fc42d89e83830447b306',2,1,11,5,'2018-02-14 14:52:54','2018-02-20 09:05:43'),(3,'Desarrollo de actividades profesionales en apoyo al Departamento de Sistemas y Computación en el Instituto Tecnológico de Chilpancingo.','Desarrollar actividades profesionales en apoyo al Departamento de Sistemas y Computación del Instituto Tecnológico de Chilpancingo','Trabajador','aprobado','5494b621915704691e4763e26f4e6f1a',3,1,13,6,'2018-02-14 15:27:00','2018-02-20 09:05:59'),(4,'“SISTEMA DE CONTROL ESCOLAR Y LABORAL DE CORPORATIVO CETEC-CHILPANCINGO PARA GESTIONAR DATOS DE LA INSTITUCIÓN CON CONSULTA DE LOS MISMOS POR MEDIO DE UNA PÁGINA WEB”                   ','Analizar, diseñar e implementar un sistema de control escolar y una página web con el uso de herramientas de diseño y programación para mejorar y agilizar la gestión de datos de corporativo cetec.','Propuesta propia','aprobado','02a3e1b72268f5238ec1e4716711eb4a',4,1,10,4,'2018-02-14 15:36:54','2018-02-16 10:10:07'),(5,'“SISTEMA WEB DE SEGUIMIENTO Y CONSULTA DE COMPROBACIÓN DE GASTOS DE PROYECTOS PARA LA COORDINACIÓN ESTATAL DEL SERVICIO PROFESIONAL DOCENTE (CESPD) DEL ESTADO DE GUERRERO”.','Diseñar e implementar un Sistema Web para la Coordinación Estatal del Servicio Profesional Docente (CESPD) para optimizar el seguimiento y consulta de comprobación de gastos de proyectos aprobados a las direcciones y departamentos de la Coordinación.','Propuesta propia','aprobado','6f460a4d12f1b1c062ab78a754637c03',5,1,5,4,'2018-02-14 15:40:13','2018-02-20 09:37:25'),(6,' Sistema web para la gestión  del  abastecimiento, almacenamiento y distribución de  insumos para los servicios del HOSPITAL DE LA MADRE Y EL NIÑO GUERRERENSE en el área de jefatura de Enfermería.','Desarrollar e implementar un Sistema web para la gestión del  abastecimiento, almacenamiento y distribución de  insumos para los servicios del HOSPITAL DE LA MADRE Y EL NIÑO GUERRERENSE en el área de Jefatura de Enfermería.','Propuesta propia','aprobado','ffdee5b83c2453946780d6120d75a03f',6,1,11,7,'2018-02-14 15:51:14','2018-02-20 09:38:05'),(7,'Desarrollar un sistema en ambiente web para la gestión de los cursos de verano del Instituto Tecnológico de Chilpancingo.','Desarrollar un sistema en ambiente web para la preinscripción, inscripción,\nseguimiento y evaluación de los cursos de verano del Instituto Tecnológico de\nChilpancingo.','Trabajador','aprobado','0bfcd049d0029a3bfea47f159bfa726e',7,1,19,4,'2018-02-14 15:54:44','2018-02-21 14:44:33'),(8,'CONSTRUCCIÓN DE UN BRAZO ROBÓTICO PARA SERVIR DE PLATAFORMA DE APRENDIZAJE EN EL INSTITUTO TECNOLÓGICO DE CHILPANCINGO.','Desarrollar e implementar un brazo robótico utilizando Raspberry Pi, controlando\nsus movimientos y uso con una aplicación móvil desarrollada para el SO Android, y servir\nde plataforma de aprendizaje para los estudiantes que estén cursando materias\nenfocadas al área.','Propuesta propia','aprobado','e8ffe3b453113e878c64b82aad09094b',8,1,9,7,'2018-02-14 15:58:59','2018-02-20 09:40:07'),(9,'SISTEMA WEB DEL SEGUIMIENTO Y CONTROL DE TRATAMIENTOS CLINICOS PSICOLOGICOS PARA LA UNIDAD DE ESPECIALIDAD MEDICA - CENTRO DE ATENCION PRIMARIA EN ADICCIONES (UNEME - CAPA)','Desarrollar e implementar un sistema web mediante el uso del FrameWork Node.Js y el Gestor de base de datos MySql, para el seguimiento y control de los tratamientos clínicos psicológicos de UNEME - CAPA','Propuesta propia','aprobado','9391b932e2dfac56d18108964acbe537',9,1,2,5,'2018-02-14 16:32:09','2018-02-20 09:40:28'),(10,'DESARROLLO DE UN SISTEMA WEB PARA EL APOYO A LA SECRETARÍA DE LA JUVENTUD Y LA NIÑEZ DEL ESTADO DE GUERRERO EN LA ATENCIÓN Y SEGUIMIENTO DE LA PREVENCIÓN DE ADICCIONES, CASOS VIOLENCIA Y EDUCACIÓN SEXUAL EN JOVENES GUERRERENSES.','Desarrollar un sistema web para el apoyo a la SEJUVE en la Atención y Seguimiento\nde Prevención de Adicciones, Casos de Violencia y Educación Sexual en los\nJóvenes Guerrerenses.','Propuesta propia','aprobado','cf1affa6fe2650f53711c6743d3268da',10,1,20,5,'2018-02-14 16:42:28','2018-02-20 09:40:46'),(11,'Sistema web de gestión de renta de servicios de transporte para la empresa  de Servicios Turísticos Terrestres (Servibus).','Desarrollar e implementar un sistema web de gestión del proceso de renta  de servicios de transporte mediante el uso  de herramientas de diseño responsivo  y programación  para agilizar y llevar un control interno','Propuesta propia','aprobado','6605ea333416df3976ea782a7da0ca92',11,1,1,5,'2018-02-14 16:44:36','2018-02-20 09:40:55'),(12,'Desarrollo de una prótesis mioeléctrica con arduino para personas que les hace falta un miembro superior en el Centro de Rehabilitación Integral de Guerrero','Desarrollar una prótesis mioeléctrica mediante el uso de una placa arduino, sensores de musculo, electrodos de superficie y componentes electronicos para la mejor comodidad y uso de la prótesis al usuario.','Propuesta propia','aprobado','66fc3c1a60451bbdeb87f2cffb815747',12,1,12,7,'2018-02-14 17:04:15','2018-02-20 09:41:13'),(13,'DESARROLLO DE UN SISTEMA WEB, CON SISTEMA DE GESTIÓN DE CONTENIDOS (CMS) PARA LA SECRETARÍA DE TURISMO DEL MUNICIPIO DE CHILPANCINGO.','Desarrollar un sistema web, con Sistema Gestor de Contenidos (CMS) para la Secretaría de Turismo del municipio de Chilpancingo.','Trabajador','aprobado','64555b0094576bcbcd050aeb889c2750',13,1,3,4,'2018-02-14 17:07:21','2018-02-20 09:41:29'),(14,'Desarrollo de una impresora 3D con arduino para la elaboración de prótesis en el \"Centro de Rehabilitación Integral de Guerrero CRIG\"  ','Desarrollar una impresora 3D mediante el uso de arduino mega como herramienta para la elaboración de prótesis de bajo costo','Propuesta propia','aprobado','dac1783ef2c37101a94fcfb34f3a9068',14,1,12,5,'2018-02-14 22:14:15','2018-02-20 09:41:45'),(15,'Desarrollar un manual de prácticas para el apoyo de la asignatura de Fundamentos de Programación en el Instituto Tecnológico de Chilpancingo.','Desarrollar e implementar un manual de prácticas para el apoyo de la asignatura de Fundamentos de Programación en el Instituto Tecnológico de Chilpancingo.','Propuesta propia','aprobado','da7735c236821b2c92c0fe400a3d3d67',15,1,7,5,'2018-02-14 22:15:46','2018-02-20 09:41:56'),(16,'Desarrollo de Prácticas Profesionales en Apoyo al Centro de  Computo del Instituto Tecnológico de Chilpancingo.','Desarrollar actividades profesionales en apoyo al Centro de Cómputo del Instituto Tecnológico de Chilpancingo.','Trabajador','aprobado','1561a64ade8da94e3e8aaa865e8cecb1',16,1,18,5,'2018-02-14 22:17:18','2018-02-20 09:42:18'),(17,'Desarrollo de un Manual de Prácticas para el apoyo de la Asignatura de Estructura de Datos en el Instituto Tecnológico De Chilpancingo','Desarrollar un Manual de Prácticas para el apoyo de la asignatura de Estructura de Datos en el  Instituto Tecnológico De Chilpancingo','Propuesta propia','aprobado','9b74231990cd1cee03089b655c3b64c1',17,1,16,4,'2018-02-14 22:20:00','2018-02-20 09:43:02'),(18,'Administración del Sistema de seguimiento de Residencia Profesional de los departamentos académicos e integración de los Departamentos de División de Estudios Profesionales y Gestión Tecnológica y Vinculación en el sistema del Instituto Tecnológico de Chilpancingo.','Integración a los departamentos (División de estudios profesionales y gestión\ntecnológica y vinculación) al Sistema web de seguimiento de Residencia\nProfesional de los departamentos académicos en el Instituto Tecnológico de\nChilpancingo.','Banco de proyectos','aprobado','620ec8281597530a679958ca2646dc4f',18,1,7,4,'2018-02-14 22:25:56','2018-02-15 18:05:21'),(19,'Desarrollo de Prácticas Profesionales en Apoyo al Centro de Computo del Instituto Tecnológico de Chilpancingo','Desarrollar actividades profesionales en apoyo al Centro de Cómputo del\nInstituto Tecnológico de Chilpancingo','Trabajador','aprobado','e54b1b3e1d4ff9de99e33e4da69835b8',19,1,18,2,'2018-02-14 22:41:10','2018-02-20 09:44:05'),(20,'SISTEMA WEB DE CONTROL ESCOLAR EN LOS PROCESOS DE FICHAS, INSCRIPCIÓN Y REINSCRIPCIÓN PARA LA ESCUELA NORMAL URBANA FEDERAL \"PROFR. RAFAEL RAMÍREZ\"','Desarrollar e implementar un sistema web de control escolar en los procesos de fichas, inscripción y reinscripción utilizando herramientas de diseño y programación para la Escuela Normal Urbana Federal \"Prof. Rafael Ramírez\".','Banco de proyectos','aprobado','1766b9ad2eb403a899b6546fbb298bdc',20,1,15,4,'2018-02-14 22:43:12','2018-02-16 10:47:20'),(21,'Desarrollo de actividades profesionales en apoyo al Departamento de Sistemas y Computación en el Instituto Tecnológico de Chilpancingo.','Desarrollar actividades profesionales en apoyo al Departamento de Sistemas y Computación del Instituto Tecnológico de Chilpancingo.','Trabajador','aprobado','b4e947b1f2bcd536928304c9ea116207',21,1,13,2,'2018-02-14 22:45:19','2018-02-15 18:03:06'),(22,'“SISTEMA WEB DE CONTROL Y MANEJO DE INFORMACIÓN DE PACIENTES CON ENFERMEDADES CRÓNICAS PARA EL SANATORIO AMÉRICA, PARA AUTOMATIZAR EL REGISTRO DE ENFERMEDADES CRÓNICAS Y A SU VEZ FACILITAR EL INTERCAMBIO DE INFORMACIÓN”.','Desarrollar un Sistema web de control y manejo de información de pacientes con\nenfermedades crónicas usando herramientas de diseño, programación y administración\nde datos para automatizar el registro de enfermedades crónicas y a su vez facilitar el\nintercambio de información en el Sanatorio América.','Propuesta propia','aprobado','3332d5e2a18b05a8864f451f2d4be677',22,1,17,5,'2018-02-14 22:48:50','2018-02-21 14:45:11'),(23,'Desarrollo e implementación de un sistema web de gestión de prácticas y contenidos de apoyo para las asignaturas de la carrera de Ingeniería en Sistemas Computacionales del Instituto Tecnológico de Chilpancingo.','Desarrollar e implementar un sistema web para la gestión de prácticas y contenidos de apoyo de las asignaturas de la carrera de Ingeniería en Sistemas Computacionales del Instituto Tecnológico de Chilpancingo.','Propuesta propia','aprobado','2c03eb77ddec7662b9bd20f390b26f5b',23,1,8,4,'2018-02-15 11:49:17','2018-02-20 09:45:20'),(24,'Sistema WEB para la Administración del abastecimiento y almacenamientos de los medicamentos en el “HOSPITAL SUR CORPORATIVO S.A. DE C.V.”.','Desarrollar e implementar un sistema WEB para el Administración del abastecimiento y almacenamientos de los medicamentos en el “HOSPITAL SUR CORPORATIVO S.A. DE C.V.”','Banco de proyectos','aprobado','f9b542693cc03ad9027ddb7702ced48c',24,1,14,5,'2018-02-15 11:53:02','2018-02-20 09:45:35'),(25,'APLICACIÓN PARA DISPOSITIVOS SMARTWATCH PARA LA LOCALIZACIÓN DE ADULTOS MAYORES PARA EL DEPARTAMENTO DE SISTEMAS Y COMPUTACIÓN DEL INSTITUTO TECNOLÓGICO DE CHILPANCINGO','Desarrollar una aplicación para dispositivo smartwatch para la localización de adultos\nmayores','Propuesta propia','aprobado','7329e1162f0224327359251de337f2e5',25,1,16,5,'2018-02-15 11:55:38','2018-02-20 09:45:54'),(26,'Manual de Prácticas basadas en Competencias para la materia de Sistemas Programables.','Desarrollar un manual de prácticas basadas en competencias para la materia de sistemas programables','Propuesta propia','aprobado','ccc92eeee5ce348ae36016160b0ed2f6',26,1,11,4,'2018-02-15 23:19:52','2018-02-20 09:46:17'),(27,'Desarrollar un Manual de Prácticas para el apoyo de la asignatura de programación orientada a objetos en el  Tecnológico De Chilpancingo','Desarrollar un Manual de Prácticas para el apoyo de la asignatura de programación orientada a objetos en el  Tecnológico De Chilpancingo.      ','Propuesta propia','aprobado','e239ba7711f6bae72dd02f2ca07c76c7',27,1,7,4,'2018-02-16 11:03:03','2018-02-20 09:47:21'),(28,'Desarrollo de Prácticas Profesionales en Apoyo al Centro de Computo del Instituto Tecnológico de Chilpancingo.','Desarrollar actividades profesionales en apoyo al Centro de Cómputo del\nInstituto Tecnológico de Chilpancingo.','Trabajador','aprobado','06fa743af6c444452f5ebe5707d897d0',28,1,18,7,'2018-02-19 11:55:46','2018-02-20 09:47:58');
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
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asesor_externos`
--

LOCK TABLES `asesor_externos` WRITE;
/*!40000 ALTER TABLE `asesor_externos` DISABLE KEYS */;
INSERT INTO `asesor_externos` VALUES (1,'LIC. JUAN GALINDO GARRIDO','Gerente',2,2,'2018-02-11 15:08:12','2018-02-11 15:08:12'),(2,'LIC. NORMA ANGÉLICA MARINO GARCÍA','psicóloga',3,3,'2018-02-11 15:17:42','2018-02-11 15:17:42'),(3,'LIC. José Ricardo Manzanares Barrera','Secretario Paricular',4,4,'2018-02-11 15:24:20','2018-02-11 15:24:20'),(5,'M.C. Fernando Arcos Valle','Jefe del Departamento de Control de Gestión',7,6,'2018-02-11 16:01:21','2018-02-11 16:01:21'),(6,'LIC. Deyanira Rios Huerta','Jefa del Departamento de Enfermeria',8,7,'2018-02-11 16:13:30','2018-02-11 16:13:30'),(7,'ING. José Daniel Sánchez Rodríguez','Docente',10,5,'2018-02-11 16:36:05','2018-02-11 16:36:05'),(8,'M.C. YANET EVANGELISTA ALCOCER','Docente',11,5,'2018-02-11 16:39:12','2018-02-11 16:39:12'),(9,'ING.  Israel Edgar Nieto Granados','Docente',15,5,'2018-02-11 17:00:06','2018-02-11 17:00:06'),(10,'LIC. Debora Cecilia Medina Bergman','Directora del Plantel',16,11,'2018-02-11 17:43:36','2018-02-11 17:43:36'),(11,'LIC. Tomas Ríos Velazquez','Docente',17,5,'2018-02-12 16:28:49','2018-02-12 16:28:49'),(12,'M.A. Patricia Romero Neri',' Directora de Servicios Medicos del DIF',20,12,'2018-02-14 14:13:52','2018-02-14 14:13:52'),(13,'MTRO. Moisés Vázquez Peña','Jefe de departamento de sistemas y computación',46,5,'2018-02-15 11:45:19','2018-02-15 11:45:19'),(14,'LIC. Cristian Ranjel Pavón Gallardo','Administrador',52,8,'2018-02-16 10:13:54','2018-02-16 10:13:54'),(15,'LIC. Alfredo Bartolo López','Subdirector Academico',53,1,'2018-02-16 10:30:56','2018-02-16 10:30:56'),(16,'DR. Wilfrido Campos Francisco','Docente',54,5,'2018-02-16 10:32:00','2018-02-16 10:32:00'),(17,'DR. Gustavo Alarcón Herrera','Director',55,9,'2018-02-16 10:44:00','2018-02-16 10:44:00'),(18,'M.C. Oscar Gabriel Flores López','Docente',57,5,'2018-02-16 11:43:42','2018-02-16 11:43:42'),(19,'ING.  TOLEDO RODRIGUEZ CORONA ','Jefe de Departamento de División de Estudios Profesionales',58,5,'2018-02-19 10:43:15','2018-02-19 10:43:15'),(20,'LIC. Mirian Muñoz Barrientos.','Directora general de atención social',60,10,'2018-02-20 08:52:29','2018-02-20 08:52:29');
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carreras`
--

LOCK TABLES `carreras` WRITE;
/*!40000 ALTER TABLE `carreras` DISABLE KEYS */;
INSERT INTO `carreras` VALUES (1,'Ingenieria en Sistemas Computacionales','2018-02-11 17:45:47','2018-02-11 17:45:47',1);
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
INSERT INTO `criterios` VALUES (1,'Asiste puntualmente con el horario establecido',5,'asesor_externo','XXIX','2018-02-11 14:55:18','2018-02-11 14:55:18'),(2,'Trabajo en equipo y se comunica de forma efectiva (oral y escrita)',10,'asesor_externo','XXIX','2018-02-11 14:55:18','2018-02-11 14:55:18'),(3,'Tiene iniciativa para colaborar',5,'asesor_externo','XXIX','2018-02-11 14:55:18','2018-02-11 14:55:18'),(4,'Propone mejoras al proyecto',10,'asesor_externo','XXIX','2018-02-11 14:55:18','2018-02-11 14:55:18'),(5,'Cumple con los objetivos correspondientes al proyecto',15,'asesor_externo','XXIX','2018-02-11 14:55:18','2018-02-11 14:55:18'),(6,'Es ordenado y cumple satisfactoriamente con las actividades encomendadas en los tiempos establecidos del cronograma',15,'asesor_externo','XXIX','2018-02-11 14:55:18','2018-02-11 14:55:18'),(7,'Demuestra liderezgo en su actuar',10,'asesor_externo','XXIX','2018-02-11 14:55:18','2018-02-11 14:55:18'),(8,'Demuestra conocimiento en el área de su especialidad',20,'asesor_externo','XXIX','2018-02-11 14:55:18','2018-02-11 14:55:18'),(9,'Demuestra su comportamiento ético (es diciplinado, acata órdenes, respeta a sus compañeros de trabajo, entre otros)',10,'asesor_externo','XXIX','2018-02-11 14:55:18','2018-02-11 14:55:18'),(10,'Asistió puntualmente a las reuniones de asesoría ',10,'asesor_interno','XXIX','2018-02-11 14:55:18','2018-02-11 14:55:18'),(11,'Demuestra conocimiento en el área de su especialidad',20,'asesor_interno','XXIX','2018-02-11 14:55:18','2018-02-11 14:55:18'),(12,'Trabaja en equipo y se comunica de forma efectiva (oral y escrita)',15,'asesor_interno','XXIX','2018-02-11 14:55:18','2018-02-11 14:55:18'),(13,'Es dedicado y proactivo en las actividades encomendadas',20,'asesor_interno','XXIX','2018-02-11 14:55:18','2018-02-11 14:55:18'),(14,'Es ordenado y cumple satisfactoriamente con las actividades encomendadas en los tiempos establecidos en el cronograma',20,'asesor_interno','XXIX','2018-02-11 14:55:18','2018-02-11 14:55:18'),(15,'Propone mejoras al proyecto',15,'asesor_interno','XXIX','2018-02-11 14:55:18','2018-02-11 14:55:18'),(16,'Portada',2,'asesor_externo','XXX','2018-02-11 14:55:18','2018-02-11 14:55:18'),(17,'Agradecimientos',2,'asesor_externo','XXX','2018-02-11 14:55:18','2018-02-11 14:55:18'),(18,'Resumen',2,'asesor_externo','XXX','2018-02-11 14:55:18','2018-02-11 14:55:18'),(19,'Indice',2,'asesor_externo','XXX','2018-02-11 14:55:18','2018-02-11 14:55:18'),(20,'Introducción',2,'asesor_externo','XXX','2018-02-11 14:55:18','2018-02-11 14:55:18'),(21,'Problemas al resolver, priorizándolos',5,'asesor_externo','XXX','2018-02-11 14:55:18','2018-02-11 14:55:18'),(22,'Objetivos',5,'asesor_externo','XXX','2018-02-11 14:55:18','2018-02-11 14:55:18'),(23,'Justificación',0,'asesor_externo','XXX','2018-02-11 14:55:18','2018-02-11 14:55:18'),(24,'Marco teórico (fundamentos teóricos)',10,'asesor_externo','XXX','2018-02-11 14:55:18','2018-02-11 14:55:18'),(25,'Procedimiento y descripción de las actividades realizadas',5,'asesor_externo','XXX','2018-02-11 14:55:18','2018-02-11 14:55:18'),(26,'Resultados, planos, gráficas, prototipos, manuales, programas, análisis estadísticos, modelos matemáticos, simulaciones, normativas, regulaciones, y restricciones, entre otros. Solo para proyectos que por su naturaleza lo requieran: estudio de mercado, estudio técnico y estudio economico.**',45,'asesor_externo','XXX','2018-02-11 14:55:18','2018-02-11 14:55:18'),(27,'Conclusiones, recomendaciones y experiencia profesional adquirida',15,'asesor_externo','XXX','2018-02-11 14:55:18','2018-02-11 14:55:18'),(28,'Competencias desarrolladas y/o aplicadas',3,'asesor_externo','XXX','2018-02-11 14:55:18','2018-02-11 14:55:18'),(29,'Fuentes de información',2,'asesor_externo','XXX','2018-02-11 14:55:18','2018-02-11 14:55:18'),(30,'Portada',2,'asesor_interno','XXX','2018-02-11 14:55:18','2018-02-11 14:55:18'),(31,'Agradecimientos',2,'asesor_interno','XXX','2018-02-11 14:55:18','2018-02-11 14:55:18'),(32,'Resumen',2,'asesor_interno','XXX','2018-02-11 14:55:18','2018-02-11 14:55:18'),(33,'Indice',2,'asesor_interno','XXX','2018-02-11 14:55:18','2018-02-11 14:55:18'),(34,'Introducción',2,'asesor_interno','XXX','2018-02-11 14:55:18','2018-02-11 14:55:18'),(35,'Problemas al resolver, priorizándolos',5,'asesor_interno','XXX','2018-02-11 14:55:18','2018-02-11 14:55:18'),(36,'Objetivos',5,'asesor_interno','XXX','2018-02-11 14:55:18','2018-02-11 14:55:18'),(37,'Justificación',0,'asesor_interno','XXX','2018-02-11 14:55:18','2018-02-11 14:55:18'),(38,'Marco teórico (fundamentos teóricos)',10,'asesor_interno','XXX','2018-02-11 14:55:18','2018-02-11 14:55:18'),(39,'Procedimiento y descripción de las actividades realizadas',5,'asesor_interno','XXX','2018-02-11 14:55:18','2018-02-11 14:55:18'),(40,'Resultados, planos, gráficas, prototipos, manuales, programas, análisis estadísticos, modelos matemáticos, simulaciones, normativas, regulaciones, y restricciones, entre otros. Solo para proyectos que por su naturaleza lo requieran: estudio de mercado, estudio técnico y estudio economico.**',45,'asesor_interno','XXX','2018-02-11 14:55:18','2018-02-11 14:55:18'),(41,'Conclusiones, recomendaciones y experiencia profesional adquirida',15,'asesor_interno','XXX','2018-02-11 14:55:18','2018-02-11 14:55:18'),(42,'Competencias desarrolladas y/o aplicadas',3,'asesor_interno','XXX','2018-02-11 14:55:18','2018-02-11 14:55:18'),(43,'Fuentes de información',2,'asesor_interno','XXX','2018-02-11 14:55:18','2018-02-11 14:55:18'),(44,'Asiste puntualmente con el horario establecido',5,'asesor_externo','III','2018-02-11 14:55:18','2018-02-11 14:55:18'),(45,'Trabajo en equipo',10,'asesor_externo','III','2018-02-11 14:55:18','2018-02-11 14:55:18'),(46,'Tiene iniciativa para ayudar en las actividades encomendadas',10,'asesor_externo','III','2018-02-11 14:55:18','2018-02-11 14:55:18'),(47,'Organiza su tiempo y trabaja sin necesidad de una superación estrecha',5,'asesor_externo','III','2018-02-11 14:55:18','2018-02-11 14:55:18'),(48,'Realiza mejoras al proyecto',10,'asesor_externo','III','2018-02-11 14:55:18','2018-02-11 14:55:18'),(49,'Cumple con los objetivos correspondientes al proyecto',10,'asesor_externo','III','2018-02-11 14:55:18','2018-02-11 14:55:18'),(50,'Mostró responsabilidad y compromiso en la residencia profesional',5,'asesor_interno','III','2018-02-11 14:55:18','2018-02-11 14:55:18'),(51,'Realizó un trabajo innovador en su área de desempeño',10,'asesor_interno','III','2018-02-11 14:55:18','2018-02-11 14:55:18'),(52,'Aplica las competencias para la realización del proyecto',10,'asesor_interno','III','2018-02-11 14:55:18','2018-02-11 14:55:18'),(53,'Es dedicado y proactivo en los trabajos encomendados',10,'asesor_interno','III','2018-02-11 14:55:18','2018-02-11 14:55:18'),(54,'Cumple con los objetivos correspondiente al proyecto',10,'asesor_interno','III','2018-02-11 14:55:18','2018-02-11 14:55:18'),(55,'Entrega en tiempo y forma el informe técnico',5,'asesor_interno','III','2018-02-11 14:55:18','2018-02-11 14:55:18');
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departamentos`
--

LOCK TABLES `departamentos` WRITE;
/*!40000 ALTER TABLE `departamentos` DISABLE KEYS */;
INSERT INTO `departamentos` VALUES (1,'Sistemas  y Computación','2018-02-11 15:36:51','2018-02-14 13:42:52'),(2,'Division de estudios profesionales','2018-02-15 18:24:23','2018-02-15 18:28:29');
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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `docente_carreras`
--

LOCK TABLES `docente_carreras` WRITE;
/*!40000 ALTER TABLE `docente_carreras` DISABLE KEYS */;
INSERT INTO `docente_carreras` VALUES (1,2,1,'docente','2018-02-14 14:18:50','2018-02-20 08:47:40'),(2,3,1,'deshabilitado','2018-02-14 14:18:50','2018-02-19 11:28:06'),(3,4,1,'presidente_academia','2018-02-14 14:18:50','2018-02-20 08:47:57'),(4,5,1,'jefe_proyecto','2018-02-14 14:18:50','2018-02-20 08:47:57'),(5,6,1,'docente','2018-02-14 14:18:50','2018-02-20 08:47:40'),(8,7,1,'docente','2018-02-20 08:47:40','2018-02-20 08:47:40');
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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `docentes`
--

LOCK TABLES `docentes` WRITE;
/*!40000 ALTER TABLE `docentes` DISABLE KEYS */;
INSERT INTO `docentes` VALUES (2,'Wilfrido','Campos','Francisco','DR.',12,1,'2018-02-11 16:42:03','2018-02-11 16:42:03'),(3,'Moisés','Vázquez','Peña','MTRO.',14,1,'2018-02-11 16:44:31','2018-02-11 16:44:31'),(4,'Mauricio','Cordova','Portillo','ING.',18,1,'2018-02-14 13:44:57','2018-02-14 13:44:57'),(5,'José Daniel','Sanchéz','Rodríguez','ING.',19,1,'2018-02-14 13:47:04','2018-02-14 13:47:04'),(6,'Oscar Grabiel','Flores','Lopez','M.C.',21,1,'2018-02-14 14:18:13','2018-02-14 14:18:13'),(7,'Tomas','Rios','Velazquez','LIC.',22,1,'2018-02-14 14:21:38','2018-02-14 14:21:38'),(8,'Toledo','Rodriguez','Corona','M.C.',50,2,'2018-02-15 18:26:32','2018-02-15 18:26:32');
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
  `domicilio` varchar(100) DEFAULT NULL,
  `colonia` varchar(100) DEFAULT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empresas`
--

LOCK TABLES `empresas` WRITE;
/*!40000 ALTER TABLE `empresas` DISABLE KEYS */;
INSERT INTO `empresas` VALUES (1,'Escuela Normal Urbana Federal \"Prof. Rafael Ramírez\"','público','SEG910814HCA',' Centro Escolar Vicente Guerrero','Jardines del Sur','Formar profesores de calidad, para contribuir al mejoramiento de la práctica docente, competencias y desarrollo de las habilidades intelectuales básicas, que permitan responder a las características, intereses y necesidades de los educandos, ampliando los conocimientos y la tecnología, para actuar con iniciativa, eficacia e innovación en las diversas situaciones del entorno social.\n','39070','',1,2,'2018-02-11 15:01:38','2018-02-11 15:01:38'),(2,'Servicios Turísticos Terrestres (Servibus)','servicios','GAGJ7506234Z7','Constituyentes No. 34','Benito Juarez','Brindar un servicio de transporte de excelencia, calidad y seguridad, basado en la satisfacción de las exigencias de los clientes. Otorgar las mejores tarifas en forma rápida y competitiva, en forma eficiente, segura y con tecnología de punta.','39010','4916756',3,4,'2018-02-11 15:06:20','2018-02-11 15:06:20'),(3,'Unidad de Especialidad Médica - Centro de Atención Primaria en Adicciones (UNEME-CAPA)','público','SES870401TX8','Calle Venustiano Carranza No. 18','20 de noviembre','Misión de la empresa: Prevenir, atender e investigar lo asociado al fenómeno adictivo en el estado, sus regiones y municipios; ofreciendo servicios con responsabilidad, calidad y calidez de forma integral a la sociedad.','39096','4949883',5,6,'2018-02-11 15:16:07','2018-02-11 15:16:07'),(4,'Secretaría de Turismo','público','MCB850101L21','Plaza Cívica Primer Congreso de Anahuac S/N','Centro','Dirigir acciones consensadas que estimulen la participación de la sociedad en los tres niveles de\ngobierno y el sector privado, para el desarrollo sustentable del sector turístico, promover la\ninnovación en el sector, mejorar la calidad de los servicios turísticos y la competitividad,\nimpulsando estrategias que articulen las acciones gubernamentales, del sector privado y social,\ncontribuyendo al crecimiento sustentable e incluyente del turismo, impulsar, fortalecer y promover\nlas actividades productivas del municipio, mediante el fomento de cultura.','39000','4722280',7,8,'2018-02-11 15:23:13','2018-02-11 15:23:13'),(5,'Instituto Tecnológico de Chilpancingo','servicios','TNM140723GFA','AV. José Francisco Ruiz Massieu N.5','Villa Moderna','“Preservar, innovar, trascender y aplicar el conocimiento científico-tecnológico en la formación de profesionista, con la responsabilidad social y capacidad de investigar, que desarrollen y apliquen propuestas de solución a la problemática de la sociedad” ','39090','47 2 10 14',9,10,'2018-02-11 15:30:03','2018-02-11 15:30:03'),(6,'Coordinación Estatal de Servicio Profesional Docente (CESPD)','público','SEG910814HCA','Calle Eduardo Neri No. 4','Loma Bonita','Garantizar que los profesores evaluados en el Estado de México cumplan con los requisitos marcados en los procesos de ingreso, promoción, permanencia y reconocimiento para contribuir a la mejora de la Educación Básica y Media Superior en todas sus vertientes para todos los alumnos de la entidad, mediante la aplicación de las evaluaciones en forma imparcial, objetiva y transparente.','39090','47 1 83 00',11,12,'2018-02-11 16:00:42','2018-02-11 16:00:42'),(7,'Hospital de la Madre y Niño Guerrerense','público',':HMN050304311','Boulevar Rene Juarez Cisnero Esq. Huamuchil #62','Ciudad de los Servicios','“Somos una institución de salud que tiene como prioridad la embarazada de alto riesgo y recién nacido grave que ameriten tratamiento especializado de calidad, para contribuir en la reducción de la muerte materna y perinatal a través de personal calificado e infraestructura adecuada para brindar seguridad a los pacientes.”','39074','49 49 36 2',13,14,'2018-02-11 16:10:57','2018-02-11 16:10:57'),(8,'HOSPITAL SUR CORPORATIVO S.A. DE C.V.','privado','HSC040609NY8','Lote 8 manzana3, conjunto comercial chilpancingo','Universal','Proporcionar servicio de calidad a los usuarios utilizando tecnología de última generación y personal altamente capacitado','39080',' 49-1-35-31',15,16,'2018-02-11 16:20:37','2018-02-11 16:20:37'),(9,'Sanatorio América','privado','HEME320218T55','Calle Ignacio Manuel Altamirano #54.','Centro','En Sanatorio América se busca tener clientes contentos que sigan utilizando nuestros servicios en el futuro. Trabajamos con el máximo esfuerzo para dar lo mejor en Medicina General.','39000','(747) 4722976',17,18,'2018-02-11 16:23:14','2018-02-11 16:23:14'),(10,'SECRETARIA DE LA JUVENTUD Y LA NIÑEZ DEL ESTADO DE GUERRERO (SEJUVE)','público','SFA830301521','PALACIO DE GOBIERNO. BOULEVARD RENÉ JUÁREZ CISNEROS #62,','CIUDAD DE LOS SERVICIOS','COORDINAR, DISEÑAR, EJECUTAR Y EVALUAR LAS POLITICAS PUBLICAS PARA IMPULSAR,\nPROMOVER Y FACILITAR EL DESARROLLO INTEGRAL DE LAS CAPACIDADES DE LAS Y LOS JOVENES GUERRERENSES, A TRAVES DE LA ORIENTACION, PREVENCION, CAPACITACION, ASESORIA Y FACILITACION DE HERRAMIENTAS QUE PERMITAN EL FORTALECIMIENTO DE SU CALIDAD DE VIDA Y SU PARTICIPACION COMO SUJETOS ACTIVOS EN LA TOMA DE DECISIONES EN LO ECONOMICO,\nPOLITICO Y SOCIAL DE NUESTRA ENTIDAD.','39090','4719945',19,20,'2018-02-11 17:15:58','2018-02-11 17:25:46'),(11,'CETEC S.C.','servicios','CJU990112T96','Avenida Júarez n. 6','Centro','En CETEC estamos comprometidos a contribuir al progreso de México, formando profesionales plenamente calificados en el área de la computación, inglés y preparatoria, garantizándoles la capacitación  más avanzada y sembrando en ellos valores de excelencia y calidad humana; mediante la participación y mejora continua de nuestro personal y de una permanente actualización tecnológica.\n\nFortaleciendo la solidez económica y social de todos los que conducimos la empresa hacia su crecimiento constante. Y a su absoluto liderazgo en el mercado.','39000','',21,22,'2018-02-11 17:41:43','2018-02-11 17:42:51'),(12,'Centro de Rehabilitacion Integral de Guerrero','público','SDI770309LP1','Av. Bulevar Lic. Rene Juárez Cisneros S/N','Ciudad de los servicios','Atender necesidades de servicio de rehabilitación de la población con discapacidad físicas y sensorial, atender a grupos de población en riesgo de presentar deficiencias y discapacidad mediante actividades de detección temporal.','39095','747 471 0744',23,24,'2018-02-14 14:06:03','2018-02-14 14:06:03');
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `periodos`
--

LOCK TABLES `periodos` WRITE;
/*!40000 ALTER TABLE `periodos` DISABLE KEYS */;
INSERT INTO `periodos` VALUES (1,'FEBRERO-JUNIO','2018','2018-02-14','2018-06-13','2018-02-14','2018-02-23',NULL,1,'2018-02-14 14:24:08','2018-02-20 09:15:45');
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
) ENGINE=InnoDB AUTO_INCREMENT=88 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `revision_anteproyectos`
--

LOCK TABLES `revision_anteproyectos` WRITE;
/*!40000 ALTER TABLE `revision_anteproyectos` DISABLE KEYS */;
INSERT INTO `revision_anteproyectos` VALUES (1,'factible',NULL,3,18,'2018-02-15 18:03:48','2018-02-15 18:03:48'),(2,'factible',NULL,3,21,'2018-02-15 18:03:51','2018-02-15 18:03:51'),(3,'factible',NULL,7,18,'2018-02-20 09:10:13','2018-02-20 09:34:50'),(4,'factible',NULL,7,21,'2018-02-20 09:10:14','2018-02-20 09:34:46'),(5,'factible',NULL,7,1,'2018-02-20 09:10:16','2018-02-20 09:34:26'),(6,'factible',NULL,7,2,'2018-02-20 09:10:16','2018-02-20 09:34:27'),(7,'factible',NULL,7,3,'2018-02-20 09:10:17','2018-02-20 09:34:28'),(8,'factible',NULL,7,4,'2018-02-20 09:10:19','2018-02-20 09:34:28'),(9,'factible',NULL,7,5,'2018-02-20 09:10:20','2018-02-20 09:34:29'),(10,'factible',NULL,7,6,'2018-02-20 09:10:21','2018-02-20 09:34:30'),(11,'factible',NULL,7,7,'2018-02-20 09:10:29','2018-02-20 09:34:31'),(12,'factible',NULL,7,8,'2018-02-20 09:10:30','2018-02-20 09:34:32'),(13,'factible',NULL,7,9,'2018-02-20 09:10:32','2018-02-20 09:34:41'),(14,'factible',NULL,7,10,'2018-02-20 09:10:33','2018-02-20 09:34:40'),(15,'factible',NULL,7,11,'2018-02-20 09:10:34','2018-02-20 09:34:39'),(16,'factible',NULL,7,12,'2018-02-20 09:10:35','2018-02-20 09:34:38'),(17,'factible',NULL,7,13,'2018-02-20 09:10:36','2018-02-20 09:34:37'),(18,'factible',NULL,7,14,'2018-02-20 09:10:37','2018-02-20 09:34:36'),(19,'factible',NULL,7,24,'2018-02-20 09:10:40','2018-02-20 09:34:44'),(20,'factible',NULL,7,23,'2018-02-20 09:10:41','2018-02-20 09:34:45'),(21,'factible',NULL,7,22,'2018-02-20 09:10:41','2018-02-20 09:34:45'),(22,'factible',NULL,7,20,'2018-02-20 09:10:42','2018-02-20 09:34:47'),(23,'factible',NULL,7,19,'2018-02-20 09:10:45','2018-02-20 09:34:48'),(24,'factible',NULL,7,17,'2018-02-20 09:10:46','2018-02-20 09:34:51'),(25,'factible',NULL,7,16,'2018-02-20 09:10:47','2018-02-20 09:34:34'),(26,'factible',NULL,7,15,'2018-02-20 09:10:47','2018-02-20 09:34:35'),(27,'factible',NULL,7,28,'2018-02-20 09:10:51','2018-02-20 09:34:55'),(28,'factible',NULL,7,27,'2018-02-20 09:10:52','2018-02-20 09:34:56'),(29,'factible',NULL,7,26,'2018-02-20 09:10:53','2018-02-20 09:34:56'),(30,'factible',NULL,7,25,'2018-02-20 09:10:54','2018-02-20 09:34:57'),(87,'factible',NULL,5,18,'2018-02-20 09:36:36','2018-02-20 09:36:36');
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seguimientos`
--

LOCK TABLES `seguimientos` WRITE;
/*!40000 ALTER TABLE `seguimientos` DISABLE KEYS */;
INSERT INTO `seguimientos` VALUES (1,1,'2018-02-14','2018-03-06','2018-02-14 22:57:42','2018-02-14 22:57:42'),(2,1,'2018-03-07','2018-04-30','2018-02-14 22:58:00','2018-02-14 22:58:00'),(3,1,'2018-04-30','2018-05-31','2018-02-14 22:58:18','2018-02-14 22:58:18');
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
INSERT INTO `tipo_seguros` VALUES (1,'IMMS','2018-02-11 14:55:17','2018-02-11 14:55:17'),(2,'ISSTE','2018-02-11 14:55:17','2018-02-11 14:55:17'),(3,'METLIFE','2018-02-11 14:55:17','2018-02-11 14:55:17'),(4,'GNP','2018-02-11 14:55:17','2018-02-11 14:55:17'),(5,'QUÁLITAS','2018-02-11 14:55:17','2018-02-11 14:55:17'),(6,'INBURSA','2018-02-11 14:55:17','2018-02-11 14:55:17'),(7,'OTRO','2018-02-11 14:55:17','2018-02-11 14:55:17');
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
  `nombre` varchar(100) NOT NULL,
  `puesto` varchar(100) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `titulares`
--

LOCK TABLES `titulares` WRITE;
/*!40000 ALTER TABLE `titulares` DISABLE KEYS */;
INSERT INTO `titulares` VALUES (1,'MTRO.','Armando González Ramírez','Director de la Escuela','2018-02-11 15:01:38','2018-02-11 15:01:38'),(2,'MTRO.','Armando González Ramírez','Director de la Escuela','2018-02-11 15:01:38','2018-02-11 15:01:38'),(3,'LIC.','Juan Galindo Garrido','Gerente','2018-02-11 15:06:20','2018-02-11 15:06:20'),(4,'LIC.','Juan Galindo Garrido','Gerente','2018-02-11 15:06:20','2018-02-11 15:06:20'),(5,'LIC.','Jesus Eduardo Tejada Herrera','Coordinador','2018-02-11 15:16:07','2018-02-11 15:16:07'),(6,'LIC.','Jesus Eduardo Tejada Herrera','Coordinador','2018-02-11 15:16:07','2018-02-11 15:16:07'),(7,'LIC.','Iván Villanueva Rodríguez','Secretario de la dependencia','2018-02-11 15:23:13','2018-02-11 15:23:13'),(8,'LIC.','Iván Villanueva Rodríguez','Secretario de la dependencia','2018-02-11 15:23:13','2018-02-11 15:23:13'),(9,'M.A.','María Eugenia Reynoso Dueñas','Directora','2018-02-11 15:30:03','2018-02-11 15:30:03'),(10,'M.A.','María Eugenia Reynoso Dueñas','Directora','2018-02-11 15:30:03','2018-02-11 15:30:03'),(11,'DRA.',' Margarita Nava Muñoz','Coordinadora Estatal del Servicio Profesional Docente','2018-02-11 16:00:42','2018-02-11 16:00:42'),(12,'M.C.','Fernando Arcos Valle','Jefe del Departamento de Control de Gestión','2018-02-11 16:00:42','2018-02-11 16:00:42'),(13,'DR.','Adiel Molina Bello','Director General del Hospital','2018-02-11 16:10:57','2018-02-11 16:10:57'),(14,'LIC.','Deyanira Rios Huerta','Jefa del Departamento de Enfermeria','2018-02-11 16:10:57','2018-02-11 16:10:57'),(15,'DR.','Fernando Cabrera Zamudio ','Director','2018-02-11 16:20:37','2018-02-11 16:20:37'),(16,'LIC.','Cristian Rangel Pavón','Administrador','2018-02-11 16:20:37','2018-02-11 16:20:37'),(17,'DR.','Gustavo Alarcón Herrera','Director del Sanatorio América.','2018-02-11 16:23:14','2018-02-11 16:23:14'),(18,'DR.','Gustavo Alarcón Herrera','Director del Sanatorio América','2018-02-11 16:23:14','2018-02-11 16:23:14'),(19,'M.C.','HUMBERTO ISRAEL DÍAZ VILLANUEVA','SECRETARIO DE LA JUVENTUD Y LA NIÑEZ DEL ESTADO DE GUERRERO.','2018-02-11 17:15:58','2018-02-11 17:25:46'),(20,'ING.','MIRIAN MUÑOZ BARRIENTOS','DIRECTORA GENERAL DE ATENCIÓN SOCIAL.','2018-02-11 17:15:58','2018-02-11 17:25:46'),(21,'LIC.','Debora Cecilia Medina Bergman','Directora del Plantel','2018-02-11 17:41:43','2018-02-11 17:42:51'),(22,'LIC.','Debora Cecilia Medina Bergman','Directora del Plantel','2018-02-11 17:41:43','2018-02-11 17:42:51'),(23,'LIC.','Jose Francisco Solis Solis','Director General del Centro de Rehabilitacion Integral de Guerrero','2018-02-14 14:06:03','2018-02-14 14:06:03'),(24,'M.A.','Patricia Romero Neri','Directora de Servicios Medicos del DIF','2018-02-14 14:06:03','2018-02-14 14:06:03');
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
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'seguimientoresidenciasitch@gmail.com','$2a$08$AGoLT1dU3KnWvrdua6GyR.48OuikbOi1VpTA9JzeSQvoktg39XJVm','admin','2018-02-11 14:55:17','2018-02-11 14:55:17'),(2,'servibus2010@hotmail.com','$2a$08$5zmTJWkjyunHA2InJrJvOOuiENC5BLW92xmLGet9bbd5MnbaWw8y2','asesor_externo','2018-02-11 15:08:12','2018-02-11 15:08:12'),(3,'psicomarino@hotmail.com','$2a$08$ELhZXt6.4LZoccnA7CgjoOei8oHYgbiBeEUwR/7fBr.DGPtD0pn..','asesor_externo','2018-02-11 15:17:42','2018-02-11 15:17:42'),(4,'r.manzanarez22@gmail.com','$2a$08$zMx./YrjrTjSRFdVDOrII.p56Py8ER92RXQS0TSNJHN4xJabw4ace','asesor_externo','2018-02-11 15:24:20','2018-02-11 15:24:20'),(7,'fherpli@hotmail.com','$2a$08$mtU6UE.WtmItQ.r8BHJp7Oj3PFyRZWy0sqik8apSSosAnqdGYXlre','asesor_externo','2018-02-11 16:01:21','2018-02-11 16:01:21'),(8,'deyarioshta@hotmail.com','$2a$08$d/tTG1xmOTC8fPBGj7Tz9uPK9duxYRQohSk0Rmh0w0t19j.opDrrq','asesor_externo','2018-02-11 16:13:30','2018-02-11 16:13:30'),(10,'jdsanchezr53@gmail.com','$2a$08$DwgsLdfaMKLOhhzWou1wX.zuRtWprpt.GOPj7Fnvr8hEnhQGWZgjG','asesor_externo','2018-02-11 16:36:05','2018-02-11 16:36:05'),(11,'vangely83@gmail.com','$2a$08$ubOay.AOS2hqCyOZMysx3ew/1ANjWXgfVLQ3PTEvmNuuxu5idFjvu','asesor_externo','2018-02-11 16:39:12','2018-02-11 16:39:12'),(12,'w.campos.f@itchilpancingo.edu.mx','$2a$08$2sExwBhqQCvJGuHRu4C4We7Ott0o6mpNEIFBho711ni32ruGDaJpe','docente','2018-02-11 16:42:03','2018-02-14 13:40:56'),(14,'m.vazquez.p@itchilpancingo.edu.mx','$2a$08$LcpcxPamzNlIyxqJ/pkTAOJ.atuxvEYZ6SbUZEJ2SxmEB7ycBqD8a','jefe_departamento','2018-02-11 16:44:31','2018-02-14 13:42:52'),(15,'mantenimientoyequipo@itchilpancingo.edu.mx','$2a$08$5JzoNW47xTIw.zbGKCAuJ.eayrU8lqw.F.RpR5GdZP/FkDZiNwwZm','asesor_externo','2018-02-11 17:00:06','2018-02-11 17:00:06'),(16,'cetec.juarez@corporativocetec.com.mx','$2a$08$0ZiAJi1jf7BnY5iAah1Zfuct9VkpeOXL9bNpWqgI9GXDZXs8tHEDy','asesor_externo','2018-02-11 17:43:36','2018-02-11 17:43:36'),(17,'triovela.ff1@gmail.com','$2a$08$vlio0fre/52XyA7ccOJm7uOJC1CYGDYCI5rFoDIVmBz25ChsogPQO','asesor_externo','2018-02-12 16:28:49','2018-02-12 16:28:49'),(18,'m.cordova.p@itchilpancingo.edu.mx','$2a$08$afoph80zhNi0bXbe39VPF.OevxKebHU40HytrQzO7noGp5kUq920i','docente','2018-02-14 13:44:57','2018-02-14 13:44:57'),(19,'j.sanchez.r@itchilpancingo.edu.mx','$2a$08$HsM2/SAtHjemYoUVH/bI8uiJJ5rKhvbYd3un6v6POi2tg.BEOX1xe','docente','2018-02-14 13:47:04','2018-02-14 13:47:04'),(20,'direccionserviciomedico@hotmail.com','$2a$08$.7nTYKO20x2TZAgTgn81PueWoOl984pL3Vs6j8ZChhZzo7zHc532K','asesor_externo','2018-02-14 14:13:51','2018-02-14 14:13:51'),(21,'centrodecomputo@itchilpancingo.edu.mx','$2a$08$JXcLbcM5qQ5ZQRmNxNC88eIBwQmbU7SoLAwOr5UtRnE3UK.CizYCC','docente','2018-02-14 14:18:13','2018-02-14 14:18:13'),(22,'t.rios.v@itchilpancingo.edu.mx','$2a$08$MhPgQPvynmFoDB7gEqCnVO5YRcKu8rN8BJYaWw3uzhduYCnKtsLy.','docente','2018-02-14 14:21:38','2018-02-14 14:21:38'),(24,'josesitoak47full@gmail.com','$2a$08$H/xdCAUjtyQ/ZNZSbmXPhuQCWkvR/niSAfI4bhVbafE5S5dHBxFu6','candidato_residente','2018-02-14 14:39:43','2018-02-14 14:39:43'),(25,'rycerzach@gmail.com','$2a$08$ERWEj3KuCM8H4hJe7aMbqO4JjFeRYo/0mV2bzLJgprt6qWyU3BEsW','candidato_residente','2018-02-14 14:52:54','2018-02-14 14:52:54'),(26,'ibkcore@gmail.com','$2a$08$5yjoYuuRVMvQB1Et945JMOU6uyzI4FHqe3OpRHjMuNNL7HUMOSwAK','candidato_residente','2018-02-14 15:27:00','2018-02-16 10:29:43'),(27,'fernandokinto@hotmail.com','$2a$08$M4tF9xEwiSzNXZ.mTO.ao.uo470YZ3q2hZ5jqw9d7d2eZKRTpPgoy','candidato_residente','2018-02-14 15:36:54','2018-02-16 09:57:32'),(28,'neu.samd.3@gmail.com','$2a$08$ZEWFZulYMaUMOVAGTEX7aeBprLdInsNfR8JpePI4CpZjBItfAAsqG','candidato_residente','2018-02-14 15:40:13','2018-02-16 09:59:40'),(29,'varptini@gmail.com','$2a$08$gIB7w9ADqKzbpeX9RMv7Guz5a.wqK2k2tnH4jybgUYCqH/3077urW','candidato_residente','2018-02-14 15:51:14','2018-02-14 15:51:14'),(30,'rentechan92@gmail.com','$2a$08$zGJfKqQmhO23mVtXJEkFHOqwRIuFmWFo9wkKvLQdm27prguBSdlEW','candidato_residente','2018-02-14 15:54:44','2018-02-14 15:54:44'),(31,'osvaldodaniel0895@gmail.com','$2a$08$iQ.FtdUSK0vOyE..yoSHieJ.QaERffpXyWbUaW7RTIVv.EfkbweVe','candidato_residente','2018-02-14 15:58:58','2018-02-14 15:58:58'),(32,'susydlc255@gmail.com','$2a$08$ndIDH9oGdmlq/whfzfq3GOq0LHVyTiNaMWuWQK7mrqd7p07urFCTO','candidato_residente','2018-02-14 16:32:09','2018-02-14 16:32:09'),(33,'anibalclavel@hotmail.com','$2a$08$81PQHawilAQTRWprHjU4peUoPqzv5y77O5Nz5Vwt3OCvlgm6/QwUy','candidato_residente','2018-02-14 16:42:28','2018-02-14 16:42:28'),(34,'alberto.gon05@gmail.com','$2a$08$jh/wfjOyv/h7EGPy3hTsQumMJZZW7TFhHTz8Vh73rZmGgLKMMLySK','candidato_residente','2018-02-14 16:44:35','2018-02-16 10:13:14'),(35,'jcgonzalezb21@gmail.com','$2a$08$5BFyO/yoshimqZIdb7cmtuckk4OkHobo0kOEUsgg.VKa/CucswUfW','candidato_residente','2018-02-14 17:04:15','2018-02-16 10:32:52'),(36,'josmoratn@gmail.com','$2a$08$Jwo/e/zRi.JpRw/CwOzyP.FHMzvy6THb0wrWE8Mdsv5aCGs5NSt4y','candidato_residente','2018-02-14 17:07:21','2018-02-16 10:43:12'),(37,'gvenalonzomartinez@gmail.com','$2a$08$wbkwCve5aKVSYHQbD.kKu.tF3JMOYdj32KvOG4sE3zXAcwZa0Fdu6','candidato_residente','2018-02-14 22:14:15','2018-02-16 10:35:16'),(38,'sonygarc1aduran95@gmail.com','$2a$08$TNjETVekLqPfMnFYxR/aQOqO1cHp5.KQXwL71RZ8Ce3431BemDrHy','candidato_residente','2018-02-14 22:15:46','2018-02-14 22:15:46'),(39,'esnaiderivan@gmail.com','$2a$08$8C0XZ8Rv1SBJMwidOUl2RujHqsQRu4DiAxONNSthBDQKOfTXWgiU6','candidato_residente','2018-02-14 22:17:18','2018-02-16 11:51:00'),(40,'diana.velez.06@gmail.com','$2a$08$hmHJvJQGk1Lfek7m96SWhu9Xg.kCgwBNrT25OpHuo6pIBNryE2zuy','candidato_residente','2018-02-14 22:20:00','2018-02-16 11:14:24'),(41,'farcosj51@gmail.com','$2a$08$6Oe8ZOEpduXU0q6wxdRPA.yzAqsZsCrzmIV0uX64W3KYilivGuMOu','candidato_residente','2018-02-14 22:25:55','2018-02-15 18:06:20'),(42,'larioscapri@hotmail.com','$2a$08$RfgIrXwBazZxc5D4c.RK7.Fw.ZbI1lY0iFB0wjUF.Vsuu3SpFsmCK','candidato_residente','2018-02-14 22:41:10','2018-02-14 22:41:10'),(43,'jose_95_m@hotmail.com','$2a$08$BhBe8BY7zl9ggxUli9Mx1.34bAqB6rw8ZTqjSpcXXL/oAeUGqTXtu','candidato_residente','2018-02-14 22:43:12','2018-02-16 10:34:15'),(44,'karennavdiii@gmail.com','$2a$08$OtT0jSo9h9VnRevCutNWG.ewBgUtaUWIQWJr9pWY7HW7XdC5AdQv.','candidato_residente','2018-02-14 22:45:19','2018-02-14 22:45:19'),(45,'jrs_reyes90@hotmail.com','$2a$08$qogLSdAinGVHxDRS7D8C0uyaQ9QShjCvrPGT9/e2.Y6mBQE4eMWWG','candidato_residente','2018-02-14 22:48:50','2018-02-14 22:48:50'),(46,'vapm660602lc1@gmail.com','$2a$08$.fNPto3ZwTL9JlnCWuDc1.KEzgLhssQHwUllKL05uoDffbwWsugR2','asesor_externo','2018-02-15 11:45:19','2018-02-15 11:45:19'),(47,'fnd030693@gmail.com','$2a$08$0.qY50DpD42w5qOTV7YD0uv.f/Ez3jloPFZNwLfQ3C.R/VbhhRJSq','candidato_residente','2018-02-15 11:49:17','2018-02-15 11:49:17'),(48,'losiram0303@gmail.com','$2a$08$nw.uaG7FmuY/RgCePM6tg.XAhJvzDYhd0E64U5mIgE88bovGlee6K','candidato_residente','2018-02-15 11:53:01','2018-02-15 11:53:01'),(49,'emmanuel_ready56@hotmail.com','$2a$08$j3cCsd.XlFxKIJ/uueEx..cCHExVhXBpjymnNwc4vXF3bpemwEXXm','candidato_residente','2018-02-15 11:55:38','2018-02-15 11:55:38'),(50,'t.rodriguez.corona@itchilpancingo.edu.mx','$2a$08$OIAFtfwueNddfwchIcAFy.Zga1UQbrVSnIrwaSlOWP.Phx0DJ46xO','jefe_departamento','2018-02-15 18:26:32','2018-02-15 18:28:29'),(51,'JOEL00790@GMAIL.COM','$2a$08$ZURHn5D3Hvc3YdA0tkRv/OvfyQ36CrP3d3ML0Rwl12i.TQJUbPiEO','candidato_residente','2018-02-15 23:19:52','2018-02-15 23:19:52'),(52,'dirusa_sur@live.com.mx','$2a$08$FBbSm.fRNctzPYa3U33m3.9wVMUHbSYJrYWi9HiFuiBpt4ERjGOfK','asesor_externo','2018-02-16 10:13:54','2018-02-16 10:13:54'),(53,'balahoo_75@hotmail.com','$2a$08$ofdqlpuxGOzJ2R2lNt1/KOsimFaq336NQ0ilOChzDbCy7EJplPPmC','asesor_externo','2018-02-16 10:30:56','2018-02-16 10:30:56'),(54,'Wilfrido@hotmail.com','$2a$08$B8YAJU0Cc9X6eqKIr3WjSeOPu.8fwUfhh2NPQtu3DiSe1eLJqpcqm','asesor_externo','2018-02-16 10:32:00','2018-02-16 10:32:00'),(55,'sa.dr.gah@gmail.com','$2a$08$LE4la6FFsz/PjHrREHPmyOBrS5thwZACXaSFx8pN0kwKDdSc8cXUy','asesor_externo','2018-02-16 10:44:00','2018-02-16 10:44:00'),(56,'pepe.tostring@gmail.com','$2a$08$aAUJddkB9sQFa.LQY4oXFeEutP0xewmMHu4bCDVOELmi5m3nSOma.','candidato_residente','2018-02-16 11:03:02','2018-02-16 11:29:55'),(57,'og.flores.l@itchilpancingo.edu.mx','$2a$08$IRXst0EuDTUzVYiSniXeH.8n6g1KjIoOlAAvhHa3vLfR16tPHkzxK','asesor_externo','2018-02-16 11:43:42','2018-02-16 11:43:42'),(58,'toledotec@gmail.com','$2a$08$msdci.10kFnT3yplZx7K8.A6xMUHdl.GOgQMlh4oGmAq.RZqLH8ai','asesor_externo','2018-02-19 10:43:14','2018-02-19 10:43:14'),(59,'alexisjairespiritu@gmail.com','$2a$08$xd/dj.LEc8AMQA28k7AE1.lkx7I0s3LpYlhE9cno8w9hF72i5ceBW','candidato_residente','2018-02-19 11:55:46','2018-02-19 11:55:46'),(60,'mirian.barrientos@hotmail.com','$2a$08$6YSR7i8YlBT5wE5wCZP3Ye/7/yE98qc89lBeNq/ka/nhYcmBSQu0m','asesor_externo','2018-02-20 08:52:29','2018-02-20 08:52:29');
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

-- Dump completed on 2018-02-21 11:47:30
