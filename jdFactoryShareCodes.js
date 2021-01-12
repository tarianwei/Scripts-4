let shareCodes = [
  'P04z54XCjVWnYaS5jcICWaMrAI-5AI@P04z54XCjVWnYaS5uKsiLdcXXVLlLl4vw@P04z54XCjVWnYaS5m9cZ2Wu2ylJwVfmgnqxak8',//账号一的好友shareCode,不同好友中间用@符号隔开
  'P04z54XCjVWnYaS5jcICWaMrAI-5AI@P04z54XCjVWnYaS5uKsiLdcXXVLlLl4vw@P04z54XCjVWnYaS5m9cZ2Wu2ylJwVfmgnqxak8',//账号二的好友shareCode，不同好友中间用@符号隔开
  'P04z54XCjVWnYaS5jcICWaMrAI-5AI@P04z54XCjVWnYaS5uKsiLdcXXVLlLl4vw@P04z54XCjVWnYaS5m9cZ2Wu2ylJwVfmgnqxak8',//账号三的好友shareCode，不同好友中间用@符号隔开
  'P04z54XCjVWnYaS5nJcYTGFoR0d9Zko8LEm@P04z54XCjVWnYaS5m9cZ2fw3i4Yl4f59NlSzLo@P04z54XCjVWnYaS5m9cZyWiqgYz8mrnLp6FZw',//账号四的好友shareCode，不同好友中间用@符号隔开
  'P04z54XCjVWnYaS5nJcYTGFoR0d9Zko8LEm@P04z54XCjVWnYaS5m9cZ2fw3i4Yl4f59NlSzLo@P04z54XCjVWnYaS5m9cZyWiqgYz8mrnLp6FZw',//账号五的好友shareCode，不同好友中间用@符号隔开
  'P04z54XCjVWnYaS5nJcYTGFoR0d9Zko8LEm@P04z54XCjVWnYaS5m9cZ2fw3i4Yl4f59NlSzLo@P04z54XCjVWnYaS5m9cZyWiqgYz8mrnLp6FZw',//账号六的好友shareCode，不同好友中间用@符号隔开
  'P04z54XCjVWnYaS5kd5aheJpAJClPqhMA@P04z54XCjVWnYaS5m9cZ2T7jHRIlOva-5O9kD4@P04z54XCjVWnYaS5kd5aheJpAJLlkc',//账号七的好友shareCode，不同好友中间用@符号隔开
  'P04z54XCjVWnYaS5kd5aheJpAJClPqhMA@P04z54XCjVWnYaS5m9cZ2T7jHRIlOva-5O9kD4@P04z54XCjVWnYaS5kd5aheJpAJLlkc',//账号八的好友shareCode，不同好友中间用@符号隔开
  'P04z54XCjVWnYaS5kd5aheJpAJClPqhMA@P04z54XCjVWnYaS5m9cZ2T7jHRIlOva-5O9kD4@P04z54XCjVWnYaS5kd5aheJpAJLlkc',//账号九的好友shareCode，不同好友中间用@符号隔开
  'P04z54XCjVWnYaS5kd5aheJpAJClPqhMA@P04z54XCjVWnYaS5m9cZ2T7jHRIlOva-5O9kD4@P04z54XCjVWnYaS5kd5aheJpAJLlkc',//账号十的好友shareCode，不同好友中间用@符号隔开
]
// 判断github action里面是否有东东工厂互助码
if (process.env.DDFACTORY_SHARECODES) {
  if (process.env.DDFACTORY_SHARECODES.indexOf('&') > -1) {
    console.log(`您的互助码选择的是用&隔开\n`)
    shareCodes = process.env.DDFACTORY_SHARECODES.split('&');
  } else if (process.env.DDFACTORY_SHARECODES.indexOf('\n') > -1) {
    console.log(`您的互助码选择的是用换行隔开\n`)
    shareCodes = process.env.DDFACTORY_SHARECODES.split('\n');
  } else {
    shareCodes = process.env.DDFACTORY_SHARECODES.split();
  }
} else if (process.env.DDFACTORY_SHARECODES) {
  console.log(`由于您secret里面未提供助力码，故此处运行将会给脚本内置的码进行助力，请知晓！`)
}
for (let i = 0; i < shareCodes.length; i++) {
  const index = (i + 1 === 1) ? '' : (i + 1);
  exports['shareCodes' + index] = shareCodes[i];
}