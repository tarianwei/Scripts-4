let PetShareCodes = [
  'MTEzMzI0OTE0NTAwMDAwMDAzNzkzNTU1OQ==@MTE1NDAxNzYwMDAwMDAwMzg1MzE4ODc=@MTE1NDAxNzcwMDAwMDAwMzg4NDMyMzk=@MTE1NDAxNzYwMDAwMDAwMzkwNDE3NTM=@MTE1NDUwMTI0MDAwMDAwMDQzMzg0NDQ1',//账号一的好友shareCode,不同好友中间用@符号隔开
  'MTEzMzI0OTE0NTAwMDAwMDAzNzkzNTU1OQ==@MTE1NDAxNzYwMDAwMDAwMzg1MzE4ODc=@MTE1NDAxNzcwMDAwMDAwMzg4NDMyMzk=@MTE1NDAxNzYwMDAwMDAwMzkwNDE3NTM=@MTE1NDUwMTI0MDAwMDAwMDQzMzg0NDQ1',//账号二的好友shareCode，不同好友中间用@符号隔开
  'MTEzMzI0OTE0NTAwMDAwMDAzNzkzNTU1OQ==@MTE1NDAxNzYwMDAwMDAwMzg1MzE4ODc=@MTE1NDAxNzcwMDAwMDAwMzg4NDMyMzk=@MTE1NDAxNzYwMDAwMDAwMzkwNDE3NTM=@MTE1NDUwMTI0MDAwMDAwMDQzMzg0NDQ1',//账号三的好友shareCode，不同好友中间用@符号隔开
  'MTEzMzI0OTE0NTAwMDAwMDAzNzkzNTU1OQ==@MTE1NDAxNzYwMDAwMDAwMzg1MzE4ODc=@MTE1NDAxNzcwMDAwMDAwMzg4NDMyMzk=@MTE1NDAxNzYwMDAwMDAwMzkwNDE3NTM=@MTE1NDUwMTI0MDAwMDAwMDQzMzg0NDQ1',//账号四的好友shareCode，不同好友中间用@符号隔开
  'MTEzMzI0OTE0NTAwMDAwMDAzNzkzNTU1OQ==@MTE1NDAxNzYwMDAwMDAwMzg1MzE4ODc=@MTE1NDAxNzcwMDAwMDAwMzg4NDMyMzk=@MTE1NDAxNzYwMDAwMDAwMzkwNDE3NTM=@MTE1NDUwMTI0MDAwMDAwMDQzMzg0NDQ1',//账号五的好友shareCode，不同好友中间用@符号隔开
  'MTAxODc2NTEzMzAwMDAwMDAyODg0Mzg1Mw==@MTAxODc2NTE0NzAwMDAwMDAzMTI0OTc0MQ==@MTAxODc2NTEzMjAwMDAwMDAwNTMwMjY0NQ==@MTAxODc2NTEzMjAwMDAwMDAxNjM1MTYxNQ==@MTAxODc2NTEzOTAwMDAwMDAyNzQyNzk4NQ==',//账号六的好友shareCode，不同好友中间用@符号隔开
  'MTAxODc2NTEzMzAwMDAwMDAyODg0Mzg1Mw==@MTAxODc2NTE0NzAwMDAwMDAzMTI0OTc0MQ==@MTAxODc2NTEzMjAwMDAwMDAwNTMwMjY0NQ==@MTAxODc2NTEzMjAwMDAwMDAxNjM1MTYxNQ==@MTAxODc2NTEzOTAwMDAwMDAyNzQyNzk4NQ==',//账号七的好友shareCode，不同好友中间用@符号隔开
  'MTAxODc2NTEzMzAwMDAwMDAyODg0Mzg1Mw==@MTAxODc2NTE0NzAwMDAwMDAzMTI0OTc0MQ==@MTAxODc2NTEzMjAwMDAwMDAwNTMwMjY0NQ==@MTAxODc2NTEzMjAwMDAwMDAxNjM1MTYxNQ==@MTAxODc2NTEzOTAwMDAwMDAyNzQyNzk4NQ==',//账号八的好友shareCode，不同好友中间用@符号隔开
  'MTAxODc2NTEzMzAwMDAwMDAyODg0Mzg1Mw==@MTAxODc2NTE0NzAwMDAwMDAzMTI0OTc0MQ==@MTAxODc2NTEzMjAwMDAwMDAwNTMwMjY0NQ==@MTAxODc2NTEzMjAwMDAwMDAxNjM1MTYxNQ==@MTAxODc2NTEzOTAwMDAwMDAyNzQyNzk4NQ==',//账号九的好友shareCode，不同好友中间用@符号隔开
  'MTAxODc2NTEzMzAwMDAwMDAyODg0Mzg1Mw==@MTAxODc2NTE0NzAwMDAwMDAzMTI0OTc0MQ==@MTAxODc2NTEzMjAwMDAwMDAwNTMwMjY0NQ==@MTAxODc2NTEzMjAwMDAwMDAxNjM1MTYxNQ==@MTAxODc2NTEzOTAwMDAwMDAyNzQyNzk4NQ==',//账号十的好友shareCode，不同好友中间用@符号隔开
]
// 判断github action里面是否有东东萌宠互助码
if (process.env.PETSHARECODES) {
  if (process.env.PETSHARECODES.indexOf('&') > -1) {
    console.log(`您的东东萌宠互助码选择的是用&隔开\n`)
    PetShareCodes = process.env.PETSHARECODES.split('&');
  } else if (process.env.PETSHARECODES.indexOf('\n') > -1) {
    console.log(`您的东东萌宠互助码选择的是用换行隔开\n`)
    PetShareCodes = process.env.PETSHARECODES.split('\n');
  } else {
    PetShareCodes = process.env.PETSHARECODES.split();
  }
} else if (process.env.JD_COOKIE) {
  console.log(`由于您secret里面未提供助力码，故此处运行将会给脚本内置的码进行助力，请知晓！`)
}
for (let i = 0; i < PetShareCodes.length; i++) {
  const index = (i + 1 === 1) ? '' : (i + 1);
  exports['PetShareCode' + index] = PetShareCodes[i];
}