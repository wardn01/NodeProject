-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 08, 2026 at 05:46 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `the_vision_of_light_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `builds`
--

CREATE TABLE `builds` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `weapon_id` int(11) DEFAULT NULL,
  `enemy_id` int(11) DEFAULT NULL,
  `build_name` varchar(100) NOT NULL,
  `points` int(11) DEFAULT 100,
  `hp` int(11) NOT NULL,
  `attack` int(11) NOT NULL,
  `defense` int(11) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `builds`
--

INSERT INTO `builds` (`id`, `user_id`, `weapon_id`, `enemy_id`, `build_name`, `points`, `hp`, `attack`, `defense`, `image`, `created_at`) VALUES
(85, 20, 2, 9, 'cryo #1', 50, 950, 230, 110, '1770562207613.png', '2026-02-08 14:08:02'),
(86, 20, 1, 10, 'cryo #2', 55, 850, 210, 100, '1770561055722.jpg', '2026-02-08 14:08:39'),
(87, 20, 2, 11, 'cryo #3', 65, 400, 230, 70, '1770561059527.jpg', '2026-02-08 14:09:34'),
(88, 21, 2, 5, 'vxm7 #1', 25, 1150, 350, 200, '1770561369413.png', '2026-02-08 14:10:38'),
(90, 21, 3, 5, 'vxm7 #2', 25, 1150, 350, 200, '1770561372539.png', '2026-02-08 14:14:11'),
(91, 21, 3, 1, 'vxm7 #3', 25, 1150, 350, 200, '1770561375329.png', '2026-02-08 14:15:48'),
(92, 21, 1, 7, 'vxm7 #4', 30, 1000, 330, 200, '1770561377957.png', '2026-02-08 14:16:37'),
(93, 22, 4, 1, 'vision #1', 0, 1350, 480, 280, '1770561772886.png', '2026-02-08 14:19:15'),
(94, 22, 4, 2, 'vision #2', 0, 1350, 480, 280, '1770561776959.png', '2026-02-08 14:22:18'),
(95, 22, 3, 3, 'vision #3', 0, 1350, 480, 280, '1770561783126.png', '2026-02-08 14:22:51'),
(96, 23, 2, 11, 'light #1', 60, 700, 220, 70, '1770561915816.png', '2026-02-08 14:24:13'),
(97, 23, 2, 10, 'light #2', 60, 700, 220, 70, '1770561920514.png', '2026-02-08 14:24:38'),
(98, 24, 1, 16, 'player #1', 95, 150, 30, 20, '1770560927954.png', '2026-02-08 14:25:19'),
(99, 24, 1, 14, 'player #2', 95, 150, 30, 20, '1770560939163.png', '2026-02-08 14:25:29'),
(100, 24, 1, 4, 'player #3', 95, 150, 30, 20, '1770560974696.png', '2026-02-08 14:26:00');

-- --------------------------------------------------------

--
-- Table structure for table `enemies`
--

CREATE TABLE `enemies` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `hp` int(11) NOT NULL,
  `attack` int(11) NOT NULL,
  `defense` int(11) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `enemies`
--

INSERT INTO `enemies` (`id`, `name`, `hp`, `attack`, `defense`, `image`, `created_at`) VALUES
(1, 'Shadow Knight', 6510, 465, 415, 'shadow_knight_0.png', '2026-02-07 17:53:00'),
(2, 'Shadow Void', 4510, 350, 290, 'shadow_void_1.png', '2026-02-07 17:53:00'),
(3, 'Shadow Ninja', 3175, 290, 230, 'shadow_ninja_2.png', '2026-02-07 17:53:00'),
(4, 'Shadow Skeleton', 2110, 185, 135, 'shadow_skeleton_3.png', '2026-02-07 17:53:00'),
(5, 'Sand Golem', 3830, 310, 230, 'sand_golem_0.png', '2026-02-07 17:53:00'),
(6, 'Sand Hulk', 2710, 235, 185, 'sand_hulk_1.png', '2026-02-07 17:53:00'),
(7, 'Sand Ninja', 1620, 260, 215, 'sand_ninja_2.png', '2026-02-07 17:53:00'),
(8, 'Sand Wisp', 1160, 160, 125, 'Sand_wisp_3.png', '2026-02-07 17:53:00'),
(9, 'Ice Golem', 1990, 190, 155, 'ice_golem_0.png', '2026-02-07 17:53:00'),
(10, 'Ice Bound', 1360, 165, 135, 'ice_bound_1.png', '2026-02-07 17:53:00'),
(11, 'Ice Ninja', 810, 195, 180, 'ice_ninja_2.png', '2026-02-07 17:53:00'),
(12, 'Ice Imp', 550, 110, 85, 'ice_lmp_3.png', '2026-02-07 17:53:00'),
(13, 'Fire Golem', 910, 100, 65, 'fire_golem_0.png', '2026-02-07 17:53:00'),
(14, 'Fire Magma', 530, 70, 45, 'fire_magma_1.png', '2026-02-07 17:53:00'),
(15, 'Fire Ninja', 340, 80, 80, 'fire_ninja_2.png', '2026-02-07 17:53:00'),
(16, 'Fire Spark', 230, 40, 25, 'fire_spark_3.png', '2026-02-07 17:53:00');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `nickname` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `nickname`, `email`, `password_hash`, `created_at`) VALUES
(20, 'ward', 'cryo', 'ward@gmail.com', '$2b$10$.vY/jsQBXLC.vfX61Pdgm.NTsQN5qD/XsVwhrZ4cmAEp53q5GATLe', '2026-02-08 14:03:46'),
(21, 'mhmd', 'vxm7', 'mhmd@gmail.com', '$2b$10$9cBIb2mbrhzxt4zzoNvxCO1/O/eVEUUIy2kAMtfJGx9ezUBY.jkX2', '2026-02-08 14:04:51'),
(22, 'xiao', 'vision', 'xiao@gmail.com', '$2b$10$dzSWeMlyVrz7.0Z7VCK4buIDA.TF1hK27G/qZuIwkaxll6vpAo1Ya', '2026-02-08 14:05:50'),
(23, 'ganyu', 'light', 'ganyu@gmail.com', '$2b$10$1VRxPiTQE.Jjae/JG7M1fO4.W8O6esJ0/DacQKgJDSj/4Mg5h7w4G', '2026-02-08 14:07:15'),
(24, 'user', 'player', 'user@gmail.com', '$2b$10$WSm4aw4rCa3En9l46TQ.Ne0.0ENq7z8PANoBRbi8Abmpg3Tg8Tuji', '2026-02-08 14:07:47');

-- --------------------------------------------------------

--
-- Table structure for table `weapons`
--

CREATE TABLE `weapons` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `element_type` varchar(50) NOT NULL,
  `base_damage` int(11) DEFAULT 10,
  `description` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `weapons`
--

INSERT INTO `weapons` (`id`, `name`, `element_type`, `base_damage`, `description`, `image`) VALUES
(1, 'Rusty Sword', 'Neutral', 25, 'A basic old sword for beginners.', 'sword_basic.png'),
(2, 'Inferno Sword', 'Fire', 60, 'Burns the target dealing damage over time.', 'sword_fire_1.png'),
(3, 'Glacial Bow', 'Ice', 50, 'Slows down the target movement speed.', 'bow_ice_1.png'),
(4, 'Storm Staff', 'Wind', 55, 'Knocks the target back to keep distance.', 'catalyst_wind_1.png');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `builds`
--
ALTER TABLE `builds`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `weapon_id` (`weapon_id`);

--
-- Indexes for table `enemies`
--
ALTER TABLE `enemies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `weapons`
--
ALTER TABLE `weapons`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `builds`
--
ALTER TABLE `builds`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=109;

--
-- AUTO_INCREMENT for table `enemies`
--
ALTER TABLE `enemies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `weapons`
--
ALTER TABLE `weapons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `builds`
--
ALTER TABLE `builds`
  ADD CONSTRAINT `builds_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `builds_ibfk_2` FOREIGN KEY (`weapon_id`) REFERENCES `weapons` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
