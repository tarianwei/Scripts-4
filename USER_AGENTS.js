/*
 * @Author: lxk0301 https://github.com/lxk0301
 * @Date: 2021-01-12 16:00:00 
 * @Last Modified by: TongLin138
 * @Last Modified time: 2021-01-19 15:00:00
 */

const USER_AGENTS = [
  "jdapp;iPhone;9.2.2;14.2;%E4%BA%AC%E4%B8%9C/9.2.2 CFNetwork/1206 Darwin/20.1.0",
  "jdapp;android;9.3.6;10;3693264633262666-8326230346165373;network/wifi;model/vivo NEX S;addressid/1320793048;aid/c9bd3bbf8b20da57;oaid/;osVer/29;appBuild/86560;partner/vivo;eufv/1;jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 10; vivo NEX S Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045230 Mobile Safari/537.36",
  "jdapp;iPhone;9.3.5;14.3;bf1f9a94239880f59a8f3b018a3aadf380e216fc;network/wifi;ADID/C1F5A079-892C-4995-8CFD-9CC43BDE88E7;supportApplePay/0;hasUPPay/0;hasOCPay/0;model/iPhone10,3;addressid/4045330010;supportBestPay/0;appBuild/167515;jdSupportDarkMode/0;pv/637.2;apprpd/Home_Main;ref/JDMainPageViewController;psq/1;ads/;psn/bf1f9a94239880f59a8f3b018a3aadf380e216fc|745;jdv/0|iosapp|t_335139774|appshare|Wxfriends|1610699748309|1610699752;adk/;app_device/IOS;pap/JA2015_311210|9.3.5|IOS 14.3;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
  "jdapp;iPad;9.3.5;14.3;56ffb21012ddd2c467289df47e901798ea3e77ac;network/wifi;ADID/477946C5-96AF-491E-8E38-938656871ADC;supportApplePay/0;hasUPPay/0;hasOCPay/0;model/iPad5,3;addressid/0;supportBestPay/0;appBuild/167515;jdSupportDarkMode/0;pv/2.2;apprpd/Home_Main;ref/JDMainPageViewController;psq/1;ads/;psn/56ffb21012ddd2c467289df47e901798ea3e77ac|2;jdv/0|;adk/;app_device/IOS;pap/JA2015_311210|9.3.5|IOS 14.3;Mozilla/5.0 (iPad; CPU OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
  "jdapp;iPad;9.3.5;14.4;33108d789c3ed2f2e2df20a5f2c4a44a1daae17f;network/wifi;supportApplePay/0;hasUPPay/0;hasOCPay/0;model/iPad8,9;addressid/0;supportBestPay/0;appBuild/167515;jdSupportDarkMode/0;pv/4.3;apprpd/Home_Main;ref/https%3A%2F%2Fwbbny.m.jd.com%2FbabelDiy%2FZeus%2F2cKMj86srRdhgWcKonfExzK4ZMBy%2Findex.html%3FbabelChannel%3Dfc%26lng%3D0.000000%26lat%3D0.000000%26sid%3D99294ed0c6c5677d6e73f2a05999b6fw%26un_area%3D15_1158_0_0;psq/2;ads/;psn/33108d789c3ed2f2e2df20a5f2c4a44a1daae17f|4;jdv/0|;adk/;app_device/IOS;pap/JA2015_311210|9.3.5|IOS 14.4;Mozilla/5.0 (iPad; CPU OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
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