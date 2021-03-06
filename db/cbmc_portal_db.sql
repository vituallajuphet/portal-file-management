-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 22, 2020 at 05:19 PM
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
(13, 'com1', 'prospteam@gmail.com', 'asasdasd', 'asdasd', 'subsidiary', 'active', 'asdasd');

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
-- Table structure for table `tbl_events`
--

CREATE TABLE `tbl_events` (
  `event_id` int(11) NOT NULL,
  `fk_user_id` int(11) NOT NULL,
  `event_title` varchar(100) NOT NULL,
  `event_content` longtext NOT NULL,
  `date_created` date NOT NULL,
  `event_status` int(11) NOT NULL,
  `event_image` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_events`
--

INSERT INTO `tbl_events` (`event_id`, `fk_user_id`, `event_title`, `event_content`, `date_created`, `event_status`, `event_image`) VALUES
(1, 1, 'Event 1', '<p>For a marketer, there&rsquo;s nothing worse than struggling with a creative block. When you&rsquo;re pressed to create on a deadline, but you just can&rsquo;t think of something original to post, or an original concept for your next campaign, it&rsquo;s easy to fall into despair.</p>\r\n\r\n<p>In fact, that&rsquo;s probably why you&rsquo;re here. It&rsquo;s okay though. We all need some inspiration now and then to help us shake off the rust and get back to creating awesome stuff.</p>\r\n', '2020-03-18', 1, 'post_image-1584709861.png'),
(2, 1, 'event 2', '<p>The best way to drive a message home is to build a complete campaign.</p>\r\n\r\n<p>Oftentimes, brands struggle to keep up with their social posting schedule because they&rsquo;re too reliant on one-off posts. This makes staying organized difficult. Plus, it&rsquo;s tough to always be writing posts on the fly without much thought ahead of time.</p>\r\n', '2020-03-18', 1, 'post_image-1584709958.jpg'),
(3, 1, 'test 2', 'asd asd asd asd', '2020-03-18', 3, 'post_image-1584547415.png'),
(4, 1, 'sample post ss', '<p>asda sdas asd asd asd asda sdasd asda sdasd</p>\r\n', '2020-03-18', 3, 'post_image-1584599267.jpg'),
(5, 1, 'COVID -19', '<p>The World Health Organization recommended Tuesday that people suffering COVID-19 symptoms avoid taking ibuprofen, after French officials warned that anti-inflammatory drugs could worsen effects of the virus.</p>\r\n\r\n<p>The warning by French Health Minister Veran followed a recent study in <a href=\"https://www.thelancet.com/journals/lanres/article/PIIS2213-2600(20)30116-8/fulltext\"><em>The Lancet</em></a> medical journal that hypothesised that an enzyme boosted by anti-inflammatory drugs such as ibuprofen could facilitate and worsen COVID-19 infections.</p>\r\n\r\n<p>Asked about the study, WHO spokesman Christian Lindmeier told reporters in Geneva the UN health agency&#39;s experts were &quot;looking into this to give further guidance.&quot;</p>\r\n\r\n<p>&quot;In the meantime, we recommend using rather paracetamol, and do not use ibuprofen as a self-medication. That&#39;s important,&quot; he said.</p>\r\n\r\n<p>He added that if ibuprofen had been &quot;prescribed by the healthcare professionals, then, of course, that&#39;s up to them.&quot;</p>\r\n\r\n<p>His comments came after <a href=\"https://twitter.com/olivierveran/status/1239931737549033472\">Veran sent a tweet</a> cautioning that the use of ibuprofen and similar anti-inflammatory drugs could be &quot;an aggravating factor&quot; in COVID-19 infections.</p>\r\n', '2020-03-18', 1, 'post_image-1584559180.jpg'),
(6, 1, 'test new2', '<p>This is ssample post ony</p>\r\n', '2020-03-19', 3, 'post_image-1584599612.jpg'),
(7, 1, 'Event 4', '<p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using &#39;Content here, content here&#39;, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for &#39;lorem ipsum&#39; will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>\r\n', '2020-03-20', 1, 'post_image-1584710119.jpg'),
(8, 1, 'test 222', '<p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of &quot;de Finibus Bonorum et Malorum&quot; (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, &quot;Lorem ipsum dolor sit amet..&quot;, comes from a line in section 1.10.32.</p>\r\n', '2020-03-20', 1, 'post_image-1584709882.png'),
(9, 1, 'test', '<p>asdasd</p>\r\n', '2020-03-21', 3, 'post_image-1584790364.jpg');

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
(9, 'file-1582225975.png', 'Finance', '0', 'Test Files', 1, '2020-02-20', '2020-03-09', 'archieved', 'samples'),
(21, 'file-1583803088.jpg', 'Human Resources', '0', 'test file 2', 33, '2020-03-10', '0000-00-00', 'published', 'test'),
(22, 'file-1583841892.jpg', 'Human Resources', '0', 'test file 2', 33, '2020-03-10', '0000-00-00', 'published', 'asdasdasdasd'),
(20, 'file-1583722521.jpg', 'Finance', '0', 'finance 2', 33, '2020-03-09', '2020-03-09', 'deleted', 'test');

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
(36, 'Investor requested a file', 11, 33, 1, '1', '2020-03-11'),
(37, 'Investor requested a file', 11, 1, 0, '1', '2020-03-11'),
(38, 'Investor requested a file', 11, 33, 1, '1', '2020-03-11'),
(39, 'Investor requested a file', 11, 1, 1, '1', '2020-03-11'),
(40, 'Your request has been processed', 1, 11, 0, '1', '2020-03-11'),
(41, 'Your request file has been approved', 1, 11, 1, '1', '2020-03-11'),
(42, 'Your request has been processed', 1, 11, 0, '1', '2020-03-11'),
(43, 'Your request file has been approved', 1, 11, 0, '1', '2020-03-11'),
(44, 'Investor requested a file', 11, 33, 1, '1', '2020-03-11'),
(45, 'Investor requested a file', 11, 1, 0, '1', '2020-03-11'),
(46, 'Investor requested a file', 11, 33, 1, '1', '2020-03-11'),
(47, 'Investor requested a file', 11, 1, 0, '1', '2020-03-11'),
(48, 'Investor requested a file', 11, 33, 1, '1', '2020-03-11'),
(49, 'Investor requested a file', 11, 1, 0, '1', '2020-03-11'),
(50, 'Investor send you an email.', 11, 1, 0, '1', '2020-03-11'),
(51, 'Investor requested a file', 11, 33, 1, '1', '2020-03-11'),
(52, 'Investor requested a file', 11, 1, 0, '1', '2020-03-11'),
(53, 'Investor send you an email.', 11, 1, 0, '1', '2020-03-11'),
(54, 'Your request has been processed', 1, 11, 0, '1', '2020-03-11'),
(55, 'Your request has been processed', 1, 11, 0, '1', '2020-03-11'),
(56, 'Your request file has been approved', 1, 11, 0, '1', '2020-03-11'),
(57, 'Investor requested a file', 34, 33, 0, '1', '2020-03-15'),
(58, 'Investor requested a file', 34, 1, 1, '1', '2020-03-15'),
(59, 'Investor requested a file', 34, 33, 0, '1', '2020-03-15'),
(60, 'Investor requested a file', 34, 1, 1, '1', '2020-03-15'),
(61, 'Investor requested a file', 11, 33, 0, '1', '2020-03-15'),
(62, 'Investor requested a file', 11, 1, 1, '1', '2020-03-15'),
(63, 'Your request has been processed', 1, 11, 0, '1', '2020-03-15'),
(64, 'Your request file has been approved', 1, 11, 0, '1', '2020-03-15'),
(65, 'Investor requested a file', 34, 33, 0, '1', '2020-03-16'),
(66, 'Investor requested a file', 34, 1, 0, '1', '2020-03-16'),
(67, 'Investor requested a file', 34, 33, 0, '1', '2020-03-16'),
(68, 'Investor requested a file', 34, 1, 0, '1', '2020-03-16'),
(69, 'Your request has been processed', 1, 11, 0, '1', '2020-03-16'),
(70, 'Your request file has been approved', 1, 11, 0, '1', '2020-03-16'),
(71, 'Your request has been processed', 35, 34, 1, '1', '2020-03-17'),
(72, 'Your request has been processed', 35, 34, 0, '1', '2020-03-17'),
(73, 'Your request has been processed', 1, 34, 0, '1', '2020-03-17'),
(74, 'Your request has been processed', 1, 34, 0, '1', '2020-03-17'),
(75, 'Your request has been processed', 35, 34, 0, '1', '2020-03-17'),
(76, 'Investor requested a file', 11, 33, 0, '1', '2020-03-17'),
(77, 'Investor requested a file', 11, 1, 0, '1', '2020-03-17'),
(78, 'Investor requested a file', 11, 33, 0, '1', '2020-03-17'),
(79, 'Investor requested a file', 11, 1, 0, '1', '2020-03-17'),
(80, 'Your request has been processed', 35, 11, 0, '1', '2020-03-17'),
(81, 'Your request has been processed', 35, 11, 0, '1', '2020-03-17'),
(82, 'Your request has been processed', 35, 11, 0, '1', '2020-03-17'),
(83, 'Your request has been processed', 35, 11, 0, '1', '2020-03-17'),
(84, 'Your request has been processed', 35, 11, 0, '1', '2020-03-17'),
(85, 'Your request has been processed', 35, 11, 0, '1', '2020-03-17'),
(86, 'Your request has been processed', 1, 11, 0, '1', '2020-03-17'),
(87, 'Investor requested a file', 11, 33, 0, '1', '2020-03-17'),
(88, 'Investor requested a file', 11, 1, 0, '1', '2020-03-17'),
(89, 'Your request has been processed', 1, 11, 0, '1', '2020-03-17'),
(90, 'Your request file has been approved', 1, 11, 0, '1', '2020-03-17'),
(91, 'Investor requested a file', 11, 33, 0, '1', '2020-03-17'),
(92, 'Investor requested a file', 11, 1, 0, '1', '2020-03-17'),
(93, 'Your request has been processed', 1, 11, 0, '1', '2020-03-17'),
(94, 'Your request file has been approved', 1, 11, 0, '1', '2020-03-17'),
(95, 'Your request has been processed', 35, 11, 0, '1', '2020-03-17'),
(96, 'Investor requested a file', 34, 33, 0, '1', '2020-03-17'),
(97, 'Investor requested a file', 34, 1, 0, '1', '2020-03-17'),
(98, 'Your request has been processed', 35, 34, 0, '1', '2020-03-17'),
(99, 'Your request file has been approved', 1, 34, 0, '1', '2020-03-17'),
(100, 'Investor requested a file', 34, 33, 0, '1', '2020-03-17'),
(101, 'Investor requested a file', 34, 1, 0, '1', '2020-03-17'),
(102, 'Investor requested a file', 11, 33, 0, '1', '2020-03-17'),
(103, 'Investor requested a file', 11, 1, 0, '1', '2020-03-17'),
(104, 'Your request has been processed', 1, 11, 0, '1', '2020-03-17'),
(105, 'Your request file has been approved', 1, 11, 0, '1', '2020-03-17'),
(106, 'Your request has been processed', 35, 34, 0, '1', '2020-03-17'),
(107, 'Your request file has been approved', 1, 34, 0, '1', '2020-03-17'),
(108, 'Investor requested a file', 11, 33, 0, '1', '2020-03-20'),
(109, 'Investor requested a file', 11, 1, 1, '1', '2020-03-20'),
(110, 'Investor requested a file', 11, 33, 0, '1', '2020-03-20'),
(111, 'Investor requested a file', 11, 1, 0, '1', '2020-03-20'),
(112, 'Your request has been processed', 1, 11, 0, '1', '2020-03-20'),
(113, 'Investor requested a file', 11, 33, 0, '1', '2020-03-22'),
(114, 'Investor requested a file', 11, 1, 0, '1', '2020-03-22'),
(115, 'Investor requested a file', 11, 33, 0, '1', '2020-03-22'),
(116, 'Investor requested a file', 11, 1, 0, '1', '2020-03-22'),
(117, 'Investor requested a file', 11, 33, 0, '1', '2020-03-22'),
(118, 'Investor requested a file', 11, 1, 0, '1', '2020-03-22'),
(119, 'Your request has been processed', 1, 11, 0, '1', '2020-03-22'),
(120, 'Your request file has been approved', 1, 11, 0, '1', '2020-03-22'),
(121, 'Investor requested a file', 11, 33, 0, '1', '2020-03-23'),
(122, 'Investor requested a file', 11, 1, 0, '1', '2020-03-23'),
(123, 'Your request has been processed', 35, 11, 1, '1', '2020-03-23'),
(124, 'Your request file has been approved', 1, 11, 0, '1', '2020-03-23');

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
-- Table structure for table `tbl_processed_request`
--

CREATE TABLE `tbl_processed_request` (
  `process_id` int(11) NOT NULL,
  `fk_file_id` int(11) NOT NULL,
  `fk_request_id` int(11) NOT NULL,
  `fk_process_user_id` int(11) NOT NULL,
  `process_file_name` varchar(100) NOT NULL,
  `process_file_title` varchar(100) NOT NULL,
  `date_created` date NOT NULL,
  `process_status` varchar(55) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
(8, 32, 'register-file-1582797616.jpg', 1),
(9, 36, 'register-file-1583888836.jpg', 1);

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
  `request_status` varchar(50) NOT NULL DEFAULT 'Pending' COMMENT 'test'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_requests`
--

INSERT INTO `tbl_requests` (`request_id`, `user_id`, `comment`, `company_id`, `department`, `file_title`, `requested_date`, `date_approved`, `request_status`) VALUES
(60, 11, 'test file', 1, 'Finance', 'sample 1', '2020-03-23', '2020-03-22', 'Completed');

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

--
-- Dumping data for table `tbl_restricted_user`
--

INSERT INTO `tbl_restricted_user` (`restricted_id`, `file_id`, `request_id`, `user_id`, `status`) VALUES
(4, 8, 45, 11, 'Restricted'),
(5, 7, 45, 11, 'Restricted');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_subsidiary_files`
--

CREATE TABLE `tbl_subsidiary_files` (
  `sub_file_id` int(11) NOT NULL,
  `file_title` varchar(100) NOT NULL,
  `file_name` varchar(100) NOT NULL,
  `fk_process_user_id` int(11) NOT NULL,
  `fk_request_id` int(11) NOT NULL,
  `date_created` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_subsidiary_files`
--

INSERT INTO `tbl_subsidiary_files` (`sub_file_id`, `file_title`, `file_name`, `fk_process_user_id`, `fk_request_id`, `date_created`) VALUES
(1, 'sample file 1', 'process-file-1584893500.jpg', 35, 60, '2020-03-22');

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
(11, 'test', '$2y$10$LF5oGws0GiyjKROjna/Ote0Z4OxCVQUYMX4rnCnmjdWVFiEjiQqWi', 1, 'investor', 1),
(36, 'alex', '$2y$10$QEXoSTylG8K6.fDiDboPY.iqLxrP/ZTRPJLP7YyPPbKbNYc.G84v6', 1, 'investor', 2),
(35, 'test2', '$2y$10$GWOHNb0GiJVfJ8GZ93CNYuFa8GOFhOvpjGUHmJ50RqXeWZBKCG/DW', 1, 'subsidiary', 1),
(34, 'test3', '$2y$10$LF5oGws0GiyjKROjna/Ote0Z4OxCVQUYMX4rnCnmjdWVFiEjiQqWi', 1, 'investor', 1),
(33, 'cbmc', '$2y$10$cZRjHKeuRbdL5YoczHXRB.TcdFUGSTklPRRQOw8cwsTi6uJyTkdAi', 1, 'cbmc', 1);

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
(25, 35, 1, 'joined'),
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
(16, 33, 'Human Resources', 1),
(17, 33, 'Finance', 1);

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
(8, 11, 'John', 'Doe', 'prospteam@gmail.com', 'Uy', 'profile-1584687010.png', '2020-01-17 06:23:52', '0000-00-00 00:00:00', 1),
(21, 33, 'James', 'Rizal', 'prospteam@gmail.com', '123456', '', '2020-02-28 08:34:57', '2020-03-05 03:47:29', 0),
(22, 34, 'Maine', 'Mendoza', 'prospteam@gmail.com', '123456', '', '2020-02-28 08:35:42', '0000-00-00 00:00:00', 0),
(23, 35, 'Gerald', 'Ad2', 'asd@asd.com', '1234', '', '2020-03-10 12:39:29', '2020-03-22 10:33:13', 0),
(24, 36, 'Alex', 'Tides', 'sample@sample.com', '123456', '', '2020-03-11 02:07:16', '0000-00-00 00:00:00', 0);

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
-- Indexes for table `tbl_events`
--
ALTER TABLE `tbl_events`
  ADD PRIMARY KEY (`event_id`);

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
-- Indexes for table `tbl_processed_request`
--
ALTER TABLE `tbl_processed_request`
  ADD PRIMARY KEY (`process_id`);

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
-- Indexes for table `tbl_subsidiary_files`
--
ALTER TABLE `tbl_subsidiary_files`
  ADD PRIMARY KEY (`sub_file_id`);

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
-- AUTO_INCREMENT for table `tbl_events`
--
ALTER TABLE `tbl_events`
  MODIFY `event_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `tbl_files`
--
ALTER TABLE `tbl_files`
  MODIFY `files_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
--
-- AUTO_INCREMENT for table `tbl_forgotpassword_keys`
--
ALTER TABLE `tbl_forgotpassword_keys`
  MODIFY `forgotpass_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
--
-- AUTO_INCREMENT for table `tbl_notification`
--
ALTER TABLE `tbl_notification`
  MODIFY `notify_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=125;
--
-- AUTO_INCREMENT for table `tbl_notifications`
--
ALTER TABLE `tbl_notifications`
  MODIFY `notification_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `tbl_processed_request`
--
ALTER TABLE `tbl_processed_request`
  MODIFY `process_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `tbl_registration_files`
--
ALTER TABLE `tbl_registration_files`
  MODIFY `registration_files_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `tbl_requested_files`
--
ALTER TABLE `tbl_requested_files`
  MODIFY `requested_file_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=88;
--
-- AUTO_INCREMENT for table `tbl_requests`
--
ALTER TABLE `tbl_requests`
  MODIFY `request_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;
--
-- AUTO_INCREMENT for table `tbl_restricted_user`
--
ALTER TABLE `tbl_restricted_user`
  MODIFY `restricted_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `tbl_subsidiary_files`
--
ALTER TABLE `tbl_subsidiary_files`
  MODIFY `sub_file_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `tbl_users`
--
ALTER TABLE `tbl_users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;
--
-- AUTO_INCREMENT for table `tbl_user_company`
--
ALTER TABLE `tbl_user_company`
  MODIFY `user_company_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
--
-- AUTO_INCREMENT for table `tbl_user_dept_details`
--
ALTER TABLE `tbl_user_dept_details`
  MODIFY `user_dept_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
--
-- AUTO_INCREMENT for table `tbl_user_details`
--
ALTER TABLE `tbl_user_details`
  MODIFY `user_detail_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
