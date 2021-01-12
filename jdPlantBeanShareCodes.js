let PlantBeanShareCodes = [
  'cfeialuacvqdyra6xe73t4apql767dor3gjtfja@4npkonnsy7xi36oufhturvxjalzjs6vdyssrdma@4npkonnsy7xi3xhcthb53kmc3al7ge72r44ftqi',//账号一的好友shareCode,不同好友中间用@符号隔开
  'cfeialuacvqdyra6xe73t4apql767dor3gjtfja@4npkonnsy7xi36oufhturvxjalzjs6vdyssrdma@4npkonnsy7xi3xhcthb53kmc3al7ge72r44ftqi',//账号二的好友shareCode，不同好友中间用@符号隔开
  'cfeialuacvqdyra6xe73t4apql767dor3gjtfja@4npkonnsy7xi36oufhturvxjalzjs6vdyssrdma@4npkonnsy7xi3xhcthb53kmc3al7ge72r44ftqi',//账号三的好友shareCode，不同好友中间用@符号隔开
  '4alv3q32zeougcagbbw2ebeq6u5ac3f4ijdgqji@4npkonnsy7xi3xhcthb53kmc3al7ge72r44ftqi@4alv3q32zeougjwhkqm4njwlli',//账号四的好友shareCode，不同好友中间用@符号隔开
  '4alv3q32zeougcagbbw2ebeq6u5ac3f4ijdgqji@4npkonnsy7xi3xhcthb53kmc3al7ge72r44ftqi@4alv3q32zeougjwhkqm4njwlli',//账号五的好友shareCode，不同好友中间用@符号隔开
  '4alv3q32zeougcagbbw2ebeq6u5ac3f4ijdgqji@4npkonnsy7xi3xhcthb53kmc3al7ge72r44ftqi@4alv3q32zeougjwhkqm4njwlli',//账号六的好友shareCode，不同好友中间用@符号隔开
  'gtff3aeremgzgeasfuqok26y6q@4npkonnsy7xi3xhcthb53kmc3al7ge72r44ftqi@mlrdw3aw26j3w3jpn3wdm7gpgtcrfnmbgqbxmfq',//账号七的好友shareCode，不同好友中间用@符号隔开
  'gtff3aeremgzgeasfuqok26y6q@4npkonnsy7xi3xhcthb53kmc3al7ge72r44ftqi@mlrdw3aw26j3w3jpn3wdm7gpgtcrfnmbgqbxmfq',//账号八的好友shareCode，不同好友中间用@符号隔开
  'gtff3aeremgzgeasfuqok26y6q@4npkonnsy7xi3xhcthb53kmc3al7ge72r44ftqi@mlrdw3aw26j3w3jpn3wdm7gpgtcrfnmbgqbxmfq',//账号九的好友shareCode，不同好友中间用@符号隔开
  'e7lhibzb3zek2s5cx5yqhl7fydo4ygsbqjudnsi@ddxc4saz2xfemtf2ixbgtao3ru5ac3f4ijdgqji@mh5uulbrvnknkkupxwg7lehlyoxs3h25myr4jdy',//账号十的好友shareCode，不同好友中间用@符号隔开
]
// 判断github action里面是否有东东萌宠互助码
if (process.env.PLANT_BEAN_SHARECODES) {
  if (process.env.PLANT_BEAN_SHARECODES.indexOf('&') > -1) {
    console.log(`您的种豆互助码选择的是用&隔开\n`)
    PlantBeanShareCodes = process.env.PLANT_BEAN_SHARECODES.split('&');
  } else if (process.env.PLANT_BEAN_SHARECODES.indexOf('\n') > -1) {
    console.log(`您的种豆互助码选择的是用换行隔开\n`)
    PlantBeanShareCodes = process.env.PLANT_BEAN_SHARECODES.split('\n');
  } else {
    PlantBeanShareCodes = process.env.PLANT_BEAN_SHARECODES.split();
  }
} else if (process.env.JD_COOKIE) {
  console.log(`由于您secret里面未提供助力码，故此处运行将会给脚本内置的码进行助力，请知晓！`)
}
for (let i = 0; i < PlantBeanShareCodes.length; i++) {
  const index = (i + 1 === 1) ? '' : (i + 1);
  exports['PlantBeanShareCodes' + index] = PlantBeanShareCodes[i];
}