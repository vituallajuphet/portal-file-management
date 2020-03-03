-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 03, 2020 at 12:38 PM
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
  `address` varchar(100) NOT NULL,
  `company_contact` varchar(100) NOT NULL,
  `company_type` varchar(100) NOT NULL,
  `company_status` varchar(55) NOT NULL,
  `remarks` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_companies`
--

INSERT INTO `tbl_companies` (`company_id`, `company_name`, `company_email`, `address`, `company_contact`, `company_type`, `company_status`, `remarks`) VALUES
(1, 'Hap Chan', 'prospteam@gmail.com', 'Malabon', '1234', 'subsidiary', 'active', 'test remakrs'),
(2, 'Nuat Thai', 'prospteam@gmail.com', 'Cebu', '1234656', 'subsidiary', 'active', 'test remakrs'),
(3, 'Nuat Thai - Marikina', 'prospteam@gmail.com', 'Marikina', '1235123123', 'subsidiary', 'active', 'test remakrs'),
(4, 'proweaver', 'ased@asd.com', 'Test Addresss', 'asd', 'subsidiary', 'active', 'asdasdasd'),
(5, 'Proweaver22', 'asd@asd.com', 'Proweaver2', 'asdasd', 'subsidiary', 'active', '123123'),
(6, 'test c1', 'gasdasd2@asd.com', 'asdasd', 'asd', 'subsidiary', 'deleted', '123123'),
(7, 'test 1', 'asd@asd.com', 'asd', '123123', 'subsidiary', 'deleted', 'asdteas'),
(8, 'test c12', 'gasdasd2@asd.com', 'asdasd', 'asd', 'subsidiary', 'deleted', '123123'),
(9, 'latest Company', 'gasdasd2@asd.com', 'asdasd', 'asd', 'subsidiary', 'deleted', '123123'),
(10, 'test c12', 'gasdasd2@asd.com', 'asdasd', 'asd', 'subsidiary', 'deleted', ''),
(11, 'latest Companys', 'gasdasd2@asd.com', 'asdasd', 'asd', 'subsidiary', 'deleted', ''),
(12, 'latest Companys222', 'gasdasd2@asd.com', 'asdasd', 'asdasdasd', 'subsidiary', 'deleted', 'asdasd'),
(13, 'asdasdasd', 'prospteam@gmail.com', 'asasdasd', 'asdasd', 'subsidiary', 'active', 'asdasd');

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
  `file_company_id` varchar(50) NOT NULL,
  `file_title` varchar(100) NOT NULL,
  `added_by` int(11) NOT NULL,
  `date_added` date NOT NULL,
  `date_updated` date NOT NULL,
  `file_status` varchar(100) NOT NULL,
  `remarks` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_files`
--

INSERT INTO `tbl_files` (`files_id`, `file_name`, `file_department`, `file_company_id`, `file_title`, `added_by`, `date_added`, `date_updated`, `file_status`, `remarks`) VALUES
(7, 'file-1582223835.png', 'Human Resources', '0', 'Finance File', 1, '2020-02-19', '2020-02-28', 'published', 'SAmple only 2'),
(8, 'file-1582138350.jpg', 'Human Resources', '0', 'HR File', 1, '2020-02-19', '2020-02-20', 'published', 'This is only a sample'),
(9, 'file-1582225975.png', 'N/A', '0', 'Test File', 1, '2020-02-20', '2020-02-20', 'archieved', 'sample');

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
-- Table structure for table `tbl_notification`
--

