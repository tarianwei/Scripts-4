let SuperMarketShareCodes = [
  'IRs2apjDGIhXjw@9L-3u0gyb_0n82_T@eU9Yabq0M_9y9zrSn3QRgg',//账号一的好友shareCode,不同好友中间用@符号隔开
  'IRs2apjDGIhXjw@9L-3u0gyb_0n82_T@eU9Yabq0M_9y9zrSn3QRgg',//账号二的好友shareCode，不同好友中间用@符号隔开
  'IRs2apjDGIhXjw@9L-3u0gyb_0n82_T@eU9Yabq0M_9y9zrSn3QRgg',//账号三的好友shareCode，不同好友中间用@符号隔开
  'IRs2apjDGIhXjw@9L-3u0gyb_0n82_T@eU9Yabq0M_9y9zrSn3QRgg',//账号四的好友shareCode，不同好友中间用@符号隔开
  'UWpVG53LGPQn8GfX@eU9YaO_jbv4noGjXz3YU1w@UWpVG53LGP0l-Q',//账号五的好友shareCode，不同好友中间用@符号隔开
  'UWpVG53LGPQn8GfX@eU9YaO_jbv4noGjXz3YU1w@UWpVG53LGP0l-Q',//账号六的好友shareCode，不同好友中间用@符号隔开
  'UWpVG53LGPQn8GfX@eU9YaO_jbv4noGjXz3YU1w@UWpVG53LGP0l-Q',//账号七的好友shareCode，不同好友中间用@符号隔开
  'UWpVG53LGPQn8GfX@eU9YaO_jbv4noGjXz3YU1w@UWpVG53LGP0l-Q',//账号八的好友shareCode，不同好友中间用@符号隔开
  'UWpVG53LGPQn8GfX@eU9YaO_jbv4noGjXz3YU1w@UWpVG53LGP0l-Q',//账号九的好友shareCode，不同好友中间用@符号隔开
  'UWpVG53LGPQn8GfX@eU9YaO_jbv4noGjXz3YU1w@UWpVG53LGP0l-Q',//账号十的好友shareCode，不同好友中间用@符号隔开
]

// 判断github action里面是否有京小超商圈互助码
if (process.env.SUPERMARKET_SHARECODES) {
  if (process.env.SUPERMARKET_SHARECODES.indexOf('&') > -1) {
    console.log(`您的京小超商圈互助码选择的是用&隔开\n`)
    SuperMarketShareCodes = process.env.SUPERMARKET_SHARECODES.split('&');
  } else if (process.env.SUPERMARKET_SHARECODES.indexOf('\n') > -1) {
    console.log(`您的京小超商圈互助码选择的是用换行隔开\n`)
    SuperMarketShareCodes = process.env.SUPERMARKET_SHARECODES.split('\n');
  } else {
    SuperMarketShareCodes = process.env.SUPERMARKET_SHARECODES.split();
  }
} else if (process.env.JD_COOKIE) {
  console.log(`由于您secret里面未提供助力码，故此处运行将会给脚本内置的码进行助力，请知晓！`)
}
for (let i = 0; i < SuperMarketShareCodes.length; i++) {
  const index = (i + 1 === 1) ? '' : (i + 1);
  exports['SuperMarketShareCode' + index] = SuperMarketShareCodes[i];
}