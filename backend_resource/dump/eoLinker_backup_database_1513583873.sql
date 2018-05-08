/*
eoLinker MySQL Data Transfer

Source Host     :localhost:3306
Source Database :eolinker_os
Date            :2017-12-18 15:57:53

*/

-- ----------------------------
-- Table structure for eo_api
-- ----------------------------
DROP TABLE IF EXISTS `eo_api`;
CREATE TABLE `eo_api` (
  `apiID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `apiName` varchar(255) COLLATE utf8_bin NOT NULL,
  `apiURI` varchar(255) COLLATE utf8_bin NOT NULL,
  `apiProtocol` tinyint(1) unsigned NOT NULL,
  `apiFailureMock` text COLLATE utf8_bin,
  `apiSuccessMock` text COLLATE utf8_bin,
  `apiRequestType` tinyint(1) unsigned NOT NULL,
  `apiSuccessMockType` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `apiFailureMockType` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `apiStatus` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `apiUpdateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `groupID` int(11) unsigned NOT NULL,
  `projectID` int(11) unsigned NOT NULL,
  `starred` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `removed` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `removeTime` timestamp NULL DEFAULT NULL,
  `apiNoteType` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `apiNoteRaw` text COLLATE utf8_bin,
  `apiNote` text COLLATE utf8_bin,
  `apiRequestParamType` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `apiRequestRaw` text COLLATE utf8_bin,
  `updateUserID` int(11) NOT NULL DEFAULT '0',
  `mockRule` text COLLATE utf8_bin,
  `mockResult` text COLLATE utf8_bin,
  `mockConfig` text COLLATE utf8_bin,
  PRIMARY KEY (`apiID`,`groupID`,`apiURI`),
  KEY `groupID` (`groupID`),
  KEY `apiID` (`apiID`),
  KEY `projectID` (`projectID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of eo_api
-- ----------------------------
INSERT INTO `eo_api` VALUES ('1','示例接口','www.eoapi.cn/api/demo','0','','{\"type\":\"demo\",\"status\":\"success\",\"desc\":\"这是返回结果的示例，您可以在此记录您的接口的返回值示例，方便对接人员查看。同时我们提供了多种格式整理功能，您只需要轻轻一点即可得到美化版本的返回结果，非常方便！\"}','0','0','0','0','2016-11-08 23:04:48','2','1','0','0','','1','####  我可以使用富文本或者markdown编辑器去进行备注的写作。','&lt;h4 id=&quot;h4--markdown-&quot;&gt;&lt;a name=&quot;我可以使用富文本或者markdown编辑器去进行备注的写作。&quot; class=&quot;reference-link&quot;&gt;&lt;/a&gt;&lt;span class=&quot;header-link octicon octicon-link&quot;&gt;&lt;/span&gt;我可以使用富文本或者markdown编辑器去进行备注的写作。&lt;/h4&gt;','0','','0','','','');
INSERT INTO `eo_api` VALUES ('2','te\'stew\'we\'t\'we\'t\'we\'t','teste','0','','','0','0','0','0','2017-12-18 15:05:33','2','1','0','0','','0','','','0','','1','[{\"paramKey\":\"\",\"paramType\":\"0\",\"$index\":0}]','{}','{\"rule\":\"\",\"type\":\"object\"}');

-- ----------------------------
-- Table structure for eo_api_cache
-- ----------------------------
DROP TABLE IF EXISTS `eo_api_cache`;
CREATE TABLE `eo_api_cache` (
  `cacheID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `projectID` int(10) unsigned NOT NULL,
  `groupID` int(10) unsigned NOT NULL,
  `apiID` int(10) unsigned NOT NULL,
  `apiJson` longtext NOT NULL,
  `starred` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `updateUserID` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`cacheID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of eo_api_cache
-- ----------------------------
INSERT INTO `eo_api_cache` VALUES ('1','1','2','1','{\"baseInfo\":{\"apiID\":623,\"apiName\":\"\\u793a\\u4f8b\\u63a5\\u53e3\",\"apiURI\":\"www.eoapi.cn\\/api\\/demo\",\"apiProtocol\":0,\"apiFailureMock\":\"\",\"apiSuccessMock\":\"{\\\"type\\\":\\\"demo\\\",\\\"status\\\":\\\"success\\\",\\\"desc\\\":\\\"\\u8fd9\\u662f\\u8fd4\\u56de\\u7ed3\\u679c\\u7684\\u793a\\u4f8b\\uff0c\\u60a8\\u53ef\\u4ee5\\u5728\\u6b64\\u8bb0\\u5f55\\u60a8\\u7684\\u63a5\\u53e3\\u7684\\u8fd4\\u56de\\u503c\\u793a\\u4f8b\\uff0c\\u65b9\\u4fbf\\u5bf9\\u63a5\\u4eba\\u5458\\u67e5\\u770b\\u3002\\u540c\\u65f6\\u6211\\u4eec\\u63d0\\u4f9b\\u4e86\\u591a\\u79cd\\u683c\\u5f0f\\u6574\\u7406\\u529f\\u80fd\\uff0c\\u60a8\\u53ea\\u9700\\u8981\\u8f7b\\u8f7b\\u4e00\\u70b9\\u5373\\u53ef\\u5f97\\u5230\\u7f8e\\u5316\\u7248\\u672c\\u7684\\u8fd4\\u56de\\u7ed3\\u679c\\uff0c\\u975e\\u5e38\\u65b9\\u4fbf\\uff01\\\"}\",\"apiRequestType\":0,\"apiStatus\":0,\"apiUpdateTime\":\"2016-11-08 23:04:48\",\"groupID\":275,\"projectID\":582,\"starred\":0,\"removed\":0,\"removeTime\":null,\"apiNoteType\":1,\"apiNoteRaw\":\"####  \\u6211\\u53ef\\u4ee5\\u4f7f\\u7528\\u5bcc\\u6587\\u672c\\u6216\\u8005markdown\\u7f16\\u8f91\\u5668\\u53bb\\u8fdb\\u884c\\u5907\\u6ce8\\u7684\\u5199\\u4f5c\\u3002\",\"apiNote\":\"&lt;h4 id=&quot;h4--markdown-&quot;&gt;&lt;a name=&quot;\\u6211\\u53ef\\u4ee5\\u4f7f\\u7528\\u5bcc\\u6587\\u672c\\u6216\\u8005markdown\\u7f16\\u8f91\\u5668\\u53bb\\u8fdb\\u884c\\u5907\\u6ce8\\u7684\\u5199\\u4f5c\\u3002&quot; class=&quot;reference-link&quot;&gt;&lt;\\/a&gt;&lt;span class=&quot;header-link octicon octicon-link&quot;&gt;&lt;\\/span&gt;\\u6211\\u53ef\\u4ee5\\u4f7f\\u7528\\u5bcc\\u6587\\u672c\\u6216\\u8005markdown\\u7f16\\u8f91\\u5668\\u53bb\\u8fdb\\u884c\\u5907\\u6ce8\\u7684\\u5199\\u4f5c\\u3002&lt;\\/h4&gt;\",\"apiRequestParamType\":0,\"apiRequestRaw\":\"\",\"mockCode\":\"AbKWQJuEZqQni9Hdpz2wYVEGl9qavDj2\"},\"headerInfo\":[{\"headerID\":562,\"headerName\":\"Accept-Encoding\",\"headerValue\":\"compress, gzip\"},{\"headerID\":563,\"headerName\":\"\\u8bf7\\u6c42\\u5934\\u90e8\\u7684\\u6807\\u7b7e\",\"headerValue\":\"\\u8fd9\\u91cc\\u53ef\\u4ee5\\u8bb0\\u5f55\\u5b8c\\u6574\\u7684\\u5934\\u90e8\\u4fe1\\u606f\"}],\"requestInfo\":[{\"paramID\":11288,\"paramName\":\"\\u53c2\\u6570\\u793a\\u4f8b1\",\"paramKey\":\"param1\",\"paramType\":0,\"paramLimit\":\"\\u6570\\u5b57\\u3001\\u82f1\\u6587\\u3001\\u4e0b\\u5212\\u7ebf\",\"paramValue\":\"eoapi_2016\",\"paramNotNull\":0,\"paramValueList\":[]},{\"paramID\":11289,\"paramName\":\"\\u53c2\\u6570\\u793a\\u4f8b2\",\"paramKey\":\"param2\",\"paramType\":0,\"paramLimit\":\"\\u8fd9\\u91cc\\u53ef\\u4ee5\\u8bb0\\u5f55\\u53c2\\u6570\\u7684\\u9650\\u5236\\u6761\\u4ef6\\uff0c\\u6bd4\\u59820~3\\u7684\\u6570\\u5b57\",\"paramValue\":\"0\",\"paramNotNull\":1,\"paramValueList\":[{\"valueID\":1562,\"value\":\"0\",\"valueDescription\":\"\\u53ef\\u80fd1\\uff0c\\u4ee3\\u8868x\"},{\"valueID\":1563,\"value\":\"1\",\"valueDescription\":\"\\u53ef\\u80fd2\\uff0c\\u4ee3\\u8868y\"},{\"valueID\":1564,\"value\":\"2\",\"valueDescription\":\"\\u53ef\\u80fd3\\uff0c\\u4ee3\\u8868z\"},{\"valueID\":1565,\"value\":\"3\",\"valueDescription\":\"\\u53ef\\u80fd4\\uff0c\\u4ee3\\u8868\\u03b1\"}]},{\"paramID\":11290,\"paramName\":\"\\u4e8c\\u7ea7\\u53c2\\u6570\\u793a\\u4f8b\",\"paramKey\":\"param2>>param3\",\"paramType\":0,\"paramLimit\":\"\",\"paramValue\":\"\",\"paramNotNull\":0,\"paramValueList\":[]}],\"resultInfo\":[{\"paramID\":10665,\"paramKey\":\"desc\",\"paramName\":\"\\u8bf4\\u660e\",\"paramNotNull\":1,\"paramValueList\":[{\"valueID\":9352,\"value\":\"*\",\"valueDescription\":\"\\u4f60\\u6ce8\\u610f\\u5230\\u4e86\\u4e48\\uff0c\\u8fd9\\u662f\\u4e00\\u4e2a\\u201c\\u975e\\u5fc5\\u542b\\u201d\\u7684\\u8fd4\\u56de\\u7ed3\\u679c\\uff0ceoapi\\u751a\\u81f3\\u53ef\\u4ee5\\u8bb0\\u5f55\\u8fd4\\u56de\\u7ed3\\u679c\\u662f\\u5426\\u8fd4\\u56de\\uff01\"}]},{\"paramID\":10666,\"paramKey\":\"status\",\"paramName\":\"\\u63a5\\u53e3\\u8bf7\\u6c42\\u72b6\\u6001\",\"paramNotNull\":0,\"paramValueList\":[{\"valueID\":9353,\"value\":\"error\",\"valueDescription\":\"\\u9519\\u8bef\"},{\"valueID\":9354,\"value\":\"failure\",\"valueDescription\":\"\\u5931\\u8d25\"},{\"valueID\":9355,\"value\":\"success\",\"valueDescription\":\"\\u6210\\u529f\\uff0c\\u4e0d\\u4ec5\\u8bf7\\u6c42\\u7684\\u53c2\\u6570\\u53ef\\u4ee5\\u8bb0\\u5f55\\u53ef\\u80fd\\u6027\\uff0c\\u8fde\\u8fd4\\u56de\\u503c\\u7684\\u4e5f\\u53ef\\u4ee5\\u8bb0\\u5f55\\u53ef\\u80fd\\u6027\\uff01\"}]},{\"paramID\":10667,\"paramKey\":\"type\",\"paramName\":\"\\u63a5\\u53e3\\u7c7b\\u578b\",\"paramNotNull\":0,\"paramValueList\":[{\"valueID\":9356,\"value\":\"demo\",\"valueDescription\":\"\"}]},{\"paramID\":10668,\"paramKey\":\"type::secondType\",\"paramName\":\"\\u4e8c\\u7ea7\\u8fd4\\u56de\\u7ed3\\u679c\\u793a\\u4f8b\",\"paramNotNull\":0,\"paramValueList\":[{\"valueID\":9357,\"value\":\"0\",\"valueDescription\":\"success\"},{\"valueID\":9358,\"value\":\"1\",\"valueDescription\":\"failure\"}]}]}','0','0');
INSERT INTO `eo_api_cache` VALUES ('2','1','2','2','{\"baseInfo\":{\"apiName\":\"te\'stew\'we\'t\'we\'t\'we\'t\",\"apiURI\":\"teste\",\"apiProtocol\":0,\"apiSuccessMock\":\"\",\"apiFailureMock\":\"\",\"apiRequestType\":0,\"apiStatus\":0,\"starred\":0,\"apiNoteType\":0,\"apiNoteRaw\":\"\",\"apiNote\":\"\",\"apiRequestParamType\":0,\"apiRequestRaw\":\"\",\"apiUpdateTime\":\"2017-12-18 15:05:33\"},\"headerInfo\":[],\"mockInfo\":{\"mockRule\":[{\"paramKey\":\"\",\"paramType\":\"0\",\"$index\":0}],\"mockResult\":\"{}\",\"mockConfig\":{\"rule\":\"\",\"type\":\"object\"}},\"requestInfo\":[],\"resultInfo\":[]}','0','1');

-- ----------------------------
-- Table structure for eo_api_env
-- ----------------------------
DROP TABLE IF EXISTS `eo_api_env`;
CREATE TABLE `eo_api_env` (
  `envID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `envName` varchar(255) NOT NULL,
  `projectID` int(10) unsigned NOT NULL,
  PRIMARY KEY (`envID`,`projectID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of eo_api_env
-- ----------------------------
INSERT INTO `eo_api_env` VALUES ('1','test','1');

-- ----------------------------
-- Table structure for eo_api_env_front_uri
-- ----------------------------
DROP TABLE IF EXISTS `eo_api_env_front_uri`;
CREATE TABLE `eo_api_env_front_uri` (
  `envID` int(10) unsigned NOT NULL,
  `uri` varchar(255) NOT NULL,
  `uriID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `applyProtocol` varchar(4) NOT NULL DEFAULT '-1',
  PRIMARY KEY (`uriID`,`envID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of eo_api_env_front_uri
-- ----------------------------
INSERT INTO `eo_api_env_front_uri` VALUES ('1','test','1','-1');

-- ----------------------------
-- Table structure for eo_api_env_header
-- ----------------------------
DROP TABLE IF EXISTS `eo_api_env_header`;
CREATE TABLE `eo_api_env_header` (
  `headerID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `envID` int(11) NOT NULL,
  `applyProtocol` varchar(255) DEFAULT NULL,
  `headerName` varchar(255) NOT NULL,
  `headerValue` text NOT NULL,
  PRIMARY KEY (`headerID`,`envID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of eo_api_env_header
-- ----------------------------
INSERT INTO `eo_api_env_header` VALUES ('1','1','-1','test','tes');
INSERT INTO `eo_api_env_header` VALUES ('2','1','-1','tes','set');

-- ----------------------------
-- Table structure for eo_api_env_param
-- ----------------------------
DROP TABLE IF EXISTS `eo_api_env_param`;
CREATE TABLE `eo_api_env_param` (
  `paramID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `envID` int(10) unsigned NOT NULL,
  `paramKey` varchar(255) NOT NULL,
  `paramValue` text NOT NULL,
  PRIMARY KEY (`paramID`,`envID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of eo_api_env_param
-- ----------------------------
INSERT INTO `eo_api_env_param` VALUES ('1','1','sets','ets');
INSERT INTO `eo_api_env_param` VALUES ('2','1','et','setset');

-- ----------------------------
-- Table structure for eo_api_group
-- ----------------------------
DROP TABLE IF EXISTS `eo_api_group`;
CREATE TABLE `eo_api_group` (
  `groupID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `groupName` varchar(30) COLLATE utf8_bin NOT NULL,
  `projectID` int(11) unsigned NOT NULL,
  `parentGroupID` int(10) unsigned NOT NULL DEFAULT '0',
  `isChild` tinyint(3) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`groupID`,`projectID`),
  KEY `groupID` (`groupID`),
  KEY `projectID` (`projectID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of eo_api_group
-- ----------------------------
INSERT INTO `eo_api_group` VALUES ('1','demo','1','0','0');
INSERT INTO `eo_api_group` VALUES ('2','t\'s\'t','1','0','0');

-- ----------------------------
-- Table structure for eo_api_group_order
-- ----------------------------
DROP TABLE IF EXISTS `eo_api_group_order`;
CREATE TABLE `eo_api_group_order` (
  `orderID` int(11) NOT NULL AUTO_INCREMENT,
  `projectID` int(11) NOT NULL,
  `orderList` text,
  PRIMARY KEY (`orderID`,`projectID`),
  UNIQUE KEY `projectID` (`projectID`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of eo_api_group_order
-- ----------------------------

-- ----------------------------
-- Table structure for eo_api_header
-- ----------------------------
DROP TABLE IF EXISTS `eo_api_header`;
CREATE TABLE `eo_api_header` (
  `headerID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `headerName` varchar(255) NOT NULL,
  `headerValue` tinytext NOT NULL,
  `apiID` int(10) unsigned NOT NULL,
  PRIMARY KEY (`headerID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of eo_api_header
-- ----------------------------
INSERT INTO `eo_api_header` VALUES ('1','Accept-Encoding','compress, gzip','1');
INSERT INTO `eo_api_header` VALUES ('2','请求头部的标签','这里可以记录完整的头部信息','1');

-- ----------------------------
-- Table structure for eo_api_history
-- ----------------------------
DROP TABLE IF EXISTS `eo_api_history`;
CREATE TABLE `eo_api_history` (
  `historyID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `projectID` int(10) unsigned NOT NULL,
  `groupID` int(10) unsigned NOT NULL,
  `apiID` int(10) unsigned NOT NULL,
  `historyJson` longtext NOT NULL,
  `updateDesc` varchar(150) NOT NULL,
  `updateUserID` int(10) unsigned NOT NULL,
  `updateTime` datetime NOT NULL,
  `isNow` tinyint(3) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`historyID`,`apiID`,`updateTime`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of eo_api_history
-- ----------------------------
INSERT INTO `eo_api_history` VALUES ('1','1','1','2','{\"baseInfo\":{\"apiName\":\"te\'stew\'we\'t\'we\'t\'we\'t\",\"apiURI\":\"teste\",\"apiProtocol\":0,\"apiSuccessMock\":\"\",\"apiFailureMock\":\"\",\"apiRequestType\":0,\"apiStatus\":0,\"starred\":0,\"apiNoteType\":0,\"apiNoteRaw\":\"\",\"apiNote\":\"\",\"apiRequestParamType\":0,\"apiRequestRaw\":\"\",\"apiUpdateTime\":\"2017-12-18 15:05:33\"},\"headerInfo\":[],\"mockInfo\":{\"mockRule\":[{\"paramKey\":\"\",\"paramType\":\"0\",\"$index\":0}],\"mockResult\":\"{}\",\"mockConfig\":{\"rule\":\"\",\"type\":\"object\"}},\"requestInfo\":[],\"resultInfo\":[]}','创建API','1','2017-12-18 15:05:33','1');

-- ----------------------------
-- Table structure for eo_api_request_param
-- ----------------------------
DROP TABLE IF EXISTS `eo_api_request_param`;
CREATE TABLE `eo_api_request_param` (
  `paramID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `paramName` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `paramKey` varchar(255) COLLATE utf8_bin NOT NULL,
  `paramValue` text COLLATE utf8_bin NOT NULL,
  `paramType` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `paramLimit` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `apiID` int(10) unsigned NOT NULL,
  `paramNotNull` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`paramID`),
  KEY `apiID` (`apiID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of eo_api_request_param
-- ----------------------------
INSERT INTO `eo_api_request_param` VALUES ('1','参数示例1','param1','eoapi_2016','0','数字、英文、下划线','1','0');
INSERT INTO `eo_api_request_param` VALUES ('2','参数示例2','param2','0','0','这里可以记录参数的限制条件，比如0~3的数字','1','1');
INSERT INTO `eo_api_request_param` VALUES ('3','二级参数示例','param2>>param3','','0','','1','0');

-- ----------------------------
-- Table structure for eo_api_request_value
-- ----------------------------
DROP TABLE IF EXISTS `eo_api_request_value`;
CREATE TABLE `eo_api_request_value` (
  `valueID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `value` varchar(255) DEFAULT NULL,
  `valueDescription` varchar(255) DEFAULT NULL,
  `paramID` int(10) unsigned NOT NULL,
  PRIMARY KEY (`valueID`),
  KEY `paramID` (`paramID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of eo_api_request_value
-- ----------------------------
INSERT INTO `eo_api_request_value` VALUES ('1','0','可能1，代表x','2');
INSERT INTO `eo_api_request_value` VALUES ('2','1','可能2，代表y','2');
INSERT INTO `eo_api_request_value` VALUES ('3','2','可能3，代表z','2');
INSERT INTO `eo_api_request_value` VALUES ('4','3','可能4，代表α','2');

-- ----------------------------
-- Table structure for eo_api_result_param
-- ----------------------------
DROP TABLE IF EXISTS `eo_api_result_param`;
CREATE TABLE `eo_api_result_param` (
  `paramID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `paramName` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `paramKey` varchar(255) COLLATE utf8_bin NOT NULL,
  `apiID` int(11) unsigned NOT NULL,
  `paramNotNull` tinyint(1) unsigned NOT NULL,
  PRIMARY KEY (`paramID`),
  KEY `apiID` (`apiID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of eo_api_result_param
-- ----------------------------
INSERT INTO `eo_api_result_param` VALUES ('1','说明','desc','1','1');
INSERT INTO `eo_api_result_param` VALUES ('2','接口请求状态','status','1','0');
INSERT INTO `eo_api_result_param` VALUES ('3','接口类型','type','1','0');
INSERT INTO `eo_api_result_param` VALUES ('4','二级返回结果示例','type::secondType','1','0');

-- ----------------------------
-- Table structure for eo_api_result_value
-- ----------------------------
DROP TABLE IF EXISTS `eo_api_result_value`;
CREATE TABLE `eo_api_result_value` (
  `valueID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `value` text COLLATE utf8_bin NOT NULL,
  `valueDescription` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `paramID` int(10) unsigned NOT NULL,
  PRIMARY KEY (`valueID`),
  KEY `resultParamID` (`paramID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of eo_api_result_value
-- ----------------------------
INSERT INTO `eo_api_result_value` VALUES ('1','*','你注意到了么，这是一个“非必含”的返回结果，eoapi甚至可以记录返回结果是否返回！','1');
INSERT INTO `eo_api_result_value` VALUES ('2','error','错误','2');
INSERT INTO `eo_api_result_value` VALUES ('3','failure','失败','2');
INSERT INTO `eo_api_result_value` VALUES ('4','success','成功，不仅请求的参数可以记录可能性，连返回值的也可以记录可能性！','2');
INSERT INTO `eo_api_result_value` VALUES ('5','demo','','3');
INSERT INTO `eo_api_result_value` VALUES ('6','0','success','4');
INSERT INTO `eo_api_result_value` VALUES ('7','1','failure','4');

-- ----------------------------
-- Table structure for eo_api_status_code_group_order
-- ----------------------------
DROP TABLE IF EXISTS `eo_api_status_code_group_order`;
CREATE TABLE `eo_api_status_code_group_order` (
  `orderID` int(11) NOT NULL AUTO_INCREMENT,
  `projectID` int(11) NOT NULL,
  `orderList` text NOT NULL,
  PRIMARY KEY (`orderID`,`projectID`),
  UNIQUE KEY `projectID` (`projectID`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of eo_api_status_code_group_order
-- ----------------------------

-- ----------------------------
-- Table structure for eo_api_test_history
-- ----------------------------
DROP TABLE IF EXISTS `eo_api_test_history`;
CREATE TABLE `eo_api_test_history` (
  `testID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `apiID` int(10) unsigned NOT NULL,
  `requestInfo` longtext,
  `resultInfo` longtext,
  `testTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `projectID` int(10) unsigned NOT NULL,
  PRIMARY KEY (`testID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of eo_api_test_history
-- ----------------------------

-- ----------------------------
-- Table structure for eo_conn_database
-- ----------------------------
DROP TABLE IF EXISTS `eo_conn_database`;
CREATE TABLE `eo_conn_database` (
  `connID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `dbID` int(10) unsigned NOT NULL,
  `userID` int(10) unsigned NOT NULL,
  `userType` tinyint(1) NOT NULL DEFAULT '0',
  `inviteUserID` int(10) DEFAULT NULL,
  `partnerNickName` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`connID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of eo_conn_database
-- ----------------------------

-- ----------------------------
-- Table structure for eo_conn_project
-- ----------------------------
DROP TABLE IF EXISTS `eo_conn_project`;
CREATE TABLE `eo_conn_project` (
  `connID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `projectID` int(11) unsigned NOT NULL,
  `userID` int(11) unsigned NOT NULL,
  `userType` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `inviteUserID` int(11) DEFAULT NULL,
  `partnerNickName` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`connID`,`projectID`,`userID`),
  KEY `projectID` (`projectID`),
  KEY `eo_conn_ibfk_2` (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of eo_conn_project
-- ----------------------------
INSERT INTO `eo_conn_project` VALUES ('1','1','1','0','','');

-- ----------------------------
-- Table structure for eo_database
-- ----------------------------
DROP TABLE IF EXISTS `eo_database`;
CREATE TABLE `eo_database` (
  `dbID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `dbName` varchar(255) NOT NULL,
  `dbVersion` float unsigned NOT NULL,
  `dbUpdateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`dbID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of eo_database
-- ----------------------------

-- ----------------------------
-- Table structure for eo_database_table
-- ----------------------------
DROP TABLE IF EXISTS `eo_database_table`;
CREATE TABLE `eo_database_table` (
  `dbID` int(10) unsigned NOT NULL,
  `tableID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `tableName` varchar(255) NOT NULL,
  `tableDescription` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`tableID`,`dbID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of eo_database_table
-- ----------------------------

-- ----------------------------
-- Table structure for eo_database_table_field
-- ----------------------------
DROP TABLE IF EXISTS `eo_database_table_field`;
CREATE TABLE `eo_database_table_field` (
  `fieldID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `fieldName` varchar(255) NOT NULL,
  `fieldType` varchar(10) NOT NULL,
  `fieldLength` varchar(10) NOT NULL,
  `isNotNull` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `isPrimaryKey` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `fieldDescription` varchar(255) DEFAULT NULL,
  `tableID` int(10) unsigned NOT NULL,
  `defaultValue` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`fieldID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of eo_database_table_field
-- ----------------------------

-- ----------------------------
-- Table structure for eo_log_project_operation
-- ----------------------------
DROP TABLE IF EXISTS `eo_log_project_operation`;
CREATE TABLE `eo_log_project_operation` (
  `opID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `opType` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `opUserID` int(10) unsigned NOT NULL,
  `opDesc` text NOT NULL,
  `opTime` datetime NOT NULL,
  `opProjectID` int(10) unsigned NOT NULL,
  `opTarget` tinyint(3) unsigned NOT NULL,
  `opTargetID` int(10) unsigned NOT NULL,
  PRIMARY KEY (`opID`,`opTargetID`,`opProjectID`,`opUserID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of eo_log_project_operation
-- ----------------------------
INSERT INTO `eo_log_project_operation` VALUES ('1','0','1','添加接口分组:\'t\'s\'t\'','2017-12-18 15:05:25','1','2','2');
INSERT INTO `eo_log_project_operation` VALUES ('2','0','1','新增接口:\'te\'stew\'we\'t\'we\'t\'we\'t\'','2017-12-18 15:05:33','1','1','2');
INSERT INTO `eo_log_project_operation` VALUES ('3','0','1','添加环境:\'test\'','2017-12-18 15:50:39','1','5','1');

-- ----------------------------
-- Table structure for eo_message
-- ----------------------------
DROP TABLE IF EXISTS `eo_message`;
CREATE TABLE `eo_message` (
  `msgID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `toUserID` int(10) unsigned NOT NULL,
  `fromUserID` int(10) unsigned NOT NULL,
  `msgSendTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `msgType` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `summary` varchar(255) DEFAULT NULL,
  `msg` text NOT NULL,
  `isRead` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `otherMsg` text,
  PRIMARY KEY (`msgID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of eo_message
-- ----------------------------

-- ----------------------------
-- Table structure for eo_project
-- ----------------------------
DROP TABLE IF EXISTS `eo_project`;
CREATE TABLE `eo_project` (
  `projectID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `projectType` tinyint(1) unsigned NOT NULL,
  `projectName` varchar(30) COLLATE utf8_bin NOT NULL,
  `projectUpdateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `projectVersion` varchar(6) COLLATE utf8_bin NOT NULL DEFAULT '1.0',
  PRIMARY KEY (`projectID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of eo_project
-- ----------------------------
INSERT INTO `eo_project` VALUES ('1','0','eolinker示例','2017-12-18 15:05:33','1.2');

-- ----------------------------
-- Table structure for eo_project_document
-- ----------------------------
DROP TABLE IF EXISTS `eo_project_document`;
CREATE TABLE `eo_project_document` (
  `documentID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `groupID` int(10) unsigned NOT NULL,
  `projectID` int(10) unsigned NOT NULL,
  `contentType` tinyint(3) unsigned NOT NULL,
  `contentRaw` longtext,
  `content` longtext,
  `title` varchar(255) NOT NULL,
  `updateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `userID` int(10) unsigned NOT NULL,
  PRIMARY KEY (`documentID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of eo_project_document
-- ----------------------------

-- ----------------------------
-- Table structure for eo_project_document_group
-- ----------------------------
DROP TABLE IF EXISTS `eo_project_document_group`;
CREATE TABLE `eo_project_document_group` (
  `groupID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `projectID` int(10) unsigned NOT NULL,
  `groupName` varchar(255) NOT NULL,
  `parentGroupID` int(10) unsigned NOT NULL DEFAULT '0',
  `isChild` tinyint(3) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`groupID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of eo_project_document_group
-- ----------------------------

-- ----------------------------
-- Table structure for eo_project_document_group_order
-- ----------------------------
DROP TABLE IF EXISTS `eo_project_document_group_order`;
CREATE TABLE `eo_project_document_group_order` (
  `orderID` int(11) NOT NULL AUTO_INCREMENT,
  `projectID` int(11) NOT NULL,
  `orderList` text NOT NULL,
  PRIMARY KEY (`orderID`,`projectID`),
  UNIQUE KEY `projectID` (`projectID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of eo_project_document_group_order
-- ----------------------------

-- ----------------------------
-- Table structure for eo_project_environment
-- ----------------------------
DROP TABLE IF EXISTS `eo_project_environment`;
CREATE TABLE `eo_project_environment` (
  `envID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `envName` varchar(255) NOT NULL,
  `envURI` varchar(255) NOT NULL,
  `projectID` int(10) unsigned NOT NULL,
  PRIMARY KEY (`envID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of eo_project_environment
-- ----------------------------

-- ----------------------------
-- Table structure for eo_project_status_code
-- ----------------------------
DROP TABLE IF EXISTS `eo_project_status_code`;
CREATE TABLE `eo_project_status_code` (
  `codeID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(255) NOT NULL,
  `codeDescription` varchar(255) NOT NULL,
  `groupID` int(10) unsigned NOT NULL,
  PRIMARY KEY (`codeID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of eo_project_status_code
-- ----------------------------

-- ----------------------------
-- Table structure for eo_project_status_code_group
-- ----------------------------
DROP TABLE IF EXISTS `eo_project_status_code_group`;
CREATE TABLE `eo_project_status_code_group` (
  `groupID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `projectID` int(10) unsigned NOT NULL,
  `groupName` varchar(255) NOT NULL,
  `parentGroupID` int(10) unsigned NOT NULL DEFAULT '0',
  `isChild` tinyint(3) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`groupID`,`projectID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of eo_project_status_code_group
-- ----------------------------

-- ----------------------------
-- Table structure for eo_project_test_case
-- ----------------------------
DROP TABLE IF EXISTS `eo_project_test_case`;
CREATE TABLE `eo_project_test_case` (
  `caseID` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `projectID` int(11) NOT NULL COMMENT '项目ID',
  `userID` int(11) NOT NULL COMMENT '用户ID',
  `caseName` varchar(255) NOT NULL COMMENT '用例名称',
  `caseDesc` varchar(255) DEFAULT NULL COMMENT '用例描述',
  `createTime` datetime NOT NULL COMMENT '创建时间',
  `updateTime` datetime NOT NULL COMMENT '更新时间',
  `groupID` int(11) NOT NULL COMMENT '分组ID',
  `caseType` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0表示简单，1表示高级',
  `caseCode` longtext,
  PRIMARY KEY (`caseID`,`projectID`,`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of eo_project_test_case
-- ----------------------------

-- ----------------------------
-- Table structure for eo_project_test_case_group
-- ----------------------------
DROP TABLE IF EXISTS `eo_project_test_case_group`;
CREATE TABLE `eo_project_test_case_group` (
  `groupID` int(11) NOT NULL AUTO_INCREMENT COMMENT '分组ID',
  `groupName` varchar(100) NOT NULL COMMENT '组名',
  `projectID` int(11) NOT NULL COMMENT '项目ID',
  `parentGroupID` int(11) NOT NULL DEFAULT '0' COMMENT '父分组',
  `isChild` tinyint(3) NOT NULL DEFAULT '0' COMMENT '是否子分组',
  PRIMARY KEY (`groupID`,`projectID`,`parentGroupID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of eo_project_test_case_group
-- ----------------------------

-- ----------------------------
-- Table structure for eo_project_test_case_group_order
-- ----------------------------
DROP TABLE IF EXISTS `eo_project_test_case_group_order`;
CREATE TABLE `eo_project_test_case_group_order` (
  `orderID` int(11) NOT NULL AUTO_INCREMENT,
  `projectID` int(11) NOT NULL,
  `orderList` text NOT NULL,
  PRIMARY KEY (`orderID`,`projectID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of eo_project_test_case_group_order
-- ----------------------------

-- ----------------------------
-- Table structure for eo_project_test_case_history
-- ----------------------------
DROP TABLE IF EXISTS `eo_project_test_case_history`;
CREATE TABLE `eo_project_test_case_history` (
  `testID` int(11) NOT NULL AUTO_INCREMENT COMMENT '测试ID',
  `caseID` int(11) NOT NULL COMMENT '用例ID',
  `result` text COMMENT '测试结果',
  `testTime` datetime DEFAULT NULL COMMENT '测试时间',
  `status` tinyint(4) DEFAULT NULL COMMENT '0表示失败，1表示通过',
  PRIMARY KEY (`testID`,`caseID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of eo_project_test_case_history
-- ----------------------------

-- ----------------------------
-- Table structure for eo_project_test_case_single
-- ----------------------------
DROP TABLE IF EXISTS `eo_project_test_case_single`;
CREATE TABLE `eo_project_test_case_single` (
  `connID` int(11) NOT NULL AUTO_INCREMENT COMMENT '关联ID',
  `caseID` int(11) NOT NULL COMMENT '用例ID',
  `caseData` text COMMENT '内容',
  `caseCode` text COMMENT '用例代码',
  `statusCode` varchar(20) DEFAULT NULL,
  `matchType` tinyint(4) DEFAULT NULL,
  `matchRule` text,
  `apiName` varchar(255) NOT NULL COMMENT '接口名称',
  `apiURI` varchar(255) NOT NULL COMMENT '接口路径',
  `apiRequestType` tinyint(4) DEFAULT '0' COMMENT '请求参数类型',
  PRIMARY KEY (`connID`,`caseID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of eo_project_test_case_single
-- ----------------------------

-- ----------------------------
-- Table structure for eo_user
-- ----------------------------
DROP TABLE IF EXISTS `eo_user`;
CREATE TABLE `eo_user` (
  `userID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `userName` varchar(60) NOT NULL,
  `userPassword` varchar(60) NOT NULL,
  `userNickName` varchar(16) NOT NULL DEFAULT '',
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of eo_user
-- ----------------------------
INSERT INTO `eo_user` VALUES ('1','ljgade','669ec87d66ba5d0ec51618078444547e','[随机]黑暗鸦');