CREATE TABLE `tbl_notification` (
  `notify_id` int(11) NOT NULL,
  `message` text NOT NULL,
  `fk_user_id_from` int(11) NOT NULL,
  `fk_user_id_to` int(11) NOT NULL,
  `is_read` int(11) NOT NULL,
  `notify_status` varchar(20) NOT NULL,
  `date_created` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_notification`
--

INSERT INTO `tbl_notification` (`notify_id`, `message`, `fk_user_id_from`, `fk_user_id_to`, `is_read`, `notify_status`, `date_created`) VALUES
(1, 'You account has been approved.', 1, 11, 0, '1', '2020-03-03'),
(3, 'Your account has been appoved.', 1, 34, 1, '1', '2020-03-17'),
(4, 'Your account has been appoved.', 1, 34, 1, '1', '2020-03-16'),
(5, 'Your request has been processed', 1, 34, 0, '1', '2020-03-15'),
(6, 'Your account has been appoved.', 1, 34, 0, '1', '2020-03-12'),
(7, 'Inverstor send a request file', 11, 1, 1, 'published', '2020-03-11'),
(8, 'Investor requested a file', 11, 1, 1, '1', '2020-03-20');

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
  `status` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_registration_files`
--

INSERT INTO `tbl_registration_files` (`registration_files_id`, `user_id`, `file_name`, `status`) VALUES
(4, 12, 'sample2.jpg', 1),
(3, 11, 'sample1.jpg', 1),
(5, 13, 'team2.jpg', 1),
(6, 14, 'download (2).jpg', 1),
(7, 15, 'Screenshot_1572849349.png', 1),
(8, 32, 'register-file-1582797616.jpg', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_requested_files`
--

CREATE TABLE `tbl_requested_files` (
  `requested_file_id` int(11) NOT NULL,
  `fk_requested_id` int(11) NOT NULL,
  `fk_file_id` int(11) NOT NULL,
  `fk_approved_user_id` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_requests`
--

CREATE TABLE `tbl_requests` (
  `request_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `comment` text NOT NULL,
  `company_id` int(11) NOT NULL,
  `department` varchar(50) NOT NULL,
  `file_title` varchar(100) NOT NULL,
  `requested_date` date NOT NULL,
  `date_approved` date NOT NULL,
  `request_status` varchar(50) NOT NULL DEFAULT 'Pending'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_requests`
--

INSERT INTO `tbl_requests` (`request_id`, `user_id`, `comment`, `company_id`, `department`, `file_title`, `requested_date`, `date_approved`, `request_status`) VALUES
(24, 11, 'test', 2, 'Finance', 'test', '2020-03-03', '0000-00-00', 'Pending'),
(23, 34, 'test', 2, 'Human Resources', 'test', '2020-02-28', '0000-00-00', 'Processing'),
(22, 11, 'test', 1, 'Finance', 'finance test1', '2020-02-28', '0000-00-00', 'Pending'),
(21, 11, 'I need finance File', 1, 'Finance', 'Finance File', '2020-02-28', '0000-00-00', 'Pending'),
(25, 11, 'test', 2, 'Finance', 'test 123', '2020-03-03', '0000-00-00', 'Pending'),
(26, 11, 'tes', 3, 'Human Resources', 'test2123', '2020-03-03', '0000-00-00', 'Pending');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_restricted_user`
--

CREATE TABLE `tbl_restricted_user` (
  `restricted_id` int(11) NOT NULL,
  `file_id` int(11) NOT NULL,
  `request_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `status` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
(11, 'test', '$2y$10$LF5oGws0GiyjKROjna/Ote0Z4OxCVQUYMX4rnCnmjdWVFiEjiQqWi', 0, 'investor', 1),
(34, 'test3', '$2y$10$LF5oGws0GiyjKROjna/Ote0Z4OxCVQUYMX4rnCnmjdWVFiEjiQqWi', 0, 'investor', 1),
(33, 'test2', '$2y$10$cZRjHKeuRbdL5YoczHXRB.TcdFUGSTklPRRQOw8cwsTi6uJyTkdAi', 1, 'cbmc', 1);

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
(24, 11, 3, 'joined'),
(23, 11, 2, 'joined'),
(21, 34, 2, 'joined'),
(20, 34, 1, 'joined'),
(22, 11, 1, 'joined');

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
(14, 33, 'Human Resources', 1),
(15, 33, 'Finance', 1);

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
(8, 11, 'John', 'Doe', 'example@proweaver.com', 'Uy', 'profile-1582875083.png', '2020-01-17 06:23:52', '0000-00-00 00:00:00', 1),
(21, 33, 'James', 'Rizal', 'prospteam@gmail.com', '123456', '', '2020-02-28 08:34:57', '0000-00-00 00:00:00', 0),
(22, 34, 'Maine', 'Mendoza', 'sample@sample.com', '123456', '', '2020-02-28 08:35:42', '0000-00-00 00:00:00', 0);

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
-- Indexes for table `tbl_notification`
--
ALTER TABLE `tbl_notification`
  ADD PRIMARY KEY (`notify_id`);

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
-- Indexes for table `tbl_restricted_user`
--
ALTER TABLE `tbl_restricted_user`
  ADD PRIMARY KEY (`restricted_id`);

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
  MODIFY `company_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `tbl_departments`
--
ALTER TABLE `tbl_departments`
  MODIFY `department_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `tbl_files`
--
ALTER TABLE `tbl_files`
  MODIFY `files_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT for table `tbl_forgotpassword_keys`
--
ALTER TABLE `tbl_forgotpassword_keys`
  MODIFY `forgotpass_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
--
-- AUTO_INCREMENT for table `tbl_notification`
--
ALTER TABLE `tbl_notification`
  MODIFY `notify_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `tbl_notifications`
--
ALTER TABLE `tbl_notifications`
  MODIFY `notification_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `tbl_registration_files`
--
ALTER TABLE `tbl_registration_files`
  MODIFY `registration_files_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `tbl_requested_files`
--
ALTER TABLE `tbl_requested_files`
  MODIFY `requested_file_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;
--
-- AUTO_INCREMENT for table `tbl_requests`
--
ALTER TABLE `tbl_requests`
  MODIFY `request_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
--
-- AUTO_INCREMENT for table `tbl_restricted_user`
--
ALTER TABLE `tbl_restricted_user`
  MODIFY `restricted_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_users`
--
ALTER TABLE `tbl_users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;
--
-- AUTO_INCREMENT for table `tbl_user_company`
--
ALTER TABLE `tbl_user_company`
  MODIFY `user_company_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
--
-- AUTO_INCREMENT for table `tbl_user_dept_details`
--
ALTER TABLE `tbl_user_dept_details`
  MODIFY `user_dept_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT for table `tbl_user_details`
--
ALTER TABLE `tbl_user_details`
  MODIFY `user_detail_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
