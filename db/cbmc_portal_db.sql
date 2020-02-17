-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 17, 2020 at 01:46 AM
-- Server version: 10.1.25-MariaDB
-- PHP Version: 5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cbmc_portal_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `permited_users`
--

CREATE TABLE `permited_users` (
  `permited_users_id` int(11) NOT NULL,
  `fk_file_id` int(11) NOT NULL,
  `fk_user_id` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_cmbc_dept`
--

CREATE TABLE `tbl_cmbc_dept` (
  `dept_id` int(11) NOT NULL,
  `dept_name` varchar(100) NOT NULL,
  `dept_email` varchar(100) NOT NULL,
  `dept_status` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_cmbc_dept`
--

INSERT INTO `tbl_cmbc_dept` (`dept_id`, `dept_name`, `dept_email`, `dept_status`) VALUES
(1, 'Human Resources', 'prospteam@gmail.com', 1),
(2, 'Finance', 'prospteam@gmail.com', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_companies`
--

CREATE TABLE `tbl_companies` (
  `company_id` int(11) NOT NULL,
  `company_name` varchar(50) NOT NULL,
  `company_email` varchar(100) NOT NULL,
  `company_type` varchar(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_companies`
--

INSERT INTO `tbl_companies` (`company_id`, `company_name`, `company_email`, `company_type`) VALUES
(1, 'Hap Chan', 'prospteam@gmail.com', 'subsidiary'),
(2, 'Nuat Thai', 'prospteam@gmail.com', 'subsidiary'),
(3, 'Nuat Thai - Marikina', 'prospteam@gmail.com', 'subsidiary');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_departments`
--

CREATE TABLE `tbl_departments` (
  `department_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `department_name` varchar(100) NOT NULL,
  `department_status` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_departments`
--

INSERT INTO `tbl_departments` (`department_id`, `company_id`, `department_name`, `department_status`) VALUES
(1, 2, 'Finance', 1),
(2, 3, 'Human Resources', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_files`
--

CREATE TABLE `tbl_files` (
  `files_id` int(11) NOT NULL,
  `file_name` varchar(200) NOT NULL,
  `file_department` varchar(50) NOT NULL,
  `file_company_id` varchar(50) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_files`
--

INSERT INTO `tbl_files` (`files_id`, `file_name`, `file_department`, `file_company_id`) VALUES
(2, 'hr_file.txt', 'Human Resources', '1'),
(3, 'hr_file2.txt', 'Human Resources', '2');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_forgotpassword_keys`
--

CREATE TABLE `tbl_forgotpassword_keys` (
  `forgotpass_id` int(11) NOT NULL,
  `value` text NOT NULL,
  `status` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_forgotpassword_keys`
--

INSERT INTO `tbl_forgotpassword_keys` (`forgotpass_id`, `value`, `status`, `user_id`, `email`) VALUES
(19, 'F59R0Xvzu7GoV4kxLIDmSTytf6i1jc', 1, 11, 'prospteam@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_notifications`
--

CREATE TABLE `tbl_notifications` (
  `notification_id` int(11) NOT NULL,
  `content` varchar(200) NOT NULL,
  `from_user_id` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_notifications`
--

INSERT INTO `tbl_notifications` (`notification_id`, `content`, `from_user_id`) VALUES
(1, 'New file request', 11);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_registration_files`
--

CREATE TABLE `tbl_registration_files` (
  `registration_files_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `file_name` varchar(55) NOT NULL,
  `status` int(11) NOT NULL,
  `approved` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_registration_files`
--

INSERT INTO `tbl_registration_files` (`registration_files_id`, `user_id`, `file_name`, `status`, `approved`) VALUES
(4, 12, 'sample2.jpg', 1, 0),
(3, 11, 'sample1.jpg', 1, 0),
(5, 13, 'team2.jpg', 1, 0),
(6, 14, 'download (2).jpg', 1, 0),
(7, 15, 'Screenshot_1572849349.png', 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_requested_files`
--

CREATE TABLE `tbl_requested_files` (
  `requested_file_id` int(11) NOT NULL,
  `fk_requested_id` int(11) NOT NULL,
  `fk_file_id` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_requested_files`
--

INSERT INTO `tbl_requested_files` (`requested_file_id`, `fk_requested_id`, `fk_file_id`) VALUES
(1, 4, 2),
(2, 4, 3);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_requests`
--

CREATE TABLE `tbl_requests` (
  `request_id` int(11) NOT NULL,
  `comment` text NOT NULL,
  `company_id` int(11) NOT NULL,
  `department` varchar(50) NOT NULL,
  `file_title` varchar(100) NOT NULL,
  `requested_date` date NOT NULL,
  `request_status` varchar(50) NOT NULL DEFAULT 'Pending'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_requests`
--

INSERT INTO `tbl_requests` (`request_id`, `comment`, `company_id`, `department`, `file_title`, `requested_date`, `request_status`) VALUES
(2, 'sample comment', 2, 'Human Resources', 'hr file', '2020-01-20', 'Pending'),
(3, 'I need file for finance', 3, 'Finance', 'finance file', '2020-01-20', 'Pending'),
(4, 'I need the document for the HR file', 2, 'Human Resources', 'Hr File', '2020-01-21', 'Completed'),
(5, 'cccc', 1, 'HR Department', 'Test', '0000-00-00', 'Pending'),
(6, 'ccccc', 1, 'HR Department', 'ttt', '0000-00-00', 'Pending'),
(7, 'Cccccc', 1, 'Finance Department', 'tttXDXD', '0000-00-00', 'Pending'),
(8, 'Cccccc', 1, 'Finance Department', 'tttXDXD', '0000-00-00', 'Pending'),
(9, 'sample ', 1, 'Finance', 'test file', '2020-02-10', 'Pending'),
(10, 'samp here', 2, 'Human Resources', 'test file 2', '2020-02-10', 'Pending'),
(11, 'asdasdasd', 1, 'Human Resources', 'asdasd', '2020-02-10', 'Pending');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_users`
--

CREATE TABLE `tbl_users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `user_status` int(11) NOT NULL,
  `user_type` varchar(100) NOT NULL,
  `approved` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_users`
--

INSERT INTO `tbl_users` (`user_id`, `username`, `password`, `user_status`, `user_type`, `approved`) VALUES
(1, 'admin', '$2y$10$.Nice1AanGpYvxxrX40kmeDtwoaeQDp5RhYzO3b5bZ57Msp5JxiIm', 1, 'admin', 1),
(12, 'Kerry', '$2y$10$z/RGawkfgT9dx5AyQAjHweWeDJiOYKsTK4aw1paJji.ZShSoKaz6a', 1, 'investor', 0),
(11, 'test', '$2y$10$LF5oGws0GiyjKROjna/Ote0Z4OxCVQUYMX4rnCnmjdWVFiEjiQqWi', 1, 'investor', 1),
(13, 'john001', '$2y$10$RksCrxBpNlWfBQiuRqIThe7/CBhXGN.xZppUrcchcApYk609nahgy', 1, 'investor', 0),
(14, 'webweb', '$2y$10$F2BcEULbjNaEgmwEgz4Iced1KVIPn2y6HFhuCcX0EJJUNEwsjJyAG', 1, 'investor', 0),
(15, 'cbmc', '$2y$10$Z5s.C0zWEzNQAQRJR2ZIqe9cRdTc4Fm5nZOkxruyC9KivUoXgmHxW', 1, 'cbmc', 0),
(16, 'sub', '$2y$10$QWlUzRDV7qVYFdBBYlUltOeOxSaga3Guxwv59/8T.TpSPn5kj2lny', 1, 'subsidiary', 1),
(26, 'est', '$2y$10$19sI0LwyOGhoHY2cup5zZOZdlC5LHf/JOmBUh3953/dOH7VVSjBeK', 1, 'subsidiary', 1),
(27, 'cmb3', '$2y$10$0mZqMLXnEXJftMJ.eGLpF.HpVs9Nx.8bnl6cNBONP16Hp.2fxcTfG', 1, 'cbmc', 1),
(25, 'cbmc2', '$2y$10$I8sA9Qlzvh3TludsiKIKEO6aAdWuncs2OhE/78V4mICUxDMawX8HG', 1, 'cbmc', 1),
(28, 'test33', '$2y$10$PEjBZEQB4R9asaI5iaDoZOCPjPaJrFZ1niPk0vtU6KTQSdT/PC1ra', 1, 'cbmc', 1),
(29, 'test123', '$2y$10$LPJTirvMXfOVuQdO1dlES.LDZ1j6yLGS7CVedpdWmcRN4NX0C./Wy', 1, 'subsidiary', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user_company`
--

CREATE TABLE `tbl_user_company` (
  `user_company_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `status` varchar(55) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_user_company`
--

INSERT INTO `tbl_user_company` (`user_company_id`, `user_id`, `company_id`, `status`) VALUES
(1, 16, 1, 'joined'),
(2, 16, 2, 'joined'),
(3, 26, 1, 'joined'),
(4, 29, 1, 'joined'),
(5, 29, 2, 'joined'),
(6, 29, 3, 'joined');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user_dept_details`
--

CREATE TABLE `tbl_user_dept_details` (
  `user_dept_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `departments` varchar(100) NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_user_dept_details`
--

INSERT INTO `tbl_user_dept_details` (`user_dept_id`, `user_id`, `departments`, `status`) VALUES
(1, 15, 'Finance', 1),
(2, 15, 'Human Resources', 1),
(3, 25, 'Human Resources', 1),
(4, 25, 'Finance', 1),
(5, 27, 'Human Resources', 1),
(6, 28, 'Human Resources', 1),
(7, 28, 'Finance', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user_details`
--

CREATE TABLE `tbl_user_details` (
  `user_detail_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `email_address` varchar(100) NOT NULL,
  `contact_number` varchar(100) NOT NULL,
  `profile_picture` varchar(100) NOT NULL,
  `created_date` varchar(50) NOT NULL,
  `updated_date` varchar(50) NOT NULL,
  `company_id` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_user_details`
--

INSERT INTO `tbl_user_details` (`user_detail_id`, `user_id`, `firstname`, `lastname`, `email_address`, `contact_number`, `profile_picture`, `created_date`, `updated_date`, `company_id`) VALUES
(1, 1, 'Richard', 'Cruz', 'admin@admin.com', '09123456789', 'profile-1581329524.png', '2020-01-15 00:00:00', '2020-02-10 11:12:24', 0),
(7, 11, 'Juan', 'Dela Cruz', 'juandelacruz@gmail.com', '09123456789', 'profile-1581328061.png', '2020-01-16 09:25:57', '2020-02-10 10:46:04', 1),
(8, 12, 'John', 'Doe', 'example@proweaver.com', 'Uy', '', '2020-01-17 06:23:52', '0000-00-00 00:00:00', 1),
(9, 13, 'John', 'Smith', 'john@gmail.com', '0945609', '', '2020-01-22 08:09:05', '0000-00-00 00:00:00', 0),
(10, 14, 'webweb', 'webweb', 'webweb@test.com', 'webweb', '', '2020-01-22 08:17:39', '0000-00-00 00:00:00', 0),
(11, 15, 'John', 'Doe', 'example@example.com', '09123456789', 'profile-1581329375.png', '2020-01-22 08:47:10', '2020-02-10 11:09:26', 0),
(12, 16, 'Jessie', 'Joe', 'sub@assd.com', '123456', '', '2020-01-22 08:47:10', '2020-01-22 08:47:10', 1),
(13, 25, 'sample', 'sample', 'sample@ssample.com', '1234', '', '2020-02-13 03:56:25', '0000-00-00 00:00:00', 0),
(14, 26, 'Jamess', 'Harden', 'james@asd.com', 'test', '', '2020-02-13 04:31:55', '0000-00-00 00:00:00', 0),
(15, 27, 'Sample', 'Sample2', 'admin@admin.comssss', 'asdasd', '', '2020-02-13 05:00:58', '0000-00-00 00:00:00', 0),
(16, 28, 'Sample user', 'Sample user', 'admin@admin.comsss', '234123', '', '2020-02-13 06:02:46', '0000-00-00 00:00:00', 0),
(17, 29, 'Comp1', 'Comp1', 'admin@asd.com2', '123', '', '2020-02-13 06:03:10', '0000-00-00 00:00:00', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `permited_users`
--
ALTER TABLE `permited_users`
  ADD PRIMARY KEY (`permited_users_id`);

--
-- Indexes for table `tbl_cmbc_dept`
--
ALTER TABLE `tbl_cmbc_dept`
  ADD PRIMARY KEY (`dept_id`);

--
-- Indexes for table `tbl_companies`
--
ALTER TABLE `tbl_companies`
  ADD PRIMARY KEY (`company_id`);

--
-- Indexes for table `tbl_departments`
--
ALTER TABLE `tbl_departments`
  ADD PRIMARY KEY (`department_id`);

--
-- Indexes for table `tbl_files`
--
ALTER TABLE `tbl_files`
  ADD PRIMARY KEY (`files_id`);

--
-- Indexes for table `tbl_forgotpassword_keys`
--
ALTER TABLE `tbl_forgotpassword_keys`
  ADD PRIMARY KEY (`forgotpass_id`);

--
-- Indexes for table `tbl_notifications`
--
ALTER TABLE `tbl_notifications`
  ADD PRIMARY KEY (`notification_id`);

--
-- Indexes for table `tbl_registration_files`
--
ALTER TABLE `tbl_registration_files`
  ADD PRIMARY KEY (`registration_files_id`);

--
-- Indexes for table `tbl_requested_files`
--
ALTER TABLE `tbl_requested_files`
  ADD PRIMARY KEY (`requested_file_id`);

--
-- Indexes for table `tbl_requests`
--
ALTER TABLE `tbl_requests`
  ADD PRIMARY KEY (`request_id`);

--
-- Indexes for table `tbl_users`
--
ALTER TABLE `tbl_users`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `tbl_user_company`
--
ALTER TABLE `tbl_user_company`
  ADD PRIMARY KEY (`user_company_id`);

--
-- Indexes for table `tbl_user_dept_details`
--
ALTER TABLE `tbl_user_dept_details`
  ADD PRIMARY KEY (`user_dept_id`);

--
-- Indexes for table `tbl_user_details`
--
ALTER TABLE `tbl_user_details`
  ADD PRIMARY KEY (`user_detail_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `permited_users`
--
ALTER TABLE `permited_users`
  MODIFY `permited_users_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_cmbc_dept`
--
ALTER TABLE `tbl_cmbc_dept`
  MODIFY `dept_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `tbl_companies`
--
ALTER TABLE `tbl_companies`
  MODIFY `company_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `tbl_departments`
--
ALTER TABLE `tbl_departments`
  MODIFY `department_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `tbl_files`
--
ALTER TABLE `tbl_files`
  MODIFY `files_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `tbl_forgotpassword_keys`
--
ALTER TABLE `tbl_forgotpassword_keys`
  MODIFY `forgotpass_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
--
-- AUTO_INCREMENT for table `tbl_notifications`
--
ALTER TABLE `tbl_notifications`
  MODIFY `notification_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `tbl_registration_files`
--
ALTER TABLE `tbl_registration_files`
  MODIFY `registration_files_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `tbl_requested_files`
--
ALTER TABLE `tbl_requested_files`
  MODIFY `requested_file_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `tbl_requests`
--
ALTER TABLE `tbl_requests`
  MODIFY `request_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `tbl_users`
--
ALTER TABLE `tbl_users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
--
-- AUTO_INCREMENT for table `tbl_user_company`
--
ALTER TABLE `tbl_user_company`
  MODIFY `user_company_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `tbl_user_dept_details`
--
ALTER TABLE `tbl_user_dept_details`
  MODIFY `user_dept_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `tbl_user_details`
--
ALTER TABLE `tbl_user_details`
  MODIFY `user_detail_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
