let shareCodes = [
  'byF3zf8_GLpil3ZDEujU9Q==@KBqAfiz2PeXgR2mMCw1xQg==@SCoFqxZyEnudIRLmDdxRww==',//账号一的好友shareCode,不同好友中间用@符号隔开
  'byF3zf8_GLpil3ZDEujU9Q==@KBqAfiz2PeXgR2mMCw1xQg==@SCoFqxZyEnudIRLmDdxRww==',//账号二的好友shareCode，不同好友中间用@符号隔开
  'byF3zf8_GLpil3ZDEujU9Q==@KBqAfiz2PeXgR2mMCw1xQg==@SCoFqxZyEnudIRLmDdxRww==',//账号三的好友shareCode，不同好友中间用@符号隔开
  'j16X7GbdZtw2HG7njKxgbw==@AQATiI-FWjtOs_6mVzA-EQ==@KtltN9WQzI8zx7y9r2GXFg==',//账号四的好友shareCode，不同好友中间用@符号隔开
  'Nmw4nSquoLzPcxd_uQKPOw==@6paur4X2J48jXPI2R47FKA==@KtltN9WQzI8zx7y9r2GXFg==',//账号五的好友shareCode，不同好友中间用@符号隔开
  'Nmw4nSquoLzPcxd_uQKPOw==@6paur4X2J48jXPI2R47FKA==@KtltN9WQzI8zx7y9r2GXFg==',//账号六的好友shareCode，不同好友中间用@符号隔开
  'j16X7GbdZtw2HG7njKxgbw==@AQATiI-FWjtOs_6mVzA-EQ==@KtltN9WQzI8zx7y9r2GXFg==',//账号七的好友shareCode，不同好友中间用@符号隔开
  'j16X7GbdZtw2HG7njKxgbw==@AQATiI-FWjtOs_6mVzA-EQ==@KtltN9WQzI8zx7y9r2GXFg==',//账号八的好友shareCode，不同好友中间用@符号隔开
  'j16X7GbdZtw2HG7njKxgbw==@AQATiI-FWjtOs_6mVzA-EQ==@KtltN9WQzI8zx7y9r2GXFg==',//账号九的好友shareCode，不同好友中间用@符号隔开
  'j16X7GbdZtw2HG7njKxgbw==@AQATiI-FWjtOs_6mVzA-EQ==@KtltN9WQzI8zx7y9r2GXFg==',//账号十的好友shareCode，不同好友中间用@符号隔开
]
// 判断github action里面是否有京喜工厂互助码
if (process.env.DREAM_FACTORY_SHARE_CODES) {
  if (process.env.DREAM_FACTORY_SHARE_CODES.indexOf('&') > -1) {
    console.log(`您的互助码选择的是用&隔开\n`)
    shareCodes = process.env.DREAM_FACTORY_SHARE_CODES.split('&');
  } else if (process.env.DREAM_FACTORY_SHARE_CODES.indexOf('\n') > -1) {
    console.log(`您的互助码选择的是用换行隔开\n`)
    shareCodes = process.env.DREAM_FACTORY_SHARE_CODES.split('\n');
  } else {
    shareCodes = process.env.DREAM_FACTORY_SHARE_CODES.split();
  }
} else if (process.env.DREAM_FACTORY_SHARE_CODES) {
  console.log(`由于您secret里面未提供助力码，故此处运行将会给脚本内置的码进行助力，请知晓！`)
}
for (let i = 0; i < shareCodes.length; i++) {
  const index = (i + 1 === 1) ? '' : (i + 1);
  exports['shareCodes' + index] = shareCodes[i];
}