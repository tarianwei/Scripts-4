/*
 * @Author: lxk0301 https://github.com/lxk0301
 * @Date: 2021-01-12 16:00:00 
 * @Last Modified by: TongLin138
 * @Last Modified time: 2021-01-19 09:00:00
 */

const USER_AGENTS = [
  "jdapp;iPhone;9.2.2;14.2;%E4%BA%AC%E4%B8%9C/9.2.2 CFNetwork/1206 Darwin/20.1.0",
  "jdapp;android;9.3.5;10;2346663656561603-4353564623932316;network/wifi;model/ONEPLUS A5010;addressid/138709979;aid/2dfceea045ed292a;oaid/;osVer/29;appBuild/86390;partner/jingdong;eufv/1;Mozilla/5.0 (Linux; Android 10; ONEPLUS A5010 Build/QKQ1.191014.012; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045230 Mobile Safari/537.36",
  "jdapp;iPhone;9.3.5;14.3;bf1f9a94239880f59a8f3b018a3aadf380e216fc;network/wifi;ADID/C1F5A079-892C-4995-8CFD-9CC43BDE88E7;supportApplePay/0;hasUPPay/0;hasOCPay/0;model/iPhone10,3;addressid/4045330010;supportBestPay/0;appBuild/167515;jdSupportDarkMode/0;pv/637.2;apprpd/Home_Main;ref/JDMainPageViewController;psq/1;ads/;psn/bf1f9a94239880f59a8f3b018a3aadf380e216fc|745;jdv/0|iosapp|t_335139774|appshare|Wxfriends|1610699748309|1610699752;adk/;app_device/IOS;pap/JA2015_311210|9.3.5|IOS 14.3;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
]
/**
 * 生成随机数字
 * @param {number} min 最小值（包含）
 * @param {number} max 最大值（不包含）
 */
function randomNumber(min = 0, max = 100) {
  return Math.min(Math.floor(min + Math.random() * (max - min)), max);
}
const USER_AGENT = USER_AGENTS[randomNumber(0, USER_AGENTS.length)];

module.exports = {
  USER_AGENT
}