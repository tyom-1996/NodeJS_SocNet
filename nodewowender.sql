/*
 Navicat Premium Data Transfer

 Source Server         : localDB
 Source Server Type    : MySQL
 Source Server Version : 100135
 Source Host           : localhost:3306
 Source Schema         : nodewowender

 Target Server Type    : MySQL
 Target Server Version : 100135
 File Encoding         : 65001

 Date: 27/01/2019 22:26:28
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for followers
-- ----------------------------
DROP TABLE IF EXISTS `followers`;
CREATE TABLE `followers`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NULL DEFAULT NULL,
  `follower_id` int(11) NULL DEFAULT NULL,
  `created_by` timestamp(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  `status` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 281 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of followers
-- ----------------------------
INSERT INTO `followers` VALUES (182, 30, 35, '2019-01-27 22:03:04', '1');
INSERT INTO `followers` VALUES (266, 30, 34, '2019-01-27 22:03:01', '1');
INSERT INTO `followers` VALUES (280, 30, 31, '2019-01-27 22:02:57', '1');

-- ----------------------------
-- Table structure for posts
-- ----------------------------
DROP TABLE IF EXISTS `posts`;
CREATE TABLE `posts`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `post_type` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `post_data` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `created_by` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`, `user_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 57 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of posts
-- ----------------------------
INSERT INTO `posts` VALUES (50, 35, 'music', '{\"data\":[\"public\\\\uploads\\\\upl_music\\\\1548406168986RFNQbcO-file.mp3\"],\"text\":\"\",\"type\":\"music\"}', '2019-01-25 08:49:29');
INSERT INTO `posts` VALUES (51, 35, 'text', '{\"data\":[],\"text\":\"sqsqsqsqsq\",\"type\":\"text\"}', '2019-01-25 08:49:50');
INSERT INTO `posts` VALUES (52, 35, 'text', '{\"data\":[],\"text\":\"sqsqsqsqsqsqsqsqsqq\",\"type\":\"text\"}', '2019-01-25 08:50:29');
INSERT INTO `posts` VALUES (53, 35, 'music', '{\"data\":[\"public\\\\uploads\\\\upl_music\\\\1548406235436pLEX7H3-file.mp3\"],\"text\":\"sqsqq\",\"type\":\"music\"}', '2019-01-25 08:50:35');
INSERT INTO `posts` VALUES (54, 35, 'image', '{\"data\":[\"public\\\\uploads\\\\upl_image\\\\1548406375916PKTQqTM-file.jpg\"],\"text\":\"\",\"type\":\"image\"}', '2019-01-25 08:52:55');
INSERT INTO `posts` VALUES (55, 35, 'text', '{\"data\":[],\"text\":\"sqsqsq\",\"type\":\"text\"}', '2019-01-25 09:09:55');
INSERT INTO `posts` VALUES (56, 30, 'image', '{\"data\":[\"public\\\\uploads\\\\upl_image\\\\1548437431502UaPv9hi-file.jpg\",\"public\\\\uploads\\\\upl_image\\\\1548437431507J8L68Wa-file.jpg\",\"public\\\\uploads\\\\upl_image\\\\1548437431509riUlhge-file.jpg\",\"public\\\\uploads\\\\upl_image\\\\1548437431512YPxsf50-file.jpg\"],\"text\":\"\",\"type\":\"image\"}', '2019-01-25 17:30:31');

-- ----------------------------
-- Table structure for sessions
-- ----------------------------
DROP TABLE IF EXISTS `sessions`;
CREATE TABLE `sessions`  (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL,
  PRIMARY KEY (`session_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of sessions
-- ----------------------------
INSERT INTO `sessions` VALUES ('0UK7RQFtx8MyGhlP8D3DQ0aVM2B7Htt7', 1548630840, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}');
INSERT INTO `sessions` VALUES ('2Urwjvc2jGORVs9Ly7I_8iHyRX46TZAK', 1548629405, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}');
INSERT INTO `sessions` VALUES ('3eKZbx0URPs7auclGYvp9H6ujPX0Z1XD', 1548631235, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}');
INSERT INTO `sessions` VALUES ('7A1sVe8t04xMjqoN7i4Nzl1vLXNb1LL7', 1548629443, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}');
INSERT INTO `sessions` VALUES ('7UJ9Fx2lf-jcnk_x-RyPZ_woNQtklmzj', 1548629405, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}');
INSERT INTO `sessions` VALUES ('Jjgv5EXfzGTCnU99lWipXJQsGO9_eDli', 1548629405, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}');
INSERT INTO `sessions` VALUES ('Kn09XoVGVjYgZLC530N3cPWIOITJ_JZM', 1548629443, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}');
INSERT INTO `sessions` VALUES ('QxHCpmH7FwYMtPkJ4GISAZEgM_I3XX9_', 1548629405, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}');
INSERT INTO `sessions` VALUES ('RsdRxmO_vEylMQR5ad4cubPTCHMepTOs', 1548631236, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"user\":[{\"id\":31,\"name\":\"Poxos\",\"surname\":\"Haxosyan\",\"birthday\":\"\",\"gender\":\"Male\",\"country\":\"\",\"email\":\"poxos@mail.ru\",\"online\":\"yes\",\"profil_photo\":\"images/avatar.jpg\",\"password\":\"sha1$3cbba657$1$0952435e16b4e68de731930ed998e279944741c9\",\"card_photo\":\"images/card_defolt2.jpg\",\"created_by\":null}]}');
INSERT INTO `sessions` VALUES ('TbWqKX3ZASBBnYQvogty3181K5nzmfuX', 1548631235, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}');
INSERT INTO `sessions` VALUES ('WroyGMj5eDv3OWrZ5YdqXMkQFLpcf8Hs', 1548629405, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}');
INSERT INTO `sessions` VALUES ('egS0sbosPlNc7qHRCaJNx99kVhhUvYhh', 1548633735, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"user\":[{\"id\":31,\"name\":\"Poxos\",\"surname\":\"Haxosyan\",\"birthday\":\"\",\"gender\":\"Male\",\"country\":\"\",\"email\":\"poxos@mail.ru\",\"online\":\"yes\",\"profil_photo\":\"images/avatar.jpg\",\"password\":\"sha1$3cbba657$1$0952435e16b4e68de731930ed998e279944741c9\",\"card_photo\":\"images/card_defolt2.jpg\",\"created_by\":null}]}');
INSERT INTO `sessions` VALUES ('f8KfXU8wVcBFf0tNK96BLefnsYuZEDEr', 1548671159, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"user\":[{\"id\":31,\"name\":\"Poxos\",\"surname\":\"Haxosyan\",\"birthday\":\"\",\"gender\":\"Male\",\"country\":\"\",\"email\":\"poxos@mail.ru\",\"online\":\"yes\",\"profil_photo\":\"images/avatar.jpg\",\"password\":\"sha1$3cbba657$1$0952435e16b4e68de731930ed998e279944741c9\",\"card_photo\":\"images/card_defolt2.jpg\",\"created_by\":null}]}');
INSERT INTO `sessions` VALUES ('hIHW1ov93TgWES1fpyMBfLRwsKMCoTzN', 1548629285, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"user\":[{\"id\":31,\"name\":\"Poxos\",\"surname\":\"Haxosyan\",\"birthday\":\"\",\"gender\":\"Male\",\"country\":\"\",\"email\":\"poxos@mail.ru\",\"online\":\"yes\",\"profil_photo\":\"images/avatar.jpg\",\"password\":\"sha1$3cbba657$1$0952435e16b4e68de731930ed998e279944741c9\",\"card_photo\":\"images/card_defolt2.jpg\",\"created_by\":null}]}');
INSERT INTO `sessions` VALUES ('ic_oLzOLO7sDO4TWCRIWcV8JdcHcGMre', 1548699085, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"user\":[{\"id\":30,\"name\":\"Artyom\",\"surname\":\"Hakobjanyan\",\"birthday\":\"\",\"gender\":\"Male\",\"country\":\"\",\"email\":\"artyom@mail.com\",\"online\":\"yes\",\"profil_photo\":\"images/artyom.png\",\"password\":\"sha1$c0b0001e$1$dbc7452038d4b405d87ab53dbb6d99124a211509\",\"card_photo\":\"images/card_defolt.jpg\",\"created_by\":null}]}');
INSERT INTO `sessions` VALUES ('inueuNpFFXZHypGdlU2znucZNbunQgAY', 1548639091, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"user\":[{\"id\":31,\"name\":\"Poxos\",\"surname\":\"Haxosyan\",\"birthday\":\"\",\"gender\":\"Male\",\"country\":\"\",\"email\":\"poxos@mail.ru\",\"online\":\"yes\",\"profil_photo\":\"images/avatar.jpg\",\"password\":\"sha1$3cbba657$1$0952435e16b4e68de731930ed998e279944741c9\",\"card_photo\":\"images/card_defolt2.jpg\",\"created_by\":null}]}');
INSERT INTO `sessions` VALUES ('ixLxjAejcEAsMxouS13zWE0upPKidTtV', 1548698576, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"user\":[{\"id\":31,\"name\":\"Poxos\",\"surname\":\"Haxosyan\",\"birthday\":\"\",\"gender\":\"Male\",\"country\":\"\",\"email\":\"poxos@mail.ru\",\"online\":\"yes\",\"profil_photo\":\"images/avatar.jpg\",\"password\":\"sha1$3cbba657$1$0952435e16b4e68de731930ed998e279944741c9\",\"card_photo\":\"images/card_defolt2.jpg\",\"created_by\":null}]}');
INSERT INTO `sessions` VALUES ('kdQkK1NhR2QU9UgOrUCbBeMoweUqUZ_-', 1548629405, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}');
INSERT INTO `sessions` VALUES ('nKTwD8l2EBKYIhdyUL-wxqBwdLLiRagE', 1548630840, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `surname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `birthday` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `gender` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `country` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `online` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `profil_photo` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `card_photo` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `created_by` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 36 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (30, 'Artyom', 'Hakobjanyan', '', 'Male', '', 'artyom@mail.com', 'yes', 'images/artyom.png', 'sha1$c0b0001e$1$dbc7452038d4b405d87ab53dbb6d99124a211509', 'images/card_defolt.jpg', NULL);
INSERT INTO `users` VALUES (31, 'Poxos', 'Haxosyan', '', 'Male', '', 'poxos@mail.ru', 'yes', 'images/avatar.jpg', 'sha1$3cbba657$1$0952435e16b4e68de731930ed998e279944741c9', 'images/card_defolt2.jpg', NULL);
INSERT INTO `users` VALUES (34, 'Vasya', 'Gudkov', '', 'Male', '', 'vasya@mail.com', 'yes', 'images/defolt-avatar.jpg', 'sha1$34676b08$1$56ae4794cf81fd845ee1d9258cbed1843ae8cbf6', 'images/card_defolt.jpg', '2019-01-23 10:04:02');
INSERT INTO `users` VALUES (35, 'Armen', 'Hakobjanyan', '', 'Male', '', 'armen@mail.com', 'yes', 'images/defolt-avatar.jpg', 'sha1$e20cca73$1$aa4c59e1165f773dea14733a270106ddf7279d8e', 'images/card_defolt.jpg', '2019-01-23 10:34:09');

SET FOREIGN_KEY_CHECKS = 1;
