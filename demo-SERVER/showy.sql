-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 2019-11-23 06:21:50
-- 服务器版本： 10.1.28-MariaDB
-- PHP Version: 5.6.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `showy`
--

-- --------------------------------------------------------

--
-- 表的结构 `show_picture`
--

CREATE TABLE `show_picture` (
  `pid` int(11) NOT NULL,
  `uid` int(11) DEFAULT NULL,
  `pdesc` varchar(1000) DEFAULT NULL,
  `psrc` mediumtext,
  `upTime` datetime DEFAULT NULL,
  `pfavour` int(11) DEFAULT '0',
  `pinlunCount` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `show_picture`
--

INSERT INTO `show_picture` (`pid`, `uid`, `pdesc`, `psrc`, `upTime`, `pfavour`, `pinlunCount`) VALUES
(1, 1, '[发现乐人]消愁这杯酒,我想敬给毛不易', 'material/Picture_show/4.jpeg', '2019-11-01 07:34:00', 14, 3),
(2, 3, '明天会更冷', 'material/Picture_show/15.jpeg', '2019-11-15 19:19:00', 4, 2),
(3, 2, '分享歌曲', 'material/Picture_show/12.jpeg', '2019-11-14 11:49:00', 4, 4),
(4, 4, '\"在你眼中我是谁,你想我代替谁\",男女组合OUR翻唱廖峻涛<谁>,很好听呦', 'material/Picture_show/6.jpeg', '2019-11-06 17:12:00', 10, 0),
(5, 1, '回忆杀! 小破团One Direction的MV进化史', 'material/Picture_show/13.jpeg', '2019-11-15 07:22:09', 10, 1),
(6, 9, '今天18时00分，我国在酒泉卫星发射中心用快舟一号甲运载火箭 ，以一箭双星方式成功将全球多媒体卫星系统α阶段A、B卫星发射升空。这也是#快舟一号甲首次一周双箭#，创造我国同一型运载火箭在同一发射场发射间隔最短纪录。转发祝贺！', 'material/Picture_show/11-2.jpg', '2019-11-20 15:22:13', 4, 5),
(7, 11, '一个没有感情的吃饭机器', 'material/Picture_show/20191122091656.jpg|material/Picture_show/20191122091656.jpg|material/Picture_show/20191122091714.jpg|material/Picture_show/20191122091721.jpg', '2019-11-23 13:00:00', 0, 0),
(8, 18, '代码太难了', 'material/Picture_show/4.jpeg|material/Picture_show/6.jpeg|material/Picture_show/7.jpeg|material/Picture_show/8.jpeg|material/Picture_show/11.jpeg', '2019-11-23 11:00:00', 0, 0);

-- --------------------------------------------------------

--
-- 表的结构 `show_p_comment`
--

CREATE TABLE `show_p_comment` (
  `cid` int(11) NOT NULL,
  `uid` int(11) DEFAULT NULL,
  `pid` int(11) DEFAULT NULL,
  `cdetails` varchar(100) DEFAULT NULL,
  `upTime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `show_p_comment`
--

INSERT INTO `show_p_comment` (`cid`, `uid`, `pid`, `cdetails`, `upTime`) VALUES
(1, 4, 3, '毛不易太帅啦', '2019-11-16 10:11:11'),
(2, 2, 1, '巨星不易', '2019-11-15 13:05:07'),
(3, 3, 2, '不怎么冷,也就0下40度', '2019-11-14 06:06:15'),
(4, 1, 1, '太热啦!!', '2019-11-20 16:13:03'),
(5, 1, 3, '好听好听', '2019-11-20 06:04:12'),
(6, 2, 3, '每天叫醒我的不是闹钟，而是梦想。那么，梦想是什么呢？梦想是漫漫寒夜里坚持到天亮的股股暖流；梦想是龋龋前行中勇往直前的灯塔；梦想是滚滚黄尘的沙漠中绿植破土而出的希冀', '2019-11-19 03:10:00'),
(7, 1, 6, '雄起！雄起！！雄起！！！我的中国??', '2019-11-20 19:00:00'),
(8, 3, 6, '爱我中华，五十六个名族一条心', '2019-11-20 18:17:00'),
(9, 3, NULL, '我爱中国', '2019-11-21 00:00:00'),
(10, 4, 6, '中国最棒', '2019-11-20 17:36:48'),
(11, 5, 6, '厉害了', '2019-11-21 01:42:56'),
(12, 3, 5, '好看的滤镜\n', '2019-11-21 01:47:45'),
(13, 3, 1, '毛不易小迷妹', '2019-11-21 01:49:25'),
(14, 1, 6, '为你骄傲祖国妈妈', '2019-11-21 02:06:41'),
(15, 1, 2, '全球降温，冻到发紫', '2019-11-21 02:09:42'),
(16, 1, 3, '好听耶', '2019-11-21 02:10:31');

-- --------------------------------------------------------

--
-- 表的结构 `show_p_zan`
--

CREATE TABLE `show_p_zan` (
  `zid` int(11) NOT NULL,
  `uid` int(11) DEFAULT NULL,
  `pid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `show_p_zan`
--

INSERT INTO `show_p_zan` (`zid`, `uid`, `pid`) VALUES
(1, 1, 1),
(2, 3, 2),
(3, 2, 1),
(4, 2, 3),
(5, 3, 4),
(6, 4, 5),
(7, 1, 2),
(8, 1, 3),
(9, 5, 1),
(10, 7, 6),
(11, 1, 6),
(12, 2, 6),
(13, 3, 6),
(14, 1, 6);

-- --------------------------------------------------------

--
-- 表的结构 `show_user`
--

CREATE TABLE `show_user` (
  `uid` int(11) NOT NULL,
  `uname` varchar(11) DEFAULT NULL,
  `upwd` varchar(16) DEFAULT NULL,
  `sex` int(11) DEFAULT NULL,
  `nickname` varchar(20) DEFAULT NULL,
  `selfdom` varchar(24) DEFAULT NULL,
  `uimg` varchar(32) DEFAULT '01.png',
  `birthday` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `show_user`
--

INSERT INTO `show_user` (`uid`, `uname`, `upwd`, `sex`, `nickname`, `selfdom`, `uimg`, `birthday`) VALUES
(1, '17543039441', '123', 0, '鱼塘老板的猫', '战无不胜', 'material/img_chat/1.jpeg', '1999-10-24'),
(2, '17543039441', '123', 0, '夕阳红', '这是一条个性签名', 'material/img_chat/2.jpeg', '1999-10-24'),
(3, '18856789090', '123', 0, '3号选手', '张志是被风吹散的萝卜头', 'material/img_chat/3.jpeg', '2010-10-24'),
(4, '13456789999', '123', 1, '周杰伦的小迷妹', '张志说他要休息', 'material/img_chat/10.jpeg', '2003-12-14'),
(5, '13588889999', '123', 1, '毛不易', '青青草原是张志的家', 'material/img_chat/6.jpeg', '1999-01-24'),
(6, '13588555599', '123', 0, '小驴', '我是一头小毛驴', 'material/img_chat/4.jpeg', '2010-09-24'),
(7, '17567039441', '123', 1, '阿凡达', 'if i were boy', 'material/img_chat/5.jpeg', '1999-10-21'),
(8, '17500000000', '123', 1, '最闲的咸鱼翻身', '好好学习,天天向上', 'material/img_chat/7.jpeg', '1996-09-01'),
(9, '18567039441', '123', 1, '科学未来人', '科学科普博主', 'material/img_chat/11.jpg', '1995-06-00'),
(10, '13567039441', '123', 1, '及时演讲', '好好学习,天天向上', 'material/img_chat/9.jpeg', '1970-11-09'),
(11, '15567039441', '123', 0, '胖头驴要当学霸', '好好学习,天天向上', 'material/img_chat/8.jpeg', '1990-12-11'),
(12, '17667039012', '123', 1, '素未谋面', '人活着是一种心情', 'material/img_chat/2.jpeg', '1880-12-11'),
(13, '13567039123', '123', 0, '甜味的风', '你不努力，永远不会有人对你公平', 'material/img_chat/3.jpeg', '1996-12-11'),
(14, '13667039451', '123', 1, '天仓优雨', '只有你努力了，有了资源', 'material/img_chat/4.jpeg', '1995-10-11'),
(15, '15267039465', '123', 0, '玉案香痕', '有些事一开始就是错的', 'material/img_chat/6.jpeg', '1994-11-11'),
(16, '17670394445', '123', 1, '落淚成詩', '何必拼了命去在乎', 'material/img_chat/4.jpeg', '1993-10-18'),
(17, '15867039441', '123', 0, '樱色梦乡', '幸福是一个目标，达到就幸福', 'material/img_chat/9.jpeg', '1991-12-17'),
(18, '15867039321', '123', 1, '枫雪粟罂', '过度在意别人的感受就是在严肃的等死', 'material/img_chat/8.jpeg', '1999-10-21'),
(19, '17667039445', '123', 0, '灆色依恋', '聪明是一种天赋，而善良是一种选择', 'material/img_chat/10.jpeg', '2000-10-11');

-- --------------------------------------------------------

--
-- 表的结构 `show_video`
--

CREATE TABLE `show_video` (
  `vid` int(11) NOT NULL,
  `uid` int(11) DEFAULT NULL,
  `vdesc` varchar(1000) DEFAULT NULL,
  `vsrc` varchar(32) DEFAULT NULL,
  `upTime` bigint(20) DEFAULT NULL,
  `vfavour` int(11) DEFAULT '0',
  `cid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `show_video`
--

INSERT INTO `show_video` (`vid`, `uid`, `vdesc`, `vsrc`, `upTime`, `vfavour`, `cid`) VALUES
(3, 1, '[发现乐人]消愁这杯酒,我想敬给毛不易', 'material/video/jay.mp4', 806, 3, 1),
(4, 1, '\"在你眼中我是谁,你想我代替谁\",男女组合OUR翻唱廖峻涛<谁>,很好听呦', 'material/video/jay.mp4', 908, 0, 4),
(5, 1, '明天会更冷', 'material/video/maobuyi.mp4', 1111, 4, 2),
(6, 1, '回忆杀! 小破团One Direction的MV进化史', 'material/video/x.mp4', 1110, 4, 1),
(7, 2, '分享歌曲', 'material/video/jay.mp4', 810, 4, 2);

-- --------------------------------------------------------

--
-- 表的结构 `show_v_comment`
--

CREATE TABLE `show_v_comment` (
  `cid` int(11) NOT NULL,
  `uid` int(11) DEFAULT NULL,
  `vid` int(11) DEFAULT NULL,
  `cdetails` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `show_v_comment`
--

INSERT INTO `show_v_comment` (`cid`, `uid`, `vid`, `cdetails`) VALUES
(5, 4, 3, '好听好听'),
(8, 4, 3, '毛不易太帅啦'),
(9, 2, 4, '巨星不易'),
(10, 3, 5, '不怎么冷,也就0下40度'),
(11, 1, 6, '太热啦!!'),
(12, 3, 7, '不怎么冷,也就0下40度'),
(13, 4, 3, '毛不易太帅啦'),
(14, 2, 4, '巨星不易'),
(15, 3, 7, '不怎么冷,也就0下40度'),
(16, 1, 6, '太热啦!!'),
(17, 4, 3, '好听好听'),
(18, 2, 3, '每天叫醒我的不是闹钟，而是梦想。那么，梦想是什么呢？梦想是漫漫寒夜里坚持到天亮的股股暖流；梦想是龋龋前行中勇往直前的灯塔；梦想是滚滚黄尘的沙漠中绿植破土而出的希冀'),
(19, 1, 6, '雄起！雄起！！雄起！！！我的中国????'),
(20, 3, 6, '爱我中华，五十六个名族一条心');

-- --------------------------------------------------------

--
-- 表的结构 `user_collect`
--

CREATE TABLE `user_collect` (
  `ucid` int(11) NOT NULL,
  `uid` int(11) DEFAULT NULL,
  `pid` int(11) DEFAULT NULL,
  `vid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `user_collect`
--

INSERT INTO `user_collect` (`ucid`, `uid`, `pid`, `vid`) VALUES
(1, 1, 3, 3),
(2, 1, 2, 4),
(3, 1, 5, 5),
(4, 1, 4, 6);

-- --------------------------------------------------------

--
-- 表的结构 `user_like`
--

CREATE TABLE `user_like` (
  `ulid` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `like_uid` int(11) NOT NULL,
  `like_both` int(11) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `user_like`
--

INSERT INTO `user_like` (`ulid`, `uid`, `like_uid`, `like_both`) VALUES
(1, 1, 2, 1),
(2, 1, 3, 0),
(3, 1, 4, 1),
(4, 1, 5, 0),
(5, 2, 1, 1),
(6, 2, 3, 0),
(7, 3, 4, 1),
(11, 4, 1, 1),
(8, 4, 3, 1),
(9, 4, 6, 0),
(10, 6, 1, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `show_picture`
--
ALTER TABLE `show_picture`
  ADD PRIMARY KEY (`pid`),
  ADD KEY `uid` (`uid`);

--
-- Indexes for table `show_p_comment`
--
ALTER TABLE `show_p_comment`
  ADD PRIMARY KEY (`cid`),
  ADD KEY `pid` (`pid`);

--
-- Indexes for table `show_p_zan`
--
ALTER TABLE `show_p_zan`
  ADD PRIMARY KEY (`zid`),
  ADD KEY `pid` (`pid`);

--
-- Indexes for table `show_user`
--
ALTER TABLE `show_user`
  ADD PRIMARY KEY (`uid`);

--
-- Indexes for table `show_video`
--
ALTER TABLE `show_video`
  ADD PRIMARY KEY (`vid`),
  ADD KEY `cid` (`cid`),
  ADD KEY `uid` (`uid`);

--
-- Indexes for table `show_v_comment`
--
ALTER TABLE `show_v_comment`
  ADD PRIMARY KEY (`cid`),
  ADD KEY `vid` (`vid`);

--
-- Indexes for table `user_collect`
--
ALTER TABLE `user_collect`
  ADD PRIMARY KEY (`ucid`),
  ADD UNIQUE KEY `pid` (`pid`),
  ADD UNIQUE KEY `vid` (`vid`);

--
-- Indexes for table `user_like`
--
ALTER TABLE `user_like`
  ADD PRIMARY KEY (`uid`,`like_uid`),
  ADD UNIQUE KEY `ulid` (`ulid`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `show_picture`
--
ALTER TABLE `show_picture`
  MODIFY `pid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- 使用表AUTO_INCREMENT `show_p_comment`
--
ALTER TABLE `show_p_comment`
  MODIFY `cid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- 使用表AUTO_INCREMENT `show_p_zan`
--
ALTER TABLE `show_p_zan`
  MODIFY `zid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- 使用表AUTO_INCREMENT `show_user`
--
ALTER TABLE `show_user`
  MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- 使用表AUTO_INCREMENT `show_video`
--
ALTER TABLE `show_video`
  MODIFY `vid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- 使用表AUTO_INCREMENT `show_v_comment`
--
ALTER TABLE `show_v_comment`
  MODIFY `cid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- 使用表AUTO_INCREMENT `user_collect`
--
ALTER TABLE `user_collect`
  MODIFY `ucid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- 使用表AUTO_INCREMENT `user_like`
--
ALTER TABLE `user_like`
  MODIFY `ulid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- 限制导出的表
--

--
-- 限制表 `show_picture`
--
ALTER TABLE `show_picture`
  ADD CONSTRAINT `show_picture_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `show_user` (`uid`);

--
-- 限制表 `show_p_comment`
--
ALTER TABLE `show_p_comment`
  ADD CONSTRAINT `show_p_comment_ibfk_1` FOREIGN KEY (`pid`) REFERENCES `show_picture` (`pid`);

--
-- 限制表 `show_p_zan`
--
ALTER TABLE `show_p_zan`
  ADD CONSTRAINT `show_p_zan_ibfk_1` FOREIGN KEY (`pid`) REFERENCES `show_picture` (`pid`);

--
-- 限制表 `show_video`
--
ALTER TABLE `show_video`
  ADD CONSTRAINT `show_video_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `show_user` (`uid`);

--
-- 限制表 `show_v_comment`
--
ALTER TABLE `show_v_comment`
  ADD CONSTRAINT `show_v_comment_ibfk_1` FOREIGN KEY (`vid`) REFERENCES `show_video` (`vid`);

--
-- 限制表 `user_collect`
--
ALTER TABLE `user_collect`
  ADD CONSTRAINT `user_collect_ibfk_1` FOREIGN KEY (`pid`) REFERENCES `show_picture` (`pid`),
  ADD CONSTRAINT `user_collect_ibfk_2` FOREIGN KEY (`vid`) REFERENCES `show_video` (`vid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
