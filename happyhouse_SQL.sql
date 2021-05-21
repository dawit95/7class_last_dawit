use happyhousetest;

CREATE TABLE `member` (
  `id` varchar(30) NOT NULL,
  `pw` varchar(30) DEFAULT NULL,
  `name` varchar(20) DEFAULT NULL,
  `email` varchar(30) DEFAULT NULL,
  `phone` varchar(30) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `birthdate` varchar(20) DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `regdate` varchar(20) DEFAULT NULL,
  `type` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `board` (
  `no` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) DEFAULT NULL,
  `content` varchar(2000) DEFAULT NULL,
  `postdate` timestamp DEFAULT CURRENT_TIMESTAMP,
  `views` int DEFAULT 0,
  `authorId` varchar(30) NOT NULL,
  `type` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`no`),
  FOREIGN KEY (`authorId`) REFERENCES member(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
