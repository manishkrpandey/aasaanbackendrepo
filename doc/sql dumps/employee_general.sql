/*
SQLyog Ultimate v11.11 (64 bit)
MySQL - 5.5.5-10.1.30-MariaDB : Database - bandagv7_online_food
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`bandagv7_online_food` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_bin */;

USE `bandagv7_online_food`;

/*Data for the table `employee_job_types` */

insert  into `employee_job_types`(`id`,`title`,`metadata`,`created_on`,`updated_on`) values (1,'Full Time',NULL,'2019-10-25 00:44:01','2019-10-25 00:44:01'),(2,'Part Time',NULL,'2019-10-25 00:44:01','2019-10-25 00:44:01');

/*Data for the table `employee_slots` */

insert  into `employee_slots`(`id`,`title`,`start_time`,`end_time`,`metadata`,`created_on`,`updated_on`) values (1,'Morning','08:00','14:00',NULL,'2019-10-25 00:44:01','2019-10-25 00:44:01'),(2,'Afternoon','12:00','19:00',NULL,'2019-10-25 00:44:01','2019-10-25 00:44:01'),(3,'Evening','18:00','23:00',NULL,'2019-10-25 00:44:01','2019-10-25 00:44:01');

/*Data for the table `employee_types` */

insert  into `employee_types`(`id`,`title`,`metadata`,`created_on`,`updated_on`) values (1,'Agent',NULL,'2019-10-25 00:44:01','2019-10-25 00:44:01'),(2,'Delivery Boy',NULL,'2019-10-25 00:44:01','2019-10-25 00:44:01');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
